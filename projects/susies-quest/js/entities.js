import { CONFIG } from './config.js';

export class Susie {
    constructor(canvasWidth, canvasHeight) {
        this.width = 50;
        this.height = 75;
        this.startX = canvasWidth / 2 - this.width / 2;
        this.startY = canvasHeight - 200;
        this.reset(canvasWidth, canvasHeight);
    }

    reset(canvasWidth, canvasHeight) {
        this.x = canvasWidth / 2 - this.width / 2;
        this.y = canvasHeight - 200;
        this.vx = 0;
        this.vy = 0;
        this.isJumping = false;
        this.scaleX = 1;
        this.scaleY = 1;
        this.targetScaleX = 1;
        this.targetScaleY = 1;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.flashTimer = 0;
    }

    update(canvasWidth, canvasHeight, input) {
        // Movement with mobile-optimized acceleration
        if (input.left) {
            this.vx -= CONFIG.ACCELERATION;
        } else if (input.right) {
            this.vx += CONFIG.ACCELERATION;
        } else {
            this.vx *= CONFIG.FRICTION;
        }

        if (this.vx > CONFIG.MAX_SPEED) this.vx = CONFIG.MAX_SPEED;
        if (this.vx < -CONFIG.MAX_SPEED) this.vx = -CONFIG.MAX_SPEED;

        this.x += this.vx;

        // Wrap around screen edges
        if (this.x + this.width < 0) this.x = canvasWidth;
        else if (this.x > canvasWidth) this.x = -this.width;

        // Gravity
        this.vy += CONFIG.GRAVITY;
        this.y += this.vy;

        // Squash and stretch animation
        this.scaleX += (this.targetScaleX - this.scaleX) * 0.2;
        this.scaleY += (this.targetScaleY - this.scaleY) * 0.2;

        this.targetScaleX = 1;
        this.targetScaleY = 1;

        if (this.vy < 0) {
            this.targetScaleX = 0.85;
            this.targetScaleY = 1.15;
        }

        // Invincibility timer
        if (this.invincible) {
            this.invincibleTimer--;
            this.flashTimer++;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
                this.flashTimer = 0;
            }
        }
    }

    jump(multiplier = 1) {
        this.vy = -CONFIG.JUMP_FORCE * multiplier;
        this.isJumping = true;
        this.scaleX = 0.7;
        this.scaleY = 1.3;
    }

    land(platformY) {
        this.y = platformY - this.height;
        this.vy = 0;
        this.isJumping = false;
        this.scaleX = 1.3;
        this.scaleY = 0.7;
    }

    makeInvincible(frames = 120) {
        this.invincible = true;
        this.invincibleTimer = frames;
    }

    draw(ctx) {
        // Don't draw if flashing during invincibility
        if (this.invincible && Math.floor(this.flashTimer / 4) % 2 === 0) {
            return;
        }

        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height);
        ctx.scale(this.scaleX, this.scaleY);

        const assets = window.gameAssets || {};
        const img = assets.susie;
        if (img) {
            ctx.drawImage(img, -this.width / 2, -this.height, this.width, this.height);
        } else {
            // Fallback rectangle
            ctx.fillStyle = "#ffcc99";
            ctx.fillRect(-this.width / 2, -this.height, this.width, this.height);
        }

        ctx.restore();
    }
}

export class Platform {
    constructor(x, y, width, height, type = 'NORMAL') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.vx = type === 'MOVING' ? (Math.random() < 0.5 ? 2 : -2) : 0;
        this.opacity = 1;
        this.fading = false;
        this.touched = false;
        this.broken = false;
        this.breakTimer = 0;
        this.bounceAnimation = 0;
        
        // Visual variation
        this.hueShift = 0;
        if (type === 'MOVING') this.hueShift = 90;
        if (type === 'CLOUD') this.hueShift = 180;
        if (type === 'BOUNCY') this.hueShift = 270;
        if (type === 'BREAKABLE') this.hueShift = 30;
    }

    update(speed, canvasWidth) {
        this.y += speed;
        
        if (this.type === 'MOVING') {
            this.x += this.vx;
            if (this.x <= 0 || this.x + this.width >= canvasWidth) this.vx *= -1;
        }
        
        if (this.fading) {
            this.opacity -= 0.05;
            if (this.opacity < 0) this.opacity = 0;
        }
        
        if (this.broken) {
            this.breakTimer++;
            this.opacity -= 0.1;
        }
        
        if (this.bounceAnimation > 0) {
            this.bounceAnimation -= 0.2;
        }
    }

    onTouch() {
        this.touched = true;
        
        if (this.type === 'CLOUD') {
            this.fading = true;
        } else if (this.type === 'BREAKABLE') {
            this.broken = true;
        } else if (this.type === 'BOUNCY') {
            this.bounceAnimation = 1;
        }
    }

    isCollidable() {
        return this.opacity > 0.1 && !this.broken;
    }

    getJumpMultiplier() {
        return this.type === 'BOUNCY' ? CONFIG.BOUNCY_JUMP_MULTIPLIER : 1;
    }

    draw(ctx) {
        if (this.opacity <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        const assets = window.gameAssets || {};
        const img = assets.platform;
        
        // Apply bounce animation
        let drawY = this.y;
        if (this.bounceAnimation > 0) {
            drawY += Math.sin(this.bounceAnimation * Math.PI) * 5;
        }
        
        if (img) {
            // Apply color filter based on platform type
            if (this.hueShift > 0) {
                ctx.filter = `hue-rotate(${this.hueShift}deg)`;
            }
            if (this.type === 'CLOUD') {
                ctx.filter = 'brightness(1.3) saturate(0.5)';
            }
            if (this.type === 'BREAKABLE' && this.touched) {
                ctx.filter = 'brightness(0.7) saturate(1.5)';
            }
            
            ctx.drawImage(img, this.x, drawY, this.width, this.height);
        } else {
            // Fallback
            let color = "#8D6E63";
            if (this.type === 'MOVING') color = "#6E8D63";
            if (this.type === 'CLOUD') color = "#aaddff";
            if (this.type === 'BOUNCY') color = "#ff88cc";
            if (this.type === 'BREAKABLE') color = "#cc8866";
            
            ctx.fillStyle = color;
            ctx.fillRect(this.x, drawY, this.width, this.height);
        }
        
        ctx.restore();
    }
}

export class Collectible {
    constructor(x, y, size, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type;
        this.bobOffset = Math.random() * Math.PI * 2;
        this.bobSpeed = 0.1;
        this.rotation = 0;
        
        if (type === 'candy') {
            this.subtype = 'candy';
        } else {
            this.subtype = 'yarn';
        }
    }

    update(speed, magnetActive = false, susie = null) {
        this.y += speed;
        this.bobOffset += this.bobSpeed;
        this.rotation += 0.02;
        
        // Magnet effect
        if (magnetActive && susie) {
            const dx = (susie.x + susie.width / 2) - (this.x + this.size / 2);
            const dy = (susie.y + susie.height / 2) - (this.y + this.size / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < CONFIG.MAGNET_RANGE) {
                const force = (CONFIG.MAGNET_RANGE - dist) / CONFIG.MAGNET_RANGE * 5;
                this.x += (dx / dist) * force;
                this.y += (dy / dist) * force;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        
        const bobY = this.y + Math.sin(this.bobOffset) * 3;
        const assets = window.gameAssets || {};
        const img = assets[this.subtype];
        
        ctx.translate(this.x + this.size / 2, bobY + this.size / 2);
        ctx.rotate(Math.sin(this.rotation) * 0.1);
        
        if (img) {
            ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
        } else {
            ctx.fillStyle = this.type === 'yarn' ? '#ff88aa' : '#ffcc00';
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

export class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.size = 36;
        this.type = type; // 'shield', 'magnet', 'double'
        this.bobOffset = Math.random() * Math.PI * 2;
        this.glowPhase = 0;
    }

    update(speed) {
        this.y += speed;
        this.bobOffset += 0.08;
        this.glowPhase += 0.1;
    }

    draw(ctx) {
        ctx.save();
        
        const bobY = this.y + Math.sin(this.bobOffset) * 4;
        
        // Glow effect
        const glowSize = 5 + Math.sin(this.glowPhase) * 3;
        ctx.shadowColor = this.type === 'shield' ? '#4488ff' : 
                          this.type === 'magnet' ? '#ff4444' : '#ffcc00';
        ctx.shadowBlur = glowSize;
        
        const assets = window.gameAssets || {};
        const img = assets[`powerup_${this.type}`];
        
        if (img) {
            ctx.drawImage(img, this.x, bobY, this.size, this.size);
        } else {
            // Fallback
            ctx.fillStyle = ctx.shadowColor;
            ctx.beginPath();
            ctx.arc(this.x + this.size / 2, bobY + this.size / 2, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

export class Enemy {
    constructor(x, y, canvasWidth) {
        this.x = x;
        this.y = y;
        this.size = 36;
        this.vx = (Math.random() < 0.5 ? 1 : -1) * CONFIG.ENEMY_SPEED;
        this.canvasWidth = canvasWidth;
        this.rotation = 0;
        this.bobOffset = Math.random() * Math.PI * 2;
    }

    update(speed) {
        this.y += speed;
        this.x += this.vx;
        this.rotation += 0.05;
        this.bobOffset += 0.1;
        
        // Bounce off walls
        if (this.x <= 0 || this.x + this.size >= this.canvasWidth) {
            this.vx *= -1;
        }
    }

    draw(ctx) {
        ctx.save();
        
        const bobY = this.y + Math.sin(this.bobOffset) * 2;
        
        ctx.translate(this.x + this.size / 2, bobY + this.size / 2);
        ctx.rotate(this.rotation);
        
        const assets = window.gameAssets || {};
        const img = assets.enemy;
        
        if (img) {
            ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
        } else {
            // Fallback spiky ball
            ctx.fillStyle = '#ff4444';
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

export class Particle {
    constructor(x, y, size, speedX, speedY, color, life) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.life = life;
        this.maxLife = life;
    }

    update(currentPlatformSpeed) {
        this.x += this.speedX;
        this.y += this.speedY + currentPlatformSpeed / 2;
        this.life--;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
        
        // Pixelated square particles for retro feel
        const pixelSize = Math.max(2, Math.floor(this.size));
        ctx.fillRect(
            Math.floor(this.x / 2) * 2, 
            Math.floor(this.y / 2) * 2, 
            pixelSize, 
            pixelSize
        );
        
        ctx.restore();
    }
}
