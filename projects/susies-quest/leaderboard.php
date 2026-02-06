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

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
define('DATA_FILE', __DIR__ . '/leaderboard_data.json');
define('MAX_ENTRIES', 100);      // Maximum entries to store
define('MAX_NAME_LENGTH', 20);   // Maximum player name length
define('MAX_SCORE', 9999999);    // Maximum valid score

/**
 * Load leaderboard data from JSON file
 */
function loadLeaderboard() {
    if (!file_exists(DATA_FILE)) {
        return [];
    }
    
    $json = file_get_contents(DATA_FILE);
    if ($json === false) {
        return [];
    }
    
    $data = json_decode($json, true);
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
    
    // Save to file
    $json = json_encode($data, JSON_PRETTY_PRINT);
    return file_put_contents(DATA_FILE, $json) !== false;
}

/**
 * Sanitize player name
 */
function sanitizeName($name) {
    // Remove any HTML/script tags
    $name = strip_tags($name);
    // Remove special characters except alphanumeric, spaces, and basic punctuation
    $name = preg_replace('/[^a-zA-Z0-9\s\-_.]/', '', $name);
    // Trim and limit length
    $name = trim(substr($name, 0, MAX_NAME_LENGTH));
    // Default name if empty
    return $name ?: 'Anonymous';
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
    if (!$data) {
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
            if ($entry['id'] === $newEntry['id']) {
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
