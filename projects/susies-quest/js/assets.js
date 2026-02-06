// Asset loader for PNG images
const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

// Asset paths - all PNG images with transparent backgrounds
const ASSET_PATHS = {
    susie: 'susie.png',
    susie_jump: 'susie_jump.png',
    susie_fall: 'susie_fall.png',
    platform: 'platform.png',
    yarn: 'yarn.png',
    candy: 'candy.png',
    enemy: 'enemy.png'
};

// Generate retro-style power-up icons
const generatePowerUpIcon = (type) => {
    const canvas = document.createElement('canvas');
    canvas.width = 36;
    canvas.height = 36;
    const ctx = canvas.getContext('2d');
    
    // Pixelated rendering
    ctx.imageSmoothingEnabled = false;
    
    if (type === 'shield') {
        // Blue shield icon with pixel art style
        ctx.fillStyle = '#4488ff';
        ctx.beginPath();
        ctx.moveTo(18, 2);
        ctx.lineTo(32, 10);
        ctx.lineTo(32, 22);
        ctx.lineTo(18, 34);
        ctx.lineTo(4, 22);
        ctx.lineTo(4, 10);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#2266cc';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Inner highlight
        ctx.fillStyle = '#66aaff';
        ctx.beginPath();
        ctx.moveTo(18, 8);
        ctx.lineTo(26, 12);
        ctx.lineTo(26, 20);
        ctx.lineTo(18, 28);
        ctx.lineTo(10, 20);
        ctx.lineTo(10, 12);
        ctx.closePath();
        ctx.fill();
        // Star sparkle
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(16, 14, 4, 4);
    } else if (type === 'magnet') {
        // Red horseshoe magnet icon
        ctx.fillStyle = '#ff4444';
        ctx.fillRect(4, 6, 10, 24);
        ctx.fillRect(22, 6, 10, 24);
        ctx.fillRect(4, 6, 28, 10);
        ctx.fillStyle = '#cc2222';
        ctx.fillRect(4, 24, 10, 8);
        ctx.fillRect(22, 24, 10, 8);
        // Poles
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(6, 26, 6, 4);
        ctx.fillStyle = '#888888';
        ctx.fillRect(24, 26, 6, 4);
    } else if (type === 'double') {
        // Gold 2x coin icon
        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.arc(18, 18, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#cc9900';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = '#884400';
        ctx.font = 'bold 18px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('2X', 18, 18);
    }
    
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
};

// Generate heart icon for lives
const generateHeartIcon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = false;
    
    ctx.fillStyle = '#ff4466';
    ctx.beginPath();
    ctx.moveTo(14, 24);
    ctx.bezierCurveTo(4, 16, 2, 10, 7, 5);
    ctx.bezierCurveTo(11, 2, 14, 7, 14, 7);
    ctx.bezierCurveTo(14, 7, 17, 2, 21, 5);
    ctx.bezierCurveTo(26, 10, 24, 16, 14, 24);
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = '#ff8899';
    ctx.beginPath();
    ctx.arc(9, 9, 3, 0, Math.PI * 2);
    ctx.fill();
    
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
};

// Generate empty heart icon
const generateEmptyHeartIcon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = false;
    
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.moveTo(14, 24);
    ctx.bezierCurveTo(4, 16, 2, 10, 7, 5);
    ctx.bezierCurveTo(11, 2, 14, 7, 14, 7);
    ctx.bezierCurveTo(14, 7, 17, 2, 21, 5);
    ctx.bezierCurveTo(26, 10, 24, 16, 14, 24);
    ctx.fill();
    
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
};

// Main assets object
export const ASSETS = {
    susie: null,
    susie_jump: null,
    susie_fall: null,
    platform: null,
    yarn: null,
    candy: null,
    enemy: null,
    powerup_shield: null,
    powerup_magnet: null,
    powerup_double: null,
    heart: null,
    heart_empty: null,
    loaded: false
};

// Load all assets
export const loadAssets = async () => {
    try {
        // Load all PNG images with transparent backgrounds
        const [susie, susie_jump, susie_fall, platform, yarn, candy, enemy] = await Promise.all([
            loadImage(ASSET_PATHS.susie),
            loadImage(ASSET_PATHS.susie_jump),
            loadImage(ASSET_PATHS.susie_fall),
            loadImage(ASSET_PATHS.platform),
            loadImage(ASSET_PATHS.yarn),
            loadImage(ASSET_PATHS.candy),
            loadImage(ASSET_PATHS.enemy)
        ]);
        
        ASSETS.susie = susie;
        ASSETS.susie_jump = susie_jump;
        ASSETS.susie_fall = susie_fall;
        ASSETS.platform = platform;
        ASSETS.yarn = yarn;
        ASSETS.candy = candy;
        ASSETS.enemy = enemy;
        
        // Generate power-up icons
        ASSETS.powerup_shield = generatePowerUpIcon('shield');
        ASSETS.powerup_magnet = generatePowerUpIcon('magnet');
        ASSETS.powerup_double = generatePowerUpIcon('double');
        
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
