import { CONFIG } from './config.js';

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
        
        // Leaderboard
        this.leaderboard = JSON.parse(localStorage.getItem('susies-quest-leaderboard')) || [
            { name: "Mandar", score: 4250 }
        ];
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

    saveScore() {
        const existingIndex = this.leaderboard.findIndex(entry => entry.name === this.playerName);
        if (existingIndex !== -1) {
            if (this.score > this.leaderboard[existingIndex].score) {
                this.leaderboard[existingIndex].score = this.score;
            }
        } else {
            if (this.playerName !== "Mandar") {
                this.leaderboard.push({ name: this.playerName, score: this.score });
            }
        }

        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 10); // Keep top 10

        // Ensure Mandar is always included for flavor
        if (!this.leaderboard.some(entry => entry.name === "Mandar")) {
            this.leaderboard.push({ name: "Mandar", score: 4250 });
            this.leaderboard.sort((a, b) => b.score - a.score);
            this.leaderboard = this.leaderboard.slice(0, 10);
        }

        localStorage.setItem('susies-quest-leaderboard', JSON.stringify(this.leaderboard));
    }

    getHighScoreMessage() {
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
