import { CONFIG } from './config.js';

export class Susie {
    constructor(canvasWidth, canvasHeight) {
        this.width = 40;
        this.height = 60;
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
    }

    update(canvasWidth, canvasHeight, input) {
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

        if (this.x + this.width < 0) this.x = canvasWidth;
        else if (this.x > canvasWidth) this.x = -this.width;

        this.vy += CONFIG.GRAVITY;
        this.y += this.vy;

        this.scaleX += (this.targetScaleX - this.scaleX) * 0.2;
        this.scaleY += (this.targetScaleY - this.scaleY) * 0.2;

        this.targetScaleX = 1;
        this.targetScaleY = 1;

        if (this.vy < 0) {
            this.targetScaleX = 0.8;
            this.targetScaleY = 1.2;
        }
    }

    jump() {
        this.vy = -CONFIG.JUMP_FORCE;
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

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height);
        ctx.scale(this.scaleX, this.scaleY);

        const assets = (window.gameAssets || {});
        const img = assets.susie;
        if (img) {
            ctx.drawImage(img, -this.width / 2, -this.height, this.width, this.height);
        } else {
            ctx.fillStyle = "white";
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
    }

    onTouch() {
        if (this.type === 'CLOUD' && !this.touched) {
            this.touched = true;
            this.fading = true;
        }
    }

    draw(ctx) {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        const assets = (window.gameAssets || {});
        const img = assets.platform;
        if (img) {
            if (this.type === 'MOVING') ctx.filter = 'hue-rotate(90deg)';
            if (this.type === 'CLOUD') ctx.filter = 'opacity(0.6) brightness(1.2)';
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = "#8D6E63";
            ctx.fillRect(this.x, this.y, this.width, this.height);
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
        if (type === 'candy') {
            const types = ['candy_lollipop', 'candy_hard', 'candy_choc'];
            this.subtype = types[Math.floor(Math.random() * types.length)];
        } else {
            this.subtype = 'yarn';
        }
    }

    update(speed) {
        this.y += speed;
    }

    draw(ctx) {
        ctx.save();
        const assets = (window.gameAssets || {});
        const img = assets[this.subtype];
        if (img) {
            ctx.drawImage(img, this.x, this.y, this.size, this.size);
        } else {
            ctx.fillStyle = this.type === 'yarn' ? 'pink' : 'yellow';
            ctx.fillRect(this.x, this.y, this.size, this.size);
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
