import { ASSETS, loadAssets } from './assets.js';
import { CONFIG } from './config.js';
import { GameState } from './state.js';
import { Susie, Platform, Collectible, PowerUp, Enemy, Particle } from './entities.js';
import { InputHandler } from './input.js';
import { Sound } from './sound.js';

class Game {
    constructor() {
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");
        
        // Disable image smoothing for retro pixel look
        this.ctx.imageSmoothingEnabled = false;

        this.state = new GameState();
        this.susie = null;
        this.input = new InputHandler();

        this.platforms = [];
        this.collectibles = [];
        this.powerUps = [];
        this.enemies = [];
        this.particles = [];
        this.platformSpawnTimer = 0;
        
        this.lastTime = 0;
        this.deltaTime = 16;
        
        // Retro effects
        this.scanlinePattern = null;
        
        // Screen shake effect
        this.screenShake = 0;
        this.screenShakeX = 0;
        this.screenShakeY = 0;
        
        this.init();
    }

    async init() {
        // Show loading screen
        this.showLoading();
        
        // Load assets
        await loadAssets();
        window.gameAssets = ASSETS;
        
        // Initialize sound
        Sound.init();
        
        this.resize();
        this.susie = new Susie(this.canvas.width, this.canvas.height);
        
        // Create scanline pattern for retro effect
        this.createScanlinePattern();

        window.addEventListener("resize", () => this.resize());
        
        // Game controls
        document.getElementById("start-btn").addEventListener("click", () => this.handleStartClick());
        document.getElementById("restart-btn").addEventListener("click", () => this.restartGame());
        document.getElementById("pause-btn").addEventListener("click", () => this.togglePause());
        document.getElementById("resume-btn").addEventListener("click", () => this.togglePause());
        document.getElementById("tutorial-btn").addEventListener("click", () => this.showTutorial());
        document.getElementById("tutorial-close-btn").addEventListener("click", () => this.hideTutorial());
        document.getElementById("tutorial-start-btn").addEventListener("click", () => this.startFromTutorial());
        
        // Sound controls
        document.getElementById("sound-btn").addEventListener("click", () => this.toggleSound());
        document.getElementById("music-btn").addEventListener("click", () => this.toggleMusic());

        this.updateLeaderboardDisplay("welcome-leaderboard");
        this.toggleGameUI(false);
        this.hideLoading();
        
        // Show tutorial for first-time players
        if (!this.state.tutorialShown) {
            this.showTutorial();
        }
    }

    showLoading() {
        document.getElementById("loading-screen").style.display = "flex";
    }

    hideLoading() {
        document.getElementById("loading-screen").style.display = "none";
    }

    createScanlinePattern() {
        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = 4;
        patternCanvas.height = 4;
        const patternCtx = patternCanvas.getContext('2d');
        patternCtx.fillStyle = `rgba(0, 0, 0, ${CONFIG.SCANLINE_OPACITY})`;
        patternCtx.fillRect(0, 0, 4, 2);
        this.scanlinePattern = this.ctx.createPattern(patternCanvas, 'repeat');
    }

    resize() {
        // Mobile-first sizing
        const maxWidth = 500;
        this.canvas.width = Math.min(window.innerWidth, maxWidth);
        this.canvas.height = window.innerHeight;
        
        if (this.susie) {
            this.susie.startX = this.canvas.width / 2 - this.susie.width / 2;
        }
        
        // Recreate scanline pattern after resize
        this.createScanlinePattern();
    }

    handleStartClick() {
        Sound.resume();
        Sound.playSelect();
        this.startGame();
    }

    startGame() {
        const nameInput = document.getElementById("player-name");
        this.state.playerName = nameInput.value.trim() || "Player";

        document.getElementById("welcome-screen").style.display = "none";
        this.toggleGameUI(true);

        this.resetGame();
        this.state.active = true;
        Sound.playStart();
        Sound.startMusic();
        this.lastTime = performance.now();
        this.gameLoop();
    }

    restartGame() {
        Sound.playSelect();
        document.getElementById("game-over-screen").style.display = "none";
        this.resetGame();
        this.state.active = true;
        Sound.startMusic();
        this.lastTime = performance.now();
        this.gameLoop();
    }

    resetGame() {
        this.state.reset();
        this.susie.reset(this.canvas.width, this.canvas.height);
        this.platforms = [];
        this.collectibles = [];
        this.powerUps = [];
        this.enemies = [];
        this.particles = [];
        this.createInitialPlatforms();
        this.updateScoreDisplay();
        this.updateLivesDisplay();
    }

    toggleGameUI(show) {
        const display = show ? "flex" : "none";
        document.getElementById("left-btn").style.display = display;
        document.getElementById("right-btn").style.display = display;
        document.getElementById("pause-btn").style.display = show ? "block" : "none";
        document.getElementById("score-display").style.display = show ? "block" : "none";
        document.getElementById("lives-display").style.display = show ? "flex" : "none";
        document.getElementById("powerup-display").style.display = show ? "flex" : "none";
    }

    togglePause() {
        const isPaused = this.state.togglePause();
        Sound.playSelect();
        
        if (isPaused) {
            Sound.stopMusic();
            document.getElementById("pause-screen").style.display = "flex";
        } else {
            Sound.startMusic();
            document.getElementById("pause-screen").style.display = "none";
            this.lastTime = performance.now();
            this.gameLoop();
        }
    }

    showTutorial() {
        document.getElementById("tutorial-screen").style.display = "flex";
    }

    hideTutorial() {
        document.getElementById("tutorial-screen").style.display = "none";
        this.state.markTutorialShown();
    }

    startFromTutorial() {
        this.hideTutorial();
        this.handleStartClick();
    }

    toggleSound() {
        const enabled = Sound.toggleSound();
        document.getElementById("sound-btn").textContent = enabled ? "🔊" : "🔇";
    }

    toggleMusic() {
        const enabled = Sound.toggleMusic();
        document.getElementById("music-btn").textContent = enabled ? "🎵" : "🎵✕";
        if (enabled && this.state.active && !this.state.paused) {
            Sound.startMusic();
        }
    }

    createInitialPlatforms() {
        // Platform under Susie
        this.platforms.push(new Platform(
            this.canvas.width / 2 - 70, 
            this.canvas.height - 120, 
            140, 
            28
        ));

        const platformCount = 7;
        const spacing = this.canvas.height / platformCount;
        for (let i = 1; i < platformCount; i++) {
            this.createPlatformAt(this.canvas.height - spacing * i);
        }
    }

    createPlatformAt(y) {
        const width = Math.random() * 60 + 80;
        const x = Math.random() * (this.canvas.width - width);

        // Choose platform type based on difficulty and weights
        const type = this.choosePlatformType();
        this.platforms.push(new Platform(x, y, width, 28, type));

        // Spawn collectible
        if (Math.random() < 0.5) {
            const collectibleType = Math.random() < 0.6 ? "yarn" : "candy";
            this.collectibles.push(new Collectible(
                x + Math.random() * (width - 35), 
                y - 45, 
                35, 
                collectibleType
            ));
        }

        // Spawn power-up (rare)
        if (Math.random() < CONFIG.POWERUP_SPAWN_CHANCE) {
            const powerUpTypes = ['shield', 'magnet', 'double'];
            const powerUpType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
            this.powerUps.push(new PowerUp(x + width / 2 - 18, y - 50, powerUpType));
        }

        // Spawn enemy (based on difficulty)
        const enemyChance = CONFIG.ENEMY_SPAWN_CHANCE * this.state.difficultyMultiplier;
        if (Math.random() < enemyChance && y < this.canvas.height - 200) {
            this.enemies.push(new Enemy(
                Math.random() * (this.canvas.width - 36), 
                y - 60,
                this.canvas.width
            ));
        }
    }

    choosePlatformType() {
        const rand = Math.random();
        const difficultyFactor = Math.min(this.state.difficultyMultiplier - 1, 1);
        
        // More complex platforms as difficulty increases
        const normalChance = 0.6 - difficultyFactor * 0.3;
        const movingChance = 0.15 + difficultyFactor * 0.1;
        const cloudChance = 0.1 + difficultyFactor * 0.1;
        const bouncyChance = 0.1;
        const breakableChance = 0.05 + difficultyFactor * 0.1;

        if (rand < normalChance) return 'NORMAL';
        if (rand < normalChance + movingChance) return 'MOVING';
        if (rand < normalChance + movingChance + cloudChance) return 'CLOUD';
        if (rand < normalChance + movingChance + cloudChance + bouncyChance) return 'BOUNCY';
        return 'BREAKABLE';
    }

    gameLoop(currentTime = performance.now()) {
        if (!this.state.active || this.state.paused) return;
        
        this.deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update();
        this.draw();
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update() {
        this.state.updateDifficulty();
        this.state.updatePowerUps(this.deltaTime);
        
        const speed = CONFIG.PLATFORM_SPEED * this.state.difficultyMultiplier;

        this.susie.update(this.canvas.width, this.canvas.height, this.input);

        // Platform collisions & updates
        this.platforms.forEach((platform, index) => {
            platform.update(speed, this.canvas.width);

            // Collision detection
            if (platform.isCollidable() &&
                this.susie.vy > 0 &&
                this.susie.x + this.susie.width > platform.x &&
                this.susie.x < platform.x + platform.width &&
                this.susie.y + this.susie.height > platform.y &&
                this.susie.y + this.susie.height < platform.y + platform.height + this.susie.vy) {

                this.susie.land(platform.y);
                const jumpMultiplier = platform.getJumpMultiplier();
                this.susie.jump(jumpMultiplier);
                platform.onTouch();
                
                if (platform.type === 'BOUNCY') {
                    Sound.playBounce();
                } else if (platform.type === 'BREAKABLE') {
                    Sound.playBreak();
                } else {
                    Sound.playJump();
                }
                
                this.createJumpParticles();
            }

            if (platform.y > this.canvas.height) {
                this.platforms.splice(index, 1);
                this.state.addScore(CONFIG.SCORE_PLATFORM_PASS);
                this.state.platformsCleared++;
                this.updateScoreDisplay();
            }
        });

        // Collectibles
        this.collectibles.forEach((item, index) => {
            item.update(speed, this.state.magnetActive, this.susie);
            if (this.checkCollision(this.susie, item)) {
                this.collectibles.splice(index, 1);
                const points = item.type === "yarn" ? CONFIG.SCORE_YARN : CONFIG.SCORE_CANDY;
                this.state.addScore(points);
                this.state.collectiblesGathered++;
                this.updateScoreDisplay();
                this.createCollectParticles(item);
                
                if (item.type === 'yarn') {
                    Sound.playCollectYarn();
                } else {
                    Sound.playCollectCandy();
                }
            }
            if (item.y > this.canvas.height) this.collectibles.splice(index, 1);
        });

        // Power-ups
        this.powerUps.forEach((powerUp, index) => {
            powerUp.update(speed);
            if (this.checkCollision(this.susie, powerUp)) {
                this.powerUps.splice(index, 1);
                this.state.activatePowerUp(powerUp.type);
                this.updatePowerUpDisplay();
                Sound.playPowerUp();
                this.createPowerUpParticles(powerUp);
            }
            if (powerUp.y > this.canvas.height) this.powerUps.splice(index, 1);
        });

        // Enemies
        this.enemies.forEach((enemy, index) => {
            enemy.update(speed);
            if (this.checkCollision(this.susie, enemy)) {
                if (!this.susie.invincible) {
                    const gameOver = this.state.loseLife();
                    this.updateLivesDisplay();
                    
                    if (gameOver) {
                        this.triggerScreenShake(12);
                        this.gameOver();
                        return;
                    } else {
                        Sound.playHit();
                        this.susie.makeInvincible(90);
                        this.createHitParticles();
                        this.triggerScreenShake(8);
                    }
                }
                this.enemies.splice(index, 1);
            }
            if (enemy.y > this.canvas.height) {
                this.enemies.splice(index, 1);
                this.state.addScore(CONFIG.SCORE_ENEMY_AVOID);
                this.state.enemiesAvoided++;
            }
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
            this.createPlatformAt(-30);
        }

        // Update power-up display
        this.updatePowerUpDisplay();

        // Check for game over
        if (this.susie.y > this.canvas.height) {
            const gameOver = this.state.loseLife();
            if (gameOver) {
                this.triggerScreenShake(15);
                this.gameOver();
            } else {
                Sound.playHit();
                this.susie.reset(this.canvas.width, this.canvas.height);
                this.susie.makeInvincible(120);
                this.updateLivesDisplay();
                this.triggerScreenShake(6);
            }
        }
    }

    checkCollision(a, b) {
        const bWidth = b.size || b.width;
        const bHeight = b.size || b.height;
        return a.x + a.width > b.x &&
            a.x < b.x + bWidth &&
            a.y + a.height > b.y &&
            a.y < b.y + bHeight;
    }

    createJumpParticles() {
        for (let i = 0; i < 6; i++) {
            this.particles.push(new Particle(
                this.susie.x + this.susie.width / 2,
                this.susie.y + this.susie.height,
                Math.random() * 4 + 3,
                (Math.random() - 0.5) * 4,
                Math.random() * 2 + 1,
                `hsl(${Math.random() * 60 + 30}, 80%, 70%)`,
                25
            ));
        }
    }

    createCollectParticles(item) {
        const color = item.type === "yarn" ? "#ff88aa" : "#ffcc00";
        for (let j = 0; j < 10; j++) {
            this.particles.push(new Particle(
                item.x + item.size / 2,
                item.y + item.size / 2,
                Math.random() * 5 + 2,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6,
                color,
                35
            ));
        }
    }

    createPowerUpParticles(powerUp) {
        const colors = {
            shield: '#4488ff',
            magnet: '#ff4444',
            double: '#ffcc00'
        };
        const color = colors[powerUp.type] || '#ffffff';
        
        for (let j = 0; j < 15; j++) {
            this.particles.push(new Particle(
                powerUp.x + powerUp.size / 2,
                powerUp.y + powerUp.size / 2,
                Math.random() * 6 + 3,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                color,
                45
            ));
        }
    }

    createHitParticles() {
        for (let j = 0; j < 12; j++) {
            this.particles.push(new Particle(
                this.susie.x + this.susie.width / 2,
                this.susie.y + this.susie.height / 2,
                Math.random() * 5 + 3,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                '#ff4444',
                30
            ));
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update screen shake
        if (this.screenShake > 0) {
            this.screenShakeX = (Math.random() - 0.5) * this.screenShake;
            this.screenShakeY = (Math.random() - 0.5) * this.screenShake;
            this.screenShake *= 0.9;
            if (this.screenShake < 0.5) this.screenShake = 0;
        } else {
            this.screenShakeX = 0;
            this.screenShakeY = 0;
        }

        // Apply screen shake
        this.ctx.save();
        this.ctx.translate(this.screenShakeX, this.screenShakeY);

        // Draw parallax background
        this.drawParallaxBackground();
        
        // Draw game objects
        this.platforms.forEach(p => p.draw(this.ctx));
        this.collectibles.forEach(c => c.draw(this.ctx));
        this.powerUps.forEach(p => p.draw(this.ctx));
        this.enemies.forEach(e => e.draw(this.ctx));
        this.particles.forEach(p => p.draw(this.ctx));
        this.susie.draw(this.ctx);

        // Draw shield effect around Susie if active
        if (this.state.shieldActive) {
            this.drawShieldEffect();
        }

        // Retro scanline overlay
        if (this.scanlinePattern) {
            this.ctx.fillStyle = this.scanlinePattern;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // CRT vignette effect
        if (CONFIG.CRT_VIGNETTE) {
            this.drawVignette();
        }

        // Restore from screen shake
        this.ctx.restore();

        // HUD (drawn without shake)
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        this.ctx.font = "bold 12px 'Courier New', monospace";
        this.ctx.fillText(`SPEED: ${Math.round(this.state.difficultyMultiplier * 100)}%`, 15, 25);
    }

    triggerScreenShake(intensity = 5) {
        this.screenShake = intensity;
    }

    drawParallaxBackground() {
        // Sky gradient - warm sunset/sunrise feel
        const grad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        grad.addColorStop(0, '#87CEEB');    // Light sky blue
        grad.addColorStop(0.3, '#B8D4E8');  // Soft blue-lavender
        grad.addColorStop(0.5, '#D4C4E8');  // Light purple
        grad.addColorStop(0.7, '#E8D4E0');  // Pink tint
        grad.addColorStop(0.85, '#F0E8E0'); // Warm light
        grad.addColorStop(0.95, '#FFF8E7'); // Warm cream
        grad.addColorStop(1, '#FFE4B5');    // Moccasin/warm
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Initialize parallax offsets
        if (!this.mountainOffset) this.mountainOffset = 0;
        if (!this.treeOffset) this.treeOffset = 0;
        
        // Update parallax offsets
        this.mountainOffset += 0.2;
        this.treeOffset += 0.5;
        
        const assets = window.gameAssets;
        
        // Draw mountains layer (far background - slowest)
        if (assets && assets.bg_mountains) {
            const mountainImg = assets.bg_mountains;
            const mountainScale = this.canvas.height * 0.5 / mountainImg.height;
            const mountainWidth = mountainImg.width * mountainScale;
            const mountainY = this.canvas.height * 0.3;
            
            // Tile the mountains
            const mountainOffsetX = -(this.mountainOffset % mountainWidth);
            for (let x = mountainOffsetX; x < this.canvas.width + mountainWidth; x += mountainWidth) {
                this.ctx.drawImage(
                    mountainImg,
                    x, mountainY,
                    mountainWidth, this.canvas.height * 0.5
                );
            }
        }
        
        // Draw trees layer (mid background - medium speed)
        if (assets && assets.bg_trees) {
            const treeImg = assets.bg_trees;
            const treeScale = this.canvas.height * 0.35 / treeImg.height;
            const treeWidth = treeImg.width * treeScale;
            const treeY = this.canvas.height * 0.55;
            
            // Tile the trees
            const treeOffsetX = -(this.treeOffset % treeWidth);
            for (let x = treeOffsetX; x < this.canvas.width + treeWidth; x += treeWidth) {
                this.ctx.drawImage(
                    treeImg,
                    x, treeY,
                    treeWidth, this.canvas.height * 0.45
                );
            }
        }
    }

    drawPixelHill(x, y, width, height) {
        // Draw a simple rounded hill shape with pixel-style steps
        const steps = 8;
        const stepWidth = width / steps;
        
        for (let i = 0; i < steps; i++) {
            // Parabolic curve for hill shape
            const t = (i - steps / 2) / (steps / 2);
            const h = height * (1 - t * t);
            this.ctx.fillRect(x + i * stepWidth, y + (height - h), stepWidth + 1, h + 50);
        }
    }

    drawShieldEffect() {
        this.ctx.save();
        this.ctx.strokeStyle = `rgba(68, 136, 255, ${0.5 + Math.sin(Date.now() / 100) * 0.3})`;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(
            this.susie.x + this.susie.width / 2,
            this.susie.y + this.susie.height / 2,
            this.susie.width * 0.8,
            0,
            Math.PI * 2
        );
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawVignette() {
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, this.canvas.height * 0.8
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateScoreDisplay() {
        const scoreEl = document.getElementById("score-display");
        scoreEl.textContent = `Score: ${this.state.score}`;
        
        // Flash effect for score update
        scoreEl.style.transform = 'scale(1.1)';
        setTimeout(() => {
            scoreEl.style.transform = 'scale(1)';
        }, 100);
    }

    updateLivesDisplay() {
        const livesEl = document.getElementById("lives-display");
        livesEl.innerHTML = '';
        
        for (let i = 0; i < this.state.maxLives; i++) {
            const heart = document.createElement('span');
            heart.className = 'heart';
            heart.textContent = i < this.state.lives ? '❤️' : '🖤';
            livesEl.appendChild(heart);
        }
    }

    updatePowerUpDisplay() {
        const powerUpEl = document.getElementById("powerup-display");
        const activePowerUps = this.state.getActivePowerUps();
        
        powerUpEl.innerHTML = '';
        
        activePowerUps.forEach(pu => {
            const div = document.createElement('div');
            div.className = 'powerup-indicator';
            
            const icon = document.createElement('span');
            icon.className = 'powerup-icon';
            if (pu.type === 'shield') icon.textContent = '🛡️';
            else if (pu.type === 'magnet') icon.textContent = '🧲';
            else if (pu.type === 'double') icon.textContent = '2️⃣';
            
            const bar = document.createElement('div');
            bar.className = 'powerup-bar';
            const fill = document.createElement('div');
            fill.className = 'powerup-bar-fill';
            fill.style.width = `${(pu.timer / pu.maxTimer) * 100}%`;
            bar.appendChild(fill);
            
            div.appendChild(icon);
            div.appendChild(bar);
            powerUpEl.appendChild(div);
        });
    }

    gameOver() {
        this.state.active = false;
        Sound.stopMusic();
        Sound.playGameOver();
        this.state.saveScore();

        document.getElementById("final-score").textContent = `Score: ${this.state.score}`;
        document.getElementById("high-score-message").textContent = this.state.getHighScoreMessage();
        
        // Show stats
        const stats = this.state.getStats();
        document.getElementById("stats-display").innerHTML = `
            <div class="stat-item">Platforms: ${stats.platformsCleared}</div>
            <div class="stat-item">Collectibles: ${stats.collectiblesGathered}</div>
            <div class="stat-item">Enemies Avoided: ${stats.enemiesAvoided}</div>
            <div class="stat-item">Best Combo: ${stats.highestCombo}</div>
        `;

        this.updateLeaderboardDisplay("gameover-leaderboard");
        document.getElementById("game-over-screen").style.display = "flex";
    }

    updateLeaderboardDisplay(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = "";

        if (this.state.leaderboard.length === 0) {
            const li = document.createElement("li");
            li.style.textAlign = "center";
            li.style.padding = "10px";
            li.style.opacity = "0.7";
            li.textContent = "No scores yet. Be the first!";
            el.appendChild(li);
            return;
        }

        this.state.leaderboard.slice(0, 5).forEach((entry, i) => {
            const li = document.createElement("li");
            li.className = "leaderboard-item";
            
            // Highlight current player
            if (entry.name === this.state.playerName) {
                li.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            }
            
            // Medal for top 3
            let medal = '';
            if (i === 0) medal = '🥇 ';
            else if (i === 1) medal = '🥈 ';
            else if (i === 2) medal = '🥉 ';
            
            li.innerHTML = `<span>${medal}${i + 1}. ${entry.name}</span><span>${entry.score}</span>`;
            el.appendChild(li);
        });
    }
}

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
