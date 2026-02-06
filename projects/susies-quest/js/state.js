import { CONFIG } from './config.js';

// Remote Leaderboard API URL
const LEADERBOARD_API_URL = 'https://dipoletech.com/projects/susies-quest/leaderboard.php';

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
        
        // Leaderboard - local cache with fallback data
        this.leaderboard = JSON.parse(localStorage.getItem('susies-quest-leaderboard')) || [
            { name: "Mandar", score: 4250 }
        ];
        
        // Track if we're using remote or local leaderboard
        this.useRemoteLeaderboard = true;
        this.lastRank = null;
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

    /**
     * Fetch leaderboard from remote API
     * Falls back to local storage if API fails
     */
    async fetchLeaderboard() {
        try {
            const response = await fetch(LEADERBOARD_API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success && data.leaderboard) {
                this.leaderboard = data.leaderboard;
                this.useRemoteLeaderboard = true;
                // Cache locally as backup
                localStorage.setItem('susies-quest-leaderboard', JSON.stringify(this.leaderboard));
                return this.leaderboard;
            } else {
                throw new Error(data.error || 'Invalid response');
            }
        } catch (error) {
            console.warn('Failed to fetch remote leaderboard, using local cache:', error);
            this.useRemoteLeaderboard = false;
            // Return cached local data
            return this.leaderboard;
        }
    }

    /**
     * Submit score to remote API
     * Also saves locally as backup
     */
    async saveScore() {
        // Always save locally first as backup
        this.saveScoreLocally();
        
        // Try to submit to remote API
        try {
            const response = await fetch(LEADERBOARD_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.playerName,
                    score: this.score
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                this.lastRank = data.rank;
                this.useRemoteLeaderboard = true;
                // Refresh leaderboard after submission
                await this.fetchLeaderboard();
                return data.rank <= 10; // Return true if in top 10
            } else {
                throw new Error(data.error || 'Failed to submit score');
            }
        } catch (error) {
            console.warn('Failed to submit score to remote API:', error);
            this.useRemoteLeaderboard = false;
            // Check local leaderboard for high score
            return this.isHighScore();
        }
    }

    /**
     * Save score to local storage (backup/fallback)
     */
    saveScoreLocally() {
        const existingIndex = this.leaderboard.findIndex(entry => entry.name === this.playerName);
        if (existingIndex !== -1) {
            if (this.score > this.leaderboard[existingIndex].score) {
                this.leaderboard[existingIndex].score = this.score;
            }
        } else {
            this.leaderboard.push({ name: this.playerName, score: this.score });
        }

        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 10); // Keep top 10

        localStorage.setItem('susies-quest-leaderboard', JSON.stringify(this.leaderboard));
    }

    /**
     * Check if current score is a high score (local check)
     */
    isHighScore() {
        if (this.leaderboard.length < 10) {
            return true;
        }
        const lowestScore = this.leaderboard[this.leaderboard.length - 1].score;
        return this.score > lowestScore;
    }

    /**
     * Get the leaderboard (cached data)
     */
    getLeaderboard() {
        return this.leaderboard;
    }

    getHighScoreMessage() {
        if (this.lastRank !== null) {
            if (this.lastRank === 1) {
                return "🎉 NEW HIGH SCORE! You're #1! 🎉";
            } else if (this.lastRank <= 10) {
                return `You're #${this.lastRank} on the global leaderboard!`;
            }
        }
        
        // Fallback to local check
        const index = this.leaderboard.findIndex(entry => entry.name === this.playerName);
        if (index === 0) {
            return "NEW HIGH SCORE! You're #1!";
        } else if (index !== -1) {
            return `You're #${index + 1} on the leaderboard!`;
        }
        return "";
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
