import { CONFIG } from './config.js';

// Remote Leaderboard API URL
const LEADERBOARD_API_URL = 'https://dipoletech.com/projects/susies-quest/leaderboard.php';
const FETCH_TIMEOUT_MS = 8000;  // 8 second timeout for API calls
const MAX_RETRIES = 1;          // Retry once on failure

export class GameState {
    constructor() {
        this.active = false;
        this.paused = false;
        this.score = 0;
        this.playerName = "";
        this.difficultyMultiplier = 1;
        this.lives = CONFIG.STARTING_LIVES;
        this.maxLives = CONFIG.MAX_LIVES;
        
        // Power-up states
        this.shieldActive = false;
        this.shieldTimer = 0;
        this.magnetActive = false;
        this.magnetTimer = 0;
        this.doublePointsActive = false;
        this.doublePointsTimer = 0;
        
        // Statistics
        this.platformsCleared = 0;
        this.collectiblesGathered = 0;
        this.enemiesAvoided = 0;
        this.highestCombo = 0;
        this.currentCombo = 0;
        
        // Tutorial state
        this.tutorialShown = localStorage.getItem('susies-quest-tutorial-shown') === 'true';
        
        // Leaderboard - local cache
        this.leaderboard = JSON.parse(localStorage.getItem('susies-quest-leaderboard')) || [];
        
        // Remote leaderboard state
        this.useRemoteLeaderboard = true;
        this.lastRank = null;
        this.lastError = null;      // Track last error for user feedback
        this.isSubmitting = false;   // Prevent double submissions
        this.isFetching = false;     // Prevent concurrent fetches
    }

    reset() {
        this.score = 0;
        this.difficultyMultiplier = 1;
        this.lives = CONFIG.STARTING_LIVES;
        this.paused = false;
        
        // Reset power-ups
        this.shieldActive = false;
        this.shieldTimer = 0;
        this.magnetActive = false;
        this.magnetTimer = 0;
        this.doublePointsActive = false;
        this.doublePointsTimer = 0;
        
        // Reset statistics
        this.platformsCleared = 0;
        this.collectiblesGathered = 0;
        this.enemiesAvoided = 0;
        this.highestCombo = 0;
        this.currentCombo = 0;
        this.lastRank = null;
        this.lastError = null;
        this.isSubmitting = false;
    }

    updateDifficulty() {
        this.difficultyMultiplier = 1 + Math.min(
            this.score / CONFIG.DIFFICULTY_SCORE_DIVISOR, 
            CONFIG.MAX_DIFFICULTY_MULTIPLIER - 1
        );
    }

    updatePowerUps(deltaTime = 16) {
        if (this.shieldActive) {
            this.shieldTimer -= deltaTime;
            if (this.shieldTimer <= 0) {
                this.shieldActive = false;
            }
        }
        
        if (this.magnetActive) {
            this.magnetTimer -= deltaTime;
            if (this.magnetTimer <= 0) {
                this.magnetActive = false;
            }
        }
        
        if (this.doublePointsActive) {
            this.doublePointsTimer -= deltaTime;
            if (this.doublePointsTimer <= 0) {
                this.doublePointsActive = false;
            }
        }
    }

    activatePowerUp(type) {
        switch (type) {
            case 'shield':
                this.shieldActive = true;
                this.shieldTimer = CONFIG.POWERUP_DURATION;
                break;
            case 'magnet':
                this.magnetActive = true;
                this.magnetTimer = CONFIG.POWERUP_DURATION;
                break;
            case 'double':
                this.doublePointsActive = true;
                this.doublePointsTimer = CONFIG.POWERUP_DURATION;
                break;
        }
    }

    addScore(points) {
        const multiplier = this.doublePointsActive ? 2 : 1;
        this.score += points * multiplier;
        this.currentCombo++;
        if (this.currentCombo > this.highestCombo) {
            this.highestCombo = this.currentCombo;
        }
    }

    resetCombo() {
        this.currentCombo = 0;
    }

    loseLife() {
        if (this.shieldActive) {
            this.shieldActive = false;
            this.shieldTimer = 0;
            return false; // Shield absorbed the hit
        }
        
        this.lives--;
        this.resetCombo();
        return this.lives <= 0;
    }

    gainLife() {
        if (this.lives < this.maxLives) {
            this.lives++;
            return true;
        }
        return false;
    }

    togglePause() {
        this.paused = !this.paused;
        return this.paused;
    }

    markTutorialShown() {
        this.tutorialShown = true;
        localStorage.setItem('susies-quest-tutorial-shown', 'true');
    }

    resetTutorial() {
        this.tutorialShown = false;
        localStorage.removeItem('susies-quest-tutorial-shown');
    }

    // ============================================================
    // Fetch with timeout helper
    // ============================================================
    async fetchWithTimeout(url, options, timeoutMs = FETCH_TIMEOUT_MS) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        }
    }

    // ============================================================
    // Fetch leaderboard from remote API with retry
    // ============================================================
    async fetchLeaderboard(retryCount = 0) {
        // Prevent concurrent fetches
        if (this.isFetching) {
            return this.leaderboard;
        }
        
        this.isFetching = true;
        this.lastError = null;
        
        try {
            const response = await this.fetchWithTimeout(LEADERBOARD_API_URL, {
                method: 'GET'
            });
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success && Array.isArray(data.leaderboard)) {
                this.leaderboard = data.leaderboard;
                this.useRemoteLeaderboard = true;
                // Cache locally as backup
                localStorage.setItem('susies-quest-leaderboard', JSON.stringify(this.leaderboard));
                return this.leaderboard;
            } else {
                throw new Error(data.error || 'Invalid response format');
            }
        } catch (error) {
            console.warn(`Leaderboard fetch failed (attempt ${retryCount + 1}):`, error.message);
            
            // Retry once
            if (retryCount < MAX_RETRIES) {
                this.isFetching = false;
                // Wait 1 second before retry
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.fetchLeaderboard(retryCount + 1);
            }
            
            this.lastError = 'Could not reach leaderboard server. Showing cached scores.';
            this.useRemoteLeaderboard = false;
            return this.leaderboard;
        } finally {
            this.isFetching = false;
        }
    }

    // ============================================================
    // Submit score to remote API with retry
    // ============================================================
    async saveScore(retryCount = 0) {
        // Prevent double submissions
        if (this.isSubmitting) {
            return false;
        }
        
        // Always save locally first as backup
        this.saveScoreLocally();
        
        // Don't submit trivially low scores
        if (this.score < 10) {
            this.lastError = null;
            return false;
        }
        
        this.isSubmitting = true;
        this.lastError = null;
        
        try {
            const response = await this.fetchWithTimeout(LEADERBOARD_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.playerName,
                    score: this.score
                })
            });
            
            if (response.status === 429) {
                // Rate limited - not an error, just wait
                this.lastError = 'Submitted too quickly. Score saved locally.';
                this.isSubmitting = false;
                return this.isHighScore();
            }
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                this.lastRank = data.rank;
                this.useRemoteLeaderboard = true;
                
                // If server returned the updated leaderboard, use it directly
                if (Array.isArray(data.leaderboard)) {
                    this.leaderboard = data.leaderboard;
                    localStorage.setItem('susies-quest-leaderboard', JSON.stringify(this.leaderboard));
                } else {
                    // Otherwise fetch fresh leaderboard
                    await this.fetchLeaderboard();
                }
                
                this.isSubmitting = false;
                return data.rank <= 10;
            } else {
                throw new Error(data.error || 'Failed to submit score');
            }
        } catch (error) {
            console.warn(`Score submission failed (attempt ${retryCount + 1}):`, error.message);
            
            // Retry once
            if (retryCount < MAX_RETRIES) {
                this.isSubmitting = false;
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.saveScore(retryCount + 1);
            }
            
            this.lastError = 'Could not submit score online. Saved locally.';
            this.useRemoteLeaderboard = false;
            this.isSubmitting = false;
            return this.isHighScore();
        }
    }

    // ============================================================
    // Save score to local storage (backup/fallback)
    // Deduplicates by name, keeps highest score
    // ============================================================
    saveScoreLocally() {
        const nameLower = this.playerName.toLowerCase();
        const existingIndex = this.leaderboard.findIndex(
            entry => (entry.name || '').toLowerCase() === nameLower
        );
        
        if (existingIndex !== -1) {
            // Only update if new score is higher
            if (this.score > this.leaderboard[existingIndex].score) {
                this.leaderboard[existingIndex].score = this.score;
                this.leaderboard[existingIndex].date = new Date().toISOString();
            }
        } else {
            this.leaderboard.push({
                name: this.playerName,
                score: this.score,
                date: new Date().toISOString()
            });
        }

        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 50); // Keep top 50 locally

        localStorage.setItem('susies-quest-leaderboard', JSON.stringify(this.leaderboard));
    }

    // ============================================================
    // Check if current score qualifies as a high score
    // ============================================================
    isHighScore() {
        if (this.leaderboard.length < 10) {
            return true;
        }
        const topTen = this.leaderboard.slice(0, 10);
        const lowestScore = topTen[topTen.length - 1].score;
        return this.score > lowestScore;
    }

    // ============================================================
    // Get the leaderboard (cached data)
    // ============================================================
    getLeaderboard() {
        return this.leaderboard;
    }

    // ============================================================
    // Get status message for the user
    // ============================================================
    getHighScoreMessage() {
        if (this.lastRank !== null) {
            if (this.lastRank === 1) {
                return "NEW HIGH SCORE! You're #1!";
            } else if (this.lastRank <= 10) {
                return `You're #${this.lastRank} on the global leaderboard!`;
            } else {
                return `You ranked #${this.lastRank} globally.`;
            }
        }
        
        // Fallback to local check
        const nameLower = this.playerName.toLowerCase();
        const index = this.leaderboard.findIndex(
            entry => (entry.name || '').toLowerCase() === nameLower
        );
        if (index === 0) {
            return "NEW HIGH SCORE! You're #1!";
        } else if (index !== -1 && index < 10) {
            return `You're #${index + 1} on the leaderboard!`;
        }
        return "";
    }

    getErrorMessage() {
        return this.lastError;
    }

    getStats() {
        return {
            score: this.score,
            platformsCleared: this.platformsCleared,
            collectiblesGathered: this.collectiblesGathered,
            enemiesAvoided: this.enemiesAvoided,
            highestCombo: this.highestCombo
        };
    }

    getActivePowerUps() {
        const active = [];
        if (this.shieldActive) {
            active.push({ type: 'shield', timer: this.shieldTimer, maxTimer: CONFIG.POWERUP_DURATION });
        }
        if (this.magnetActive) {
            active.push({ type: 'magnet', timer: this.magnetTimer, maxTimer: CONFIG.POWERUP_DURATION });
        }
        if (this.doublePointsActive) {
            active.push({ type: 'double', timer: this.doublePointsTimer, maxTimer: CONFIG.POWERUP_DURATION });
        }
        return active;
    }
}
