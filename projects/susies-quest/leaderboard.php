<?php
/**
 * Susie's Quest - Global Leaderboard API
 * 
 * Endpoints:
 *   GET  - Fetch top scores
 *   POST - Submit a new score
 * 
 * Host this file at: https://dipoletech.com/projects/susies-quest/leaderboard.php
 * Data is stored in: leaderboard_data.json (same folder)
 */

// CORS Headers - Allow requests from any origin (or specify your domains)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Max-Age: 86400'); // Cache preflight for 24 hours
header('Content-Type: application/json; charset=utf-8');

// Disable caching to ensure fresh data
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration - Use the same directory as this PHP file
$scriptDir = dirname(__FILE__);
define('DATA_FILE', $scriptDir . '/leaderboard_data.json');
define('MAX_ENTRIES', 100);      // Maximum entries to store
define('MAX_NAME_LENGTH', 20);   // Maximum player name length
define('MAX_SCORE', 9999999);    // Maximum valid score

/**
 * Load leaderboard data from JSON file
 */
function loadLeaderboard() {
    // Check if file exists
    if (!file_exists(DATA_FILE)) {
        // Try to create an empty file
        file_put_contents(DATA_FILE, '[]');
        return [];
    }
    
    // Check if file is readable
    if (!is_readable(DATA_FILE)) {
        error_log("Leaderboard file not readable: " . DATA_FILE);
        return [];
    }
    
    $json = file_get_contents(DATA_FILE);
    if ($json === false) {
        error_log("Failed to read leaderboard file: " . DATA_FILE);
        return [];
    }
    
    // Handle empty file
    $json = trim($json);
    if (empty($json)) {
        return [];
    }
    
    $data = json_decode($json, true);
    
    // Check for JSON decode errors
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log("JSON decode error: " . json_last_error_msg() . " in file: " . DATA_FILE);
        return [];
    }
    
    return is_array($data) ? $data : [];
}

/**
 * Save leaderboard data to JSON file
 */
function saveLeaderboard($data) {
    // Sort by score descending
    usort($data, function($a, $b) {
        return $b['score'] - $a['score'];
    });
    
    // Keep only top entries
    $data = array_slice($data, 0, MAX_ENTRIES);
    
    // Save to file with proper encoding
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
    if ($json === false) {
        error_log("JSON encode error: " . json_last_error_msg());
        return false;
    }
    
    $result = file_put_contents(DATA_FILE, $json, LOCK_EX);
    
    if ($result === false) {
        error_log("Failed to write leaderboard file: " . DATA_FILE);
        return false;
    }
    
    return true;
}

/**
 * Sanitize player name
 */
function sanitizeName($name) {
    // Convert to string if not already
    $name = strval($name);
    // Remove any HTML/script tags
    $name = strip_tags($name);
    // Remove special characters except alphanumeric, spaces, and basic punctuation
    $name = preg_replace('/[^a-zA-Z0-9\s\-_.]/', '', $name);
    // Trim and limit length
    $name = trim(substr($name, 0, MAX_NAME_LENGTH));
    // Default name if empty
    return $name !== '' ? $name : 'Anonymous';
}

/**
 * Validate score
 */
function validateScore($score) {
    $score = intval($score);
    if ($score < 0 || $score > MAX_SCORE) {
        return false;
    }
    return $score;
}

// Debug endpoint - add ?debug=1 to see file info
if (isset($_GET['debug']) && $_GET['debug'] == '1') {
    echo json_encode([
        'data_file' => DATA_FILE,
        'file_exists' => file_exists(DATA_FILE),
        'is_readable' => is_readable(DATA_FILE),
        'is_writable' => is_writable(dirname(DATA_FILE)),
        'file_size' => file_exists(DATA_FILE) ? filesize(DATA_FILE) : 0,
        'script_dir' => $scriptDir,
        'raw_content' => file_exists(DATA_FILE) ? file_get_contents(DATA_FILE) : null
    ], JSON_PRETTY_PRINT);
    exit();
}

// Handle GET request - Fetch leaderboard
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $leaderboard = loadLeaderboard();
    
    // Get limit parameter (default 10, max 50)
    $limit = isset($_GET['limit']) ? min(intval($_GET['limit']), 50) : 10;
    $limit = max($limit, 1);
    
    // Return top scores
    $topScores = array_slice($leaderboard, 0, $limit);
    
    echo json_encode([
        'success' => true,
        'count' => count($topScores),
        'leaderboard' => $topScores
    ]);
    exit();
}

// Handle POST request - Submit new score
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get input data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Fallback to POST parameters if JSON parsing fails
    if (!$data || !is_array($data)) {
        $data = $_POST;
    }
    
    // Validate required fields
    if (!isset($data['name']) || !isset($data['score'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Missing required fields: name and score'
        ]);
        exit();
    }
    
    // Sanitize and validate
    $name = sanitizeName($data['name']);
    $score = validateScore($data['score']);
    
    if ($score === false) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid score value'
        ]);
        exit();
    }
    
    // Load current leaderboard
    $leaderboard = loadLeaderboard();
    
    // Add new entry
    $newEntry = [
        'name' => $name,
        'score' => $score,
        'date' => date('Y-m-d H:i:s'),
        'id' => uniqid()
    ];
    
    $leaderboard[] = $newEntry;
    
    // Save updated leaderboard
    if (saveLeaderboard($leaderboard)) {
        // Reload to get sorted data and find rank
        $leaderboard = loadLeaderboard();
        $rank = 1;
        foreach ($leaderboard as $entry) {
            if (isset($entry['id']) && $entry['id'] === $newEntry['id']) {
                break;
            }
            $rank++;
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Score submitted successfully',
            'rank' => $rank,
            'entry' => $newEntry
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to save score'
        ]);
    }
    exit();
}

// Invalid method
http_response_code(405);
echo json_encode([
    'success' => false,
    'error' => 'Method not allowed'
]);
