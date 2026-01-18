export class GameState {
    constructor() {
        this.active = false;
        this.score = 0;
        this.playerName = "";
        this.difficultyMultiplier = 1;
        this.leaderboard = JSON.parse(localStorage.getItem('susies-quest-leaderboard')) || [
            { name: "Mandar", score: 4250 }
        ];
    }

    reset() {
        this.score = 0;
        this.difficultyMultiplier = 1;
    }

    updateDifficulty() {
        this.difficultyMultiplier = 1 + Math.min(this.score / 5000, 1.5);
    }

    addScore(points) {
        this.score += points;
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
        this.leaderboard = this.leaderboard.slice(0, 5);

        // Ensure Mandar is always included for flavor
        if (!this.leaderboard.some(entry => entry.name === "Mandar")) {
            this.leaderboard.push({ name: "Mandar", score: 4250 });
            this.leaderboard.sort((a, b) => b.score - a.score);
            this.leaderboard = this.leaderboard.slice(0, 5);
        }

        localStorage.setItem('susies-quest-leaderboard', JSON.stringify(this.leaderboard));
    }

    getHighScoreMessage() {
        const index = this.leaderboard.findIndex(entry => entry.name === this.playerName);
        return index !== -1 ? `You're #${index + 1} on the leaderboard!` : "";
    }
}
