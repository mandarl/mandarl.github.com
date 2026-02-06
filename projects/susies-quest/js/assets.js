// Asset loader for PNG images
const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

// Asset paths
const ASSET_PATHS = {
    susie: 'susie.png',
    platform: 'platform.png',
    yarn: 'yarn.png',
    candy: 'candy.png',
    // Power-up icons (will be generated as canvas)
    powerup_shield: null,
    powerup_magnet: null,
    powerup_double: null,
    // Enemy (will be generated as canvas)
    enemy: null
};

// Generate retro-style power-up icons
const generatePowerUpIcon = (type) => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Pixelated rendering
    ctx.imageSmoothingEnabled = false;
    
    if (type === 'shield') {
        // Blue shield icon
        ctx.fillStyle = '#4488ff';
        ctx.beginPath();
        ctx.moveTo(16, 2);
        ctx.lineTo(28, 8);
        ctx.lineTo(28, 18);
        ctx.lineTo(16, 30);
        ctx.lineTo(4, 18);
        ctx.lineTo(4, 8);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#2266cc';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Inner highlight
        ctx.fillStyle = '#66aaff';
        ctx.beginPath();
        ctx.moveTo(16, 6);
        ctx.lineTo(24, 10);
        ctx.lineTo(24, 16);
        ctx.lineTo(16, 24);
        ctx.lineTo(8, 16);
        ctx.lineTo(8, 10);
        ctx.closePath();
        ctx.fill();
    } else if (type === 'magnet') {
        // Red magnet icon
        ctx.fillStyle = '#ff4444';
        ctx.fillRect(4, 4, 8, 20);
        ctx.fillRect(20, 4, 8, 20);
        ctx.fillRect(4, 4, 24, 8);
        ctx.fillStyle = '#cc2222';
        ctx.fillRect(4, 20, 8, 8);
        ctx.fillRect(20, 20, 8, 8);
        // Poles
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(6, 22, 4, 4);
        ctx.fillStyle = '#888888';
        ctx.fillRect(22, 22, 4, 4);
    } else if (type === 'double') {
        // Gold 2x icon
        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#cc9900';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#884400';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('2X', 16, 16);
    }
    
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
};

// Generate retro-style enemy sprite
const generateEnemySprite = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = false;
    
    // Spiky enemy ball (retro style)
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.arc(16, 16, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Spikes
    ctx.fillStyle = '#ff4444';
    const spikes = 8;
    for (let i = 0; i < spikes; i++) {
        const angle = (i / spikes) * Math.PI * 2;
        const x1 = 16 + Math.cos(angle) * 8;
        const y1 = 16 + Math.sin(angle) * 8;
        const x2 = 16 + Math.cos(angle) * 15;
        const y2 = 16 + Math.sin(angle) * 15;
        ctx.beginPath();
        ctx.moveTo(x1 - 3, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x1 + 3, y1);
        ctx.closePath();
        ctx.fill();
    }
    
    // Evil eyes
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(11, 13, 4, 4);
    ctx.fillRect(17, 13, 4, 4);
    ctx.fillStyle = '#000000';
    ctx.fillRect(13, 14, 2, 2);
    ctx.fillRect(19, 14, 2, 2);
    
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
};

// Generate heart icon for lives
const generateHeartIcon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 24;
    canvas.height = 24;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = false;
    
    ctx.fillStyle = '#ff4466';
    ctx.beginPath();
    ctx.moveTo(12, 20);
    ctx.bezierCurveTo(4, 14, 2, 8, 6, 4);
    ctx.bezierCurveTo(10, 2, 12, 6, 12, 6);
    ctx.bezierCurveTo(12, 6, 14, 2, 18, 4);
    ctx.bezierCurveTo(22, 8, 20, 14, 12, 20);
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = '#ff8899';
    ctx.beginPath();
    ctx.arc(8, 7, 2, 0, Math.PI * 2);
    ctx.fill();
    
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
};

// Generate empty heart icon
const generateEmptyHeartIcon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 24;
    canvas.height = 24;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = false;
    
    ctx.strokeStyle = '#ff4466';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(12, 20);
    ctx.bezierCurveTo(4, 14, 2, 8, 6, 4);
    ctx.bezierCurveTo(10, 2, 12, 6, 12, 6);
    ctx.bezierCurveTo(12, 6, 14, 2, 18, 4);
    ctx.bezierCurveTo(22, 8, 20, 14, 12, 20);
    ctx.stroke();
    
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
};

// Main assets object
export const ASSETS = {
    susie: null,
    platform: null,
    yarn: null,
    candy: null,
    candy_lollipop: null,
    candy_hard: null,
    candy_choc: null,
    powerup_shield: null,
    powerup_magnet: null,
    powerup_double: null,
    enemy: null,
    heart: null,
    heart_empty: null,
    loaded: false
};

// Load all assets
export const loadAssets = async () => {
    try {
        // Load PNG images
        const [susie, platform, yarn, candy] = await Promise.all([
            loadImage(ASSET_PATHS.susie),
            loadImage(ASSET_PATHS.platform),
            loadImage(ASSET_PATHS.yarn),
            loadImage(ASSET_PATHS.candy)
        ]);
        
        ASSETS.susie = susie;
        ASSETS.platform = platform;
        ASSETS.yarn = yarn;
        ASSETS.candy = candy;
        // Use candy for all candy types (they all look like lollipops now)
        ASSETS.candy_lollipop = candy;
        ASSETS.candy_hard = candy;
        ASSETS.candy_choc = candy;
        
        // Generate power-up icons
        ASSETS.powerup_shield = generatePowerUpIcon('shield');
        ASSETS.powerup_magnet = generatePowerUpIcon('magnet');
        ASSETS.powerup_double = generatePowerUpIcon('double');
        
        // Generate enemy sprite
        ASSETS.enemy = generateEnemySprite();
        
        // Generate heart icons
        ASSETS.heart = generateHeartIcon();
        ASSETS.heart_empty = generateEmptyHeartIcon();
        
        ASSETS.loaded = true;
        console.log('All assets loaded successfully!');
        return true;
    } catch (error) {
        console.error('Failed to load assets:', error);
        return false;
    }
};
