# Susie's Quest

Susie's Quest is a vibrant, retro-style platform jumping game built with HTML5 Canvas and Vanilla JavaScript. Players guide Susie through a colorful world, jumping on platforms, collecting items, avoiding enemies, and using power-ups to achieve the highest score possible.

## Play Now

**[Play Susie's Quest](https://mandar.dev/projects/susies-quest/)**

The game is optimized for mobile devices but also works great on desktop with keyboard controls.

## How to Play

### Objective

Keep jumping on platforms and avoid falling off the bottom of the screen. Collect yarn and candy for points while avoiding spiky enemies. The game gets faster and more challenging as your score increases!

### Controls

**Mobile:**
- Tap the **◀** button to move left
- Tap the **▶** button to move right
- Susie jumps automatically when landing on a platform

**Desktop:**
- **Arrow Keys** or **WASD** to move left/right
- **P** or **Escape** to pause

### Scoring

| Item | Points |
|------|--------|
| Yarn Ball | +100 |
| Candy | +150 |
| Platform Cleared | +10 |
| Enemy Avoided | +25 |

*Double Points power-up multiplies all scores by 2x!*

## Features

### Lives System
Start with 3 lives (up to 5 maximum). Hitting an enemy costs one life. When all lives are lost, the game ends.

### Power-Ups

| Power-Up | Effect | Duration |
|----------|--------|----------|
| 🛡️ Shield | Absorbs one enemy hit | 8 seconds |
| 🧲 Magnet | Attracts nearby collectibles | 8 seconds |
| 2️⃣ Double Points | 2x score multiplier | 8 seconds |

### Platform Types

| Platform | Behavior |
|----------|----------|
| Normal | Standard platform |
| Moving | Slides horizontally |
| Cloud | Disappears after one jump |
| Bouncy | Extra high jump (1.5x) |
| Breakable | Crumbles after landing |

### Enemies
Spiky ball enemies patrol the screen. Avoid them or use a shield to survive contact!

### Retro Aesthetics
- 8-bit style sound effects and music
- Scanline overlay effect
- CRT vignette effect
- Pixelated particle effects
- Retro "Press Start 2P" font

### Additional Features
- **Tutorial Screen** - Learn the controls and mechanics
- **Pause Functionality** - Take a break anytime
- **Local Leaderboard** - Compete for top scores
- **Game Statistics** - Track platforms cleared, collectibles gathered, and more
- **Progressive Difficulty** - Speed increases as you score higher

## Technical Details

### Built With
- **HTML5 Canvas** - High-performance game rendering
- **Vanilla JavaScript (ES6 Modules)** - All game logic, physics, and state management
- **Web Audio API** - Procedural 8-bit sound effects and music
- **CSS3** - Retro-styled UI with animations

### File Structure

```
susies-quest/
├── index.html          # Main game page
├── css/
│   └── style.css       # Retro-styled CSS
├── js/
│   ├── game.js         # Main game loop and logic
│   ├── entities.js     # Game entities (Susie, platforms, enemies, etc.)
│   ├── state.js        # Game state management
│   ├── input.js        # Input handling (touch + keyboard)
│   ├── assets.js       # Asset loading
│   ├── config.js       # Game configuration
│   └── sound.js        # 8-bit sound system
├── susie.png           # Character sprite
├── platform.png        # Platform sprite
├── yarn.png            # Yarn collectible
├── candy.png           # Candy collectible
└── README.md           # This file
```

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome for Android)

## Credits

Created by Mandar Limaye

---

*Enjoy playing Susie's Quest! 🎮*
