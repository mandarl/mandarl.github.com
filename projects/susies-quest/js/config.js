export const CONFIG = {
    // Physics
    PLATFORM_SPEED: 2,
    GRAVITY: 0.5,
    JUMP_FORCE: 15,
    ACCELERATION: 0.8,
    FRICTION: 0.9,
    MAX_SPEED: 8,
    SQUISH_SPEED: 0.05,
    SQUISH_RECOVERY: 0.1,
    
    // Lives system
    STARTING_LIVES: 3,
    MAX_LIVES: 5,
    
    // Power-ups
    POWERUP_DURATION: 8000, // 8 seconds
    POWERUP_SPAWN_CHANCE: 0.08, // 8% chance per platform
    MAGNET_RANGE: 150, // pixels
    
    // Enemies
    ENEMY_SPAWN_CHANCE: 0.15, // 15% chance per platform (increases with difficulty)
    ENEMY_SPEED: 1.5,
    
    // Platform types
    PLATFORM_TYPES: {
        NORMAL: { weight: 0.5 },
        MOVING: { weight: 0.2 },
        CLOUD: { weight: 0.15 },
        BOUNCY: { weight: 0.1 },
        BREAKABLE: { weight: 0.05 }
    },
    
    // Bouncy platform
    BOUNCY_JUMP_MULTIPLIER: 1.5,
    
    // Scoring
    SCORE_YARN: 100,
    SCORE_CANDY: 150,
    SCORE_PLATFORM_PASS: 10,
    SCORE_ENEMY_AVOID: 25,
    
    // Difficulty scaling
    DIFFICULTY_SCORE_DIVISOR: 5000,
    MAX_DIFFICULTY_MULTIPLIER: 2.5,
    
    // Retro effects
    SCANLINE_OPACITY: 0.03,
    CRT_VIGNETTE: true
};
