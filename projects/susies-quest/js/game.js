import { ASSETS } from './assets.js';
import { CONFIG } from './config.js';
import { GameState } from './state.js';
import { Susie, Platform, Collectible, Particle } from './entities.js';
import { InputHandler } from './input.js';

class Game {
    constructor() {
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");

        // Expose assets globally for entities
        window.gameAssets = ASSETS;

        this.state = new GameState();
        this.susie = new Susie(this.canvas.width, this.canvas.height);
        this.input = new InputHandler();

        this.platforms = [];
        this.collectibles = [];
        this.particles = [];
        this.platformSpawnTimer = 0;

        this.init();
    }

    async init() {
        // Assets are now procedural SVG, no async loading needed.
        this.resize();

        window.addEventListener("resize", () => this.resize());
        document.getElementById("start-btn").addEventListener("click", () => this.startGame());
        document.getElementById("restart-btn").addEventListener("click", () => this.restartGame());

        this.updateLeaderboardDisplay("welcome-leaderboard");

        // Hide game UI initially
        this.toggleGameUI(false);
    }

    async loadAssets() {
        const loadPromises = Object.entries(CONFIG.ASSETS).map(([key, src]) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    this.images[key] = img;
                    resolve();
                };
            });
        });
        await Promise.all(loadPromises);
    }

    resize() {
        this.canvas.width = window.innerWidth > 500 ? 500 : window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.susie.startX = this.canvas.width / 2 - this.susie.width / 2;
    }

    startGame() {
        const nameInput = document.getElementById("player-name");
        this.state.playerName = nameInput.value.trim() || "Player";

        document.getElementById("welcome-screen").style.display = "none";
        this.toggleGameUI(true);

        this.resetGame();
        this.state.active = true;
        this.gameLoop();
    }

    restartGame() {
        document.getElementById("game-over-screen").style.display = "none";
        this.resetGame();
        this.state.active = true;
        this.gameLoop();
    }

    resetGame() {
        this.state.reset();
        this.susie.reset(this.canvas.width, this.canvas.height);
        this.platforms = [];
        this.collectibles = [];
        this.particles = [];
        this.createInitialPlatforms();
        this.updateScoreDisplay();
    }

    toggleGameUI(show) {
        const display = show ? "flex" : "none";
        document.getElementById("left-btn").style.display = display;
        document.getElementById("right-btn").style.display = display;
        document.getElementById("score-display").style.display = show ? "block" : "none";
    }

    createInitialPlatforms() {
        // Platform under Susie
        this.platforms.push(new Platform(this.canvas.width / 2 - 60, this.canvas.height - 120, 120, 20));

        const platformCount = 7;
        const spacing = this.canvas.height / platformCount;
        for (let i = 1; i < platformCount; i++) {
            this.createPlatformAt(this.canvas.height - spacing * i);
        }
    }

    createPlatformAt(y) {
        const width = Math.random() * 60 + 60;
        const x = Math.random() * (this.canvas.width - width);

        // Randomly choose platform type based on difficulty
        const rand = Math.random();
        let type = 'NORMAL';

        // Increase chance of complex platforms as difficulty increases
        const complexChance = Math.min(0.1 + (this.state.difficultyMultiplier - 1), 0.6);

        if (rand < complexChance) {
            type = Math.random() < 0.5 ? 'MOVING' : 'CLOUD';
        }

        this.platforms.push(new Platform(x, y, width, 20, type));

        if (Math.random() < 0.6) {
            const type = Math.random() < 0.5 ? "yarn" : "candy";
            this.collectibles.push(new Collectible(x + Math.random() * (width - 30), y - 40, 30, type));
        }
    }

    gameLoop() {
        if (!this.state.active) return;
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        this.state.updateDifficulty();
        const speed = CONFIG.PLATFORM_SPEED * this.state.difficultyMultiplier;

        this.susie.update(this.canvas.width, this.canvas.height, this.input);

        // Platform collisions & updates
        let landed = false;
        this.platforms.forEach((platform, index) => {
            platform.update(speed, this.canvas.width);

            // Only collide if platform is visible
            if (platform.opacity > 0.1 &&
                this.susie.vy > 0 &&
                this.susie.x + this.susie.width > platform.x &&
                this.susie.x < platform.x + platform.width &&
                this.susie.y + this.susie.height > platform.y &&
                this.susie.y + this.susie.height < platform.y + platform.height + this.susie.vy) {

                this.susie.land(platform.y);
                this.susie.jump();
                platform.onTouch(); // Trigger effects like disappearing
                landed = true;
                this.createJumpParticles();
            }

            if (platform.y > this.canvas.height) {
                this.platforms.splice(index, 1);
                this.state.addScore(10);
                this.updateScoreDisplay();
            }
        });

        // Collectibles
        this.collectibles.forEach((item, index) => {
            item.update(speed);
            if (this.checkCollision(this.susie, item)) {
                this.collectibles.splice(index, 1);
                this.state.addScore(item.type === "yarn" ? 100 : 150);
                this.updateScoreDisplay();
                this.createCollectParticles(item);
            }
            if (item.y > this.canvas.height) this.collectibles.splice(index, 1);
        });

        // Particles
        this.particles.forEach((p, index) => {
            p.update(speed);
            if (p.life <= 0) this.particles.splice(index, 1);
        });

        // Spawning
        this.platformSpawnTimer++;
        if (this.platformSpawnTimer >= 60 / this.state.difficultyMultiplier) {
            this.platformSpawnTimer = 0;
            this.createPlatformAt(0);
        }

        if (this.susie.y > this.canvas.height) this.gameOver();
    }

    checkCollision(a, b) {
        return a.x + a.width > b.x &&
            a.x < b.x + (b.size || b.width) &&
            a.y + a.height > b.y &&
            a.y < b.y + (b.size || b.height);
    }

    createJumpParticles() {
        for (let i = 0; i < 5; i++) {
            this.particles.push(new Particle(
                this.susie.x + this.susie.width / 2,
                this.susie.y + this.susie.height,
                Math.random() * 5 + 3,
                (Math.random() - 0.5) * 3,
                Math.random() * 2 + 1,
                `hsl(${Math.random() * 60 + 180}, 70%, 60%)`,
                30
            ));
        }
    }

    createCollectParticles(item) {
        const color = item.type === "yarn" ? "pink" : "yellow";
        for (let j = 0; j < 8; j++) {
            this.particles.push(new Particle(
                item.x + item.size / 2,
                item.y + item.size / 2,
                Math.random() * 6 + 2,
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 5,
                color,
                40
            ));
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Background
        const grad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        grad.addColorStop(0, "#85CDE9");
        grad.addColorStop(1, "#5B91E5");
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawClouds();
        this.platforms.forEach(p => p.draw(this.ctx));
        this.collectibles.forEach(c => c.draw(this.ctx));
        this.particles.forEach(p => p.draw(this.ctx));
        this.susie.draw(this.ctx);

        // HUD
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        this.ctx.font = "bold 14px 'Courier New', monospace";
        this.ctx.fillText(`SPEED: ${Math.round(this.state.difficultyMultiplier * 100)}%`, 20, 30);
    }

    drawClouds() {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        const clouds = [
            { x: 50, y: 100, s: 40 },
            { x: this.canvas.width - 150, y: 180, s: 60 },
            { x: this.canvas.width / 2 - 100, y: 300, s: 30 }
        ];
        clouds.forEach(c => {
            // 8-bit blocky clouds
            this.ctx.fillRect(c.x, c.y, c.s * 2, c.s);
            this.ctx.fillRect(c.x + c.s * 0.5, c.y - c.s * 0.5, c.s, c.s);
        });
    }

    updateScoreDisplay() {
        document.getElementById("score-display").textContent = `Score: ${this.state.score}`;
    }

    gameOver() {
        this.state.active = false;
        this.state.saveScore();

        document.getElementById("final-score").textContent = `Your score: ${this.state.score}`;
        document.getElementById("high-score-message").textContent = this.state.getHighScoreMessage();

        this.updateLeaderboardDisplay("gameover-leaderboard");
        document.getElementById("game-over-screen").style.display = "flex";
    }

    updateLeaderboardDisplay(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = "";

        if (this.state.leaderboard.length === 0 ||
            (this.state.leaderboard.length === 1 && this.state.leaderboard[0].name === "Mandar" && this.state.leaderboard[0].score === 0)) {
            const li = document.createElement("li");
            li.style.textAlign = "center";
            li.style.padding = "10px";
            li.style.opacity = "0.7";
            li.textContent = "No scores yet. Be the first!";
            el.appendChild(li);
            return;
        }

        this.state.leaderboard.forEach((entry, i) => {
            const li = document.createElement("li");
            li.className = "leaderboard-item";
            li.innerHTML = `<span>${i + 1}. ${entry.name}</span><span>${entry.score}</span>`;
            el.appendChild(li);
        });
    }
}

// Start the game
new Game();
