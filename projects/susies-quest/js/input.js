export class InputHandler {
    constructor() {
        this.left = false;
        this.right = false;

        this.initKeyboard();
        this.initTouch();
    }

    initKeyboard() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a') this.left = true;
            if (e.key === 'ArrowRight' || e.key === 'd') this.right = true;
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a') this.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd') this.right = false;
        });
    }

    initTouch() {
        const leftBtn = document.getElementById("left-btn");
        const rightBtn = document.getElementById("right-btn");

        if (leftBtn && rightBtn) {
            leftBtn.addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.left = true;
            });
            leftBtn.addEventListener("touchend", (e) => {
                e.preventDefault();
                this.left = false;
            });
            rightBtn.addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.right = true;
            });
            rightBtn.addEventListener("touchend", (e) => {
                e.preventDefault();
                this.right = false;
            });
        }
    }
}
