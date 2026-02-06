<?php
/**
 * Susie's Quest - Global Leaderboard API (v1.1)
 * 
 * Endpoints:
 *   GET  - Fetch top scores (deduplicated, sorted by score desc)
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
define('MAX_ENTRIES', 50);
define('MAX_NAME_LENGTH', 20);
define('MIN_SCORE', 10);
define('MAX_SCORE', 9999999);
define('RATE_LIMIT_FILE', $scriptDir . '/rate_limit.json');
define('RATE_LIMIT_SECONDS', 5);

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
 * Load raw leaderboard data from JSON file
 */
function loadRawLeaderboard() {
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
 * Deduplicate leaderboard: keep only the highest score per player name (case-insensitive).
 * Returns a clean, sorted array.
 */
function deduplicateLeaderboard($data) {
    $bestByName = [];
    
    foreach ($data as $entry) {
        $name = isset($entry['name']) ? $entry['name'] : 'Anonymous';
        $key = strtolower(trim($name));
        $score = isset($entry['score']) ? intval($entry['score']) : 0;
        
        if (!isset($bestByName[$key]) || $score > $bestByName[$key]['score']) {
            $bestByName[$key] = [
                'name'  => $name,
                'score' => $score,
                'date'  => isset($entry['date']) ? $entry['date'] : date('Y-m-d H:i:s'),
                'id'    => isset($entry['id']) ? $entry['id'] : uniqid()
            ];
        }
    }
    
    // Convert back to indexed array
    $result = array_values($bestByName);
    
    // Sort by score descending
    usort($result, function($a, $b) {
        return $b['score'] - $a['score'];
    });
    
    // Keep only top entries
    return array_slice($result, 0, MAX_ENTRIES);
}

/**
 * Load leaderboard, deduplicated and sorted
 */
function loadLeaderboard() {
    $raw = loadRawLeaderboard();
    return deduplicateLeaderboard($raw);
}

/**
 * Save leaderboard data to JSON file (deduplicates before saving)
 */
function saveLeaderboard($data) {
    // Always deduplicate before saving
    $data = deduplicateLeaderboard($data);
    
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
// Handle GET request - Fetch leaderboard (deduplicated)
// ============================================================
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Load and deduplicate
    $leaderboard = loadLeaderboard();
    
    // Also save the deduplicated version back to clean up the file
    saveLeaderboard($leaderboard);
    
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
    
    // Load current leaderboard (raw, before dedup, so we can add and then dedup)
    $leaderboard = loadRawLeaderboard();
    
    // Add the new entry (deduplicateLeaderboard will handle keeping only the best)
    $leaderboard[] = [
        'name'  => $name,
        'score' => $score,
        'date'  => date('Y-m-d H:i:s'),
        'id'    => uniqid('', true)
    ];
    
    // Save (this deduplicates, sorts, and trims automatically)
    if (saveLeaderboard($leaderboard)) {
        // Reload the clean deduplicated data
        $leaderboard = loadLeaderboard();
        
        // Find the player's rank
        $rank = 0;
        $playerScore = 0;
        foreach ($leaderboard as $i => $entry) {
            if (strtolower($entry['name']) === strtolower($name)) {
                $rank = $i + 1;
                $playerScore = $entry['score'];
                break;
            }
        }
        
        $isNewHighScore = ($playerScore === $score);
        
        echo json_encode([
            'success' => true,
            'message' => $isNewHighScore ? 'New high score!' : 'Score submitted (your previous score was higher)',
            'rank' => $rank,
            'isNewHighScore' => $isNewHighScore,
            'entry' => [
                'name' => $name,
                'score' => $playerScore,
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
