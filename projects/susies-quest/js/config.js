export const CONFIG = {
    // Physics - tuned for smooth, responsive mobile gameplay
    PLATFORM_SPEED: 1.8,
    GRAVITY: 0.45,
    JUMP_FORCE: 14,
    ACCELERATION: 1.0,      // Faster response
    FRICTION: 0.88,         // Slightly more slide
    MAX_SPEED: 7,
    SQUISH_SPEED: 0.05,
    SQUISH_RECOVERY: 0.1,
    
    // Lives system
    STARTING_LIVES: 3,
    MAX_LIVES: 5,
    
    // Power-ups
    POWERUP_DURATION: 10000, // 10 seconds
    POWERUP_SPAWN_CHANCE: 0.10, // 10% chance per platform
    MAGNET_RANGE: 180, // pixels
    
    // Enemies
    ENEMY_SPAWN_CHANCE: 0.12, // 12% chance per platform (increases with difficulty)
    ENEMY_SPEED: 1.2,
    
    // Platform types
    PLATFORM_TYPES: {
        NORMAL: { weight: 0.55 },
        MOVING: { weight: 0.18 },
        CLOUD: { weight: 0.12 },
        BOUNCY: { weight: 0.10 },
        BREAKABLE: { weight: 0.05 }
    },
    
    // Bouncy platform
    BOUNCY_JUMP_MULTIPLIER: 1.6,
    
    // Scoring
    SCORE_YARN: 100,
    SCORE_CANDY: 150,
    SCORE_PLATFORM_PASS: 10,
    SCORE_ENEMY_AVOID: 25,
    
    // Difficulty scaling - more gradual
    DIFFICULTY_SCORE_DIVISOR: 6000,
    MAX_DIFFICULTY_MULTIPLIER: 2.2,
    
    // Retro effects
    SCANLINE_OPACITY: 0.02,
    CRT_VIGNETTE: true,
    
    // Visual polish
    SCREEN_SHAKE_INTENSITY: 5,
    SCREEN_SHAKE_DURATION: 10,
    PARTICLE_COUNT_JUMP: 8,
    PARTICLE_COUNT_COLLECT: 12,
    PARTICLE_COUNT_HIT: 15
};
