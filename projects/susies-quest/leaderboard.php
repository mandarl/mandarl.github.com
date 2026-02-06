<?php
/**
 * Susie's Quest - Global Leaderboard API
 * 
 * Endpoints:
 *   GET  - Fetch top scores (returns all stored, up to MAX_ENTRIES)
 *   POST - Submit a new score (deduplicates by player name, keeps highest)
 * 
 * Host this file at: https://dipoletech.com/projects/susies-quest/leaderboard.php
 * Data is stored in: leaderboard_data.json (same folder)
 */

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

// Disable caching
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Configuration
$scriptDir = dirname(__FILE__);
define('DATA_FILE', $scriptDir . '/leaderboard_data.json');
define('MAX_ENTRIES', 50);         // Maximum unique player entries to store
define('MAX_NAME_LENGTH', 20);     // Maximum player name length
define('MIN_SCORE', 10);           // Minimum score to accept (reject trivial scores)
define('MAX_SCORE', 9999999);      // Maximum valid score
define('RATE_LIMIT_FILE', $scriptDir . '/rate_limit.json');
define('RATE_LIMIT_SECONDS', 5);   // Minimum seconds between submissions per IP

/**
 * Simple rate limiting by IP address
 */
function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $now = time();
    
    $limits = [];
    if (file_exists(RATE_LIMIT_FILE) && is_readable(RATE_LIMIT_FILE)) {
        $json = file_get_contents(RATE_LIMIT_FILE);
        $limits = json_decode($json, true) ?: [];
    }
    
    // Clean up old entries (older than 60 seconds)
    foreach ($limits as $key => $timestamp) {
        if ($now - $timestamp > 60) {
            unset($limits[$key]);
        }
    }
    
    // Check if this IP submitted recently
    if (isset($limits[$ip]) && ($now - $limits[$ip]) < RATE_LIMIT_SECONDS) {
        return false;
    }
    
    // Record this submission
    $limits[$ip] = $now;
    file_put_contents(RATE_LIMIT_FILE, json_encode($limits), LOCK_EX);
    
    return true;
}

/**
 * Load leaderboard data from JSON file
 */
function loadLeaderboard() {
    if (!file_exists(DATA_FILE)) {
        file_put_contents(DATA_FILE, '[]', LOCK_EX);
        return [];
    }
    
    if (!is_readable(DATA_FILE)) {
        error_log("Leaderboard file not readable: " . DATA_FILE);
        return [];
    }
    
    $json = file_get_contents(DATA_FILE);
    if ($json === false) {
        error_log("Failed to read leaderboard file: " . DATA_FILE);
        return [];
    }
    
    $json = trim($json);
    if (empty($json)) {
        return [];
    }
    
    $data = json_decode($json, true);
    
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
    $name = strval($name);
    $name = strip_tags($name);
    $name = preg_replace('/[^a-zA-Z0-9\s\-_.]/', '', $name);
    $name = trim(substr($name, 0, MAX_NAME_LENGTH));
    return $name !== '' ? $name : 'Anonymous';
}

/**
 * Validate score
 */
function validateScore($score) {
    if (!is_numeric($score)) {
        return false;
    }
    $score = intval($score);
    if ($score < MIN_SCORE || $score > MAX_SCORE) {
        return false;
    }
    return $score;
}

// ============================================================
// Handle GET request - Fetch leaderboard
// ============================================================
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $leaderboard = loadLeaderboard();
    
    echo json_encode([
        'success' => true,
        'count' => count($leaderboard),
        'leaderboard' => $leaderboard
    ]);
    exit();
}

// ============================================================
// Handle POST request - Submit new score
// ============================================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Rate limit check
    if (!checkRateLimit()) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'error' => 'Too many requests. Please wait a few seconds.'
        ]);
        exit();
    }
    
    // Get input data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
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
            'error' => 'Invalid score value (must be between ' . MIN_SCORE . ' and ' . MAX_SCORE . ')'
        ]);
        exit();
    }
    
    // Load current leaderboard
    $leaderboard = loadLeaderboard();
    
    // Deduplicate: find existing entry for this player name (case-insensitive)
    $existingIndex = -1;
    foreach ($leaderboard as $i => $entry) {
        if (strtolower($entry['name']) === strtolower($name)) {
            $existingIndex = $i;
            break;
        }
    }
    
    $isNewHighScore = false;
    
    if ($existingIndex !== -1) {
        // Player exists - only update if new score is higher
        if ($score > $leaderboard[$existingIndex]['score']) {
            $leaderboard[$existingIndex]['score'] = $score;
            $leaderboard[$existingIndex]['date'] = date('Y-m-d H:i:s');
            $isNewHighScore = true;
        }
        // Use the existing entry's ID
        $entryId = $leaderboard[$existingIndex]['id'] ?? uniqid();
    } else {
        // New player - add entry
        $entryId = uniqid('', true);
        $leaderboard[] = [
            'name' => $name,
            'score' => $score,
            'date' => date('Y-m-d H:i:s'),
            'id' => $entryId
        ];
        $isNewHighScore = true;
    }
    
    // Save updated leaderboard
    if (saveLeaderboard($leaderboard)) {
        // Reload to get sorted data and find rank
        $leaderboard = loadLeaderboard();
        $rank = 1;
        foreach ($leaderboard as $entry) {
            if (strtolower($entry['name']) === strtolower($name)) {
                break;
            }
            $rank++;
        }
        
        echo json_encode([
            'success' => true,
            'message' => $isNewHighScore ? 'New high score!' : 'Score submitted (your previous score was higher)',
            'rank' => $rank,
            'isNewHighScore' => $isNewHighScore,
            'entry' => [
                'name' => $name,
                'score' => $isNewHighScore ? $score : $leaderboard[$rank - 1]['score'],
                'date' => date('Y-m-d H:i:s')
            ],
            'leaderboard' => $leaderboard
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to save score. Please try again.'
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
