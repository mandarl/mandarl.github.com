// Retro 8-bit Sound System using Web Audio API
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.enabled = true;
        this.musicEnabled = true;
        this.musicPlaying = false;
        this.musicInterval = null;
    }
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Master gain
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 0.3;
            this.masterGain.connect(this.audioContext.destination);
            
            // Music gain
            this.musicGain = this.audioContext.createGain();
            this.musicGain.gain.value = 0.15;
            this.musicGain.connect(this.masterGain);
            
            // SFX gain
            this.sfxGain = this.audioContext.createGain();
            this.sfxGain.gain.value = 0.4;
            this.sfxGain.connect(this.masterGain);
            
            console.log('Sound system initialized');
            return true;
        } catch (e) {
            console.warn('Web Audio API not supported:', e);
            this.enabled = false;
            return false;
        }
    }
    
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
    
    // Create an 8-bit style oscillator sound
    playTone(frequency, duration, type = 'square', gainValue = 0.3) {
        if (!this.enabled || !this.audioContext) return;
        
        this.resume();
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(gainValue, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.sfxGain);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    // Jump sound - ascending arpeggio
    playJump() {
        if (!this.enabled) return;
        const baseFreq = 300;
        this.playTone(baseFreq, 0.08, 'square', 0.2);
        setTimeout(() => this.playTone(baseFreq * 1.25, 0.08, 'square', 0.2), 40);
        setTimeout(() => this.playTone(baseFreq * 1.5, 0.1, 'square', 0.15), 80);
    }
    
    // Collect yarn - happy chime
    playCollectYarn() {
        if (!this.enabled) return;
        this.playTone(523, 0.1, 'square', 0.25);
        setTimeout(() => this.playTone(659, 0.1, 'square', 0.25), 60);
        setTimeout(() => this.playTone(784, 0.15, 'square', 0.2), 120);
    }
    
    // Collect candy - sparkle sound
    playCollectCandy() {
        if (!this.enabled) return;
        this.playTone(880, 0.08, 'square', 0.2);
        setTimeout(() => this.playTone(1047, 0.08, 'square', 0.2), 50);
        setTimeout(() => this.playTone(1319, 0.08, 'square', 0.2), 100);
        setTimeout(() => this.playTone(1568, 0.12, 'square', 0.15), 150);
    }
    
    // Power-up collect - triumphant fanfare
    playPowerUp() {
        if (!this.enabled) return;
        const notes = [392, 523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.15, 'square', 0.25), i * 80);
        });
    }
    
    // Hit enemy - descending sad sound
    playHit() {
        if (!this.enabled) return;
        this.playTone(400, 0.1, 'sawtooth', 0.3);
        setTimeout(() => this.playTone(300, 0.1, 'sawtooth', 0.25), 80);
        setTimeout(() => this.playTone(200, 0.15, 'sawtooth', 0.2), 160);
        setTimeout(() => this.playTone(100, 0.2, 'sawtooth', 0.15), 240);
    }
    
    // Game over - dramatic descending
    playGameOver() {
        if (!this.enabled) return;
        const notes = [523, 466, 392, 349, 294, 262, 196, 131];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.25, 'sawtooth', 0.3 - i * 0.03), i * 150);
        });
    }
    
    // Bouncy platform - boing sound
    playBounce() {
        if (!this.enabled) return;
        this.playTone(200, 0.05, 'sine', 0.3);
        setTimeout(() => this.playTone(400, 0.08, 'sine', 0.25), 30);
        setTimeout(() => this.playTone(600, 0.1, 'sine', 0.2), 60);
    }
    
    // Platform break - crumble sound
    playBreak() {
        if (!this.enabled) return;
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.playTone(100 + Math.random() * 100, 0.05, 'sawtooth', 0.2);
            }, i * 30);
        }
    }
    
    // Shield activate
    playShield() {
        if (!this.enabled) return;
        this.playTone(440, 0.1, 'triangle', 0.3);
        setTimeout(() => this.playTone(554, 0.1, 'triangle', 0.25), 80);
        setTimeout(() => this.playTone(659, 0.15, 'triangle', 0.2), 160);
    }
    
    // Menu select
    playSelect() {
        if (!this.enabled) return;
        this.playTone(440, 0.08, 'square', 0.2);
        setTimeout(() => this.playTone(554, 0.1, 'square', 0.15), 60);
    }
    
    // Start game jingle
    playStart() {
        if (!this.enabled) return;
        const melody = [262, 330, 392, 523, 659, 784];
        melody.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.12, 'square', 0.2), i * 100);
        });
    }
    
    // Background music - simple 8-bit loop
    startMusic() {
        if (!this.enabled || !this.musicEnabled || this.musicPlaying) return;
        
        this.musicPlaying = true;
        
        // Simple bass line pattern
        const bassPattern = [131, 131, 165, 165, 175, 175, 165, 165];
        // Melody pattern
        const melodyPattern = [392, 440, 523, 440, 392, 349, 392, 440];
        
        let beatIndex = 0;
        const bpm = 120;
        const beatDuration = 60000 / bpm / 2;
        
        this.musicInterval = setInterval(() => {
            if (!this.musicPlaying || !this.musicEnabled) {
                this.stopMusic();
                return;
            }
            
            // Bass note
            this.playMusicNote(bassPattern[beatIndex % bassPattern.length], 0.2, 'triangle', 0.08);
            
            // Melody note (every other beat)
            if (beatIndex % 2 === 0) {
                this.playMusicNote(melodyPattern[(beatIndex / 2) % melodyPattern.length], 0.15, 'square', 0.05);
            }
            
            beatIndex++;
        }, beatDuration);
    }
    
    playMusicNote(frequency, duration, type, gainValue) {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(gainValue, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.musicGain);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    stopMusic() {
        this.musicPlaying = false;
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
        }
    }
    
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled) {
            this.stopMusic();
        }
        return this.musicEnabled;
    }
    
    toggleSound() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopMusic();
        }
        return this.enabled;
    }
    
    setMasterVolume(value) {
        if (this.masterGain) {
            this.masterGain.gain.value = Math.max(0, Math.min(1, value));
        }
    }
}

export const Sound = new SoundManager();
