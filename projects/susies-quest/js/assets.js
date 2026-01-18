const createSVGImage = (svgString) => {
    const img = new Image();
    const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svg);
    img.src = url;
    return img;
};

// --- SUSIE (High-Fidelity 2D) ---
const susieSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 40 60">
    <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#ffdbac;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#f1c27d;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e0ac69;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#333;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#1a1a1a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="eyeShine" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#fff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#fff;stop-opacity:0" />
        </radialGradient>
    </defs>
    <!-- Hair (Back) -->
    <path d="M4,15 Q20,2 36,15 L39,35 Q42,50 32,45 Q20,48 8,45 Q-2,50 1,35 Z" fill="url(#hairGrad)"/>
    <!-- Face Shape -->
    <path d="M10,15 Q20,10 30,15 L32,28 Q32,42 20,44 Q8,42 8,28 Z" fill="url(#skinGrad)"/>
    <!-- Realistic Almond Eyes -->
    <g transform="translate(13,24)">
        <path d="M0,0 Q3,-4 7,0 Q3,2 0,0 Z" fill="white"/> <!-- Sclera -->
        <circle cx="3.5" cy="-0.5" r="2" fill="#222"/> <!-- Iris -->
        <circle cx="2.5" cy="-1.5" r="0.8" fill="white"/> <!-- Shine -->
    </g>
    <g transform="translate(20,24)">
        <path d="M0,0 Q3,-4 7,0 Q3,2 0,0 Z" fill="white"/>
        <circle cx="3.5" cy="-0.5" r="2" fill="#222"/>
        <circle cx="2.5" cy="-1.5" r="0.8" fill="white"/>
    </g>
    <!-- Lips -->
    <path d="M18,36 Q20,38 22,36" fill="none" stroke="#b27f55" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Detailed Hair Flips -->
    <path d="M5,28 Q-3,50 10,48 Q15,46 12,35" fill="url(#hairGrad)"/>
    <path d="M35,28 Q43,50 30,48 Q25,46 28,35" fill="url(#hairGrad)"/>
    <path d="M12,12 Q20,5 28,12" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/> <!-- Hair highlight -->
    <!-- White T-Shirt with Folds -->
    <path d="M9,41 L31,41 L33,54 L7,54 Z" fill="#ffffff"/>
    <path d="M10,41 Q20,44 30,41 L30,44 Q20,47 10,44 Z" fill="#e0e0e0"/> <!-- Shadow fold -->
    <path d="M7,41 L3,48 L7,52 L11,46 Z" fill="#ffffff"/> <!-- L Sleeve -->
    <path d="M33,41 L37,48 L33,52 L29,46 Z" fill="#ffffff"/> <!-- R Sleeve -->
    <!-- Denim Skirt Textured -->
    <path d="M7,54 L33,54 L35,60 L5,60 Z" fill="#3b5998"/>
    <path d="M7,54 H33" stroke="#253a6b" stroke-width="2"/> <!-- Seam -->
    <rect x="15" y="55" width="10" height="2" fill="#253a6b" opacity="0.3"/> <!-- Pocket detail -->
</svg>`;

// --- YARN (Fuzzy with Needles) ---
const yarnSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
    <defs>
        <radialGradient id="yarnRad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#ff80ab;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#880e4f;stop-opacity:1" />
        </radialGradient>
        <filter id="fuzz">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
    </defs>
    <!-- Knitting Needles (Background) -->
    <g stroke="#b0bec5" stroke-width="1.5" stroke-linecap="round">
        <line x1="2" y1="2" x2="28" y2="28" />
        <line x1="28" y1="2" x2="2" y2="28" />
    </g>
    <!-- Needle Tips/Knobs -->
    <circle cx="2" cy="2" r="2" fill="#78909c" />
    <circle cx="28" cy="2" r="2" fill="#78909c" />
    
    <!-- Fuzzy Yarn Ball -->
    <circle cx="15" cy="15" r="12" fill="url(#yarnRad)" filter="url(#fuzz)" />
    
    <!-- Thread Pattern -->
    <g fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="1" opacity="0.6">
        <path d="M7,15 Q15,7 23,15"/>
        <path d="M7,11 Q15,3 23,11"/>
        <path d="M7,19 Q15,11 23,19"/>
        <path d="M12,7 Q20,15 12,23"/>
    </g>
    <!-- Loose Thread -->
    <path d="M15,27 Q20,30 25,25" fill="none" stroke="#ff80ab" stroke-width="1.5" stroke-linecap="round" />
</svg>`;

// --- PREMIUM CANDY ---
const lollipopSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
    <rect x="14" y="15" width="2" height="13" fill="#eee"/>
    <circle cx="15" cy="12" r="10" fill="#f44336"/>
    <path d="M15,12 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-dasharray="2,6"/>
    <ellipse cx="11" cy="8" rx="4" ry="2" fill="white" fill-opacity="0.3" transform="rotate(-30, 11, 8)"/>
</svg>`;

const hardCandySVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
    <path d="M2,15 L9,10 L9,20 Z M28,15 L21,10 L21,20 Z" fill="#ffd54f"/>
    <rect x="8" y="9" width="14" height="12" rx="4" fill="#f57f17"/>
    <path d="M10,12 L20,12" stroke="white" stroke-opacity="0.4" stroke-width="4" stroke-linecap="round"/>
    <rect x="12" y="10" width="1" height="10" fill="white" opacity="0.2"/>
</svg>`;

const chocolateSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
    <rect x="4" y="6" width="22" height="18" rx="1" fill="#2d1a15"/>
    <g fill="#4e342e">
        <rect x="6" y="8" width="8" height="6"/>
        <rect x="16" y="8" width="8" height="6"/>
        <rect x="6" y="16" width="8" height="6"/>
        <rect x="16" y="16" width="8" height="6"/>
    </g>
    <path d="M4,12 H26 M15,6 V24" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
    <path d="M6,8 L9,11" stroke="white" stroke-opacity="0.1" stroke-width="1"/>
</svg>`;

// --- PREMIUM PLATFORM ---
const platformSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20" viewBox="0 0 100 20">
    <defs>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#8d6e63;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3e2723;stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="100" height="20" rx="4" fill="url(#woodGrad)"/>
    <path d="M5,4 H95 M5,16 H95 M20,4 V16 M50,4 V16 M80,4 V16" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
    <rect width="100" height="2" fill="rgba(255,255,255,0.1)"/>
</svg>`;

export const ASSETS = {
    susie: createSVGImage(susieSVG),
    yarn: createSVGImage(yarnSVG),
    candy_lollipop: createSVGImage(lollipopSVG),
    candy_hard: createSVGImage(hardCandySVG),
    candy_choc: createSVGImage(chocolateSVG),
    platform: createSVGImage(platformSVG)
};
