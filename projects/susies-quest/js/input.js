export class InputHandler {
    constructor() {
        this.left = false;
        this.right = false;

        this.initKeyboard();
        this.initTouch();
    }

    initKeyboard() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.left = true;
                e.preventDefault();
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.right = true;
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.left = false;
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.right = false;
            }
        });
        
        // Pause with Escape or P
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
                const pauseBtn = document.getElementById('pause-btn');
                const pauseScreen = document.getElementById('pause-screen');
                
                if (pauseBtn && pauseBtn.style.display !== 'none') {
                    if (pauseScreen && pauseScreen.style.display === 'flex') {
                        document.getElementById('resume-btn').click();
                    } else {
                        pauseBtn.click();
                    }
                }
            }
        });
    }

    initTouch() {
        const leftBtn = document.getElementById("left-btn");
        const rightBtn = document.getElementById("right-btn");

        if (leftBtn && rightBtn) {
            // Prevent default to avoid scrolling and zooming
            const preventDefaults = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };

            // Left button
            leftBtn.addEventListener("touchstart", (e) => {
                preventDefaults(e);
                this.left = true;
                leftBtn.classList.add('active');
            }, { passive: false });
            
            leftBtn.addEventListener("touchend", (e) => {
                preventDefaults(e);
                this.left = false;
                leftBtn.classList.remove('active');
            }, { passive: false });
            
            leftBtn.addEventListener("touchcancel", (e) => {
                this.left = false;
                leftBtn.classList.remove('active');
            });

            // Right button
            rightBtn.addEventListener("touchstart", (e) => {
                preventDefaults(e);
                this.right = true;
                rightBtn.classList.add('active');
            }, { passive: false });
            
            rightBtn.addEventListener("touchend", (e) => {
                preventDefaults(e);
                this.right = false;
                rightBtn.classList.remove('active');
            }, { passive: false });
            
            rightBtn.addEventListener("touchcancel", (e) => {
                this.right = false;
                rightBtn.classList.remove('active');
            });

            // Mouse support for desktop testing
            leftBtn.addEventListener("mousedown", () => {
                this.left = true;
                leftBtn.classList.add('active');
            });
            leftBtn.addEventListener("mouseup", () => {
                this.left = false;
                leftBtn.classList.remove('active');
            });
            leftBtn.addEventListener("mouseleave", () => {
                this.left = false;
                leftBtn.classList.remove('active');
            });

            rightBtn.addEventListener("mousedown", () => {
                this.right = true;
                rightBtn.classList.add('active');
            });
            rightBtn.addEventListener("mouseup", () => {
                this.right = false;
                rightBtn.classList.remove('active');
            });
            rightBtn.addEventListener("mouseleave", () => {
                this.right = false;
                rightBtn.classList.remove('active');
            });
        }
    }

    reset() {
        this.left = false;
        this.right = false;
    }
}
