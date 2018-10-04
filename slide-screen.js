class SlideScreen {
    constructor(containerElement, app) {
        this.containerElement = containerElement;
        this.app = app;

        // Bind methods
        this.exit = this.exit.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.jump = this.jump.bind(this);
        this.update = this.update.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        // Configure exit button
        this.exitButton = containerElement.querySelector('#exit-button');
        this.exitButton.addEventListener('click', this.exit);

        // Configure prev button
        this.prevButton = containerElement.querySelector('#prev-button');
        this.prevButton.addEventListener('click', this.prev);

        // Configure next button
        this.nextButton = containerElement.querySelector('#next-button');
        this.nextButton.addEventListener('click', this.next);

        // Configure reel
        this.reelContainer = containerElement.querySelector('#reel');
    }

    exit() {
        const slideContainer = this.containerElement.querySelector('#slide-container');
        const dotChildren = this.reelContainer.querySelectorAll('.dot');
        const slideChildren = slideContainer.querySelectorAll('.slide');

        // Reset DOM
        for (const dotChild of dotChildren) {
            this.reelContainer.removeChild(dotChild);
        }
        for (const slideChild of slideChildren) {
            slideContainer.removeChild(slideChild);
        }

        // Reset slides
        this.app.slides = [];

        // Call exitSlide()
        this.app.exitSlide();
    }

    prev() {
        this.app.prevSlide();
    }

    next() {
        this.app.nextSlide();
    }

    jump(event) {
        const dotChildren = this.reelContainer.querySelectorAll('.dot');

        // Cannot call indexOf on NodeList
        for (let i=0; i < dotChildren.length; i++) {
            if (event.target === dotChildren[i]) {
                this.app.jumpSlide(i, 'jump');
            }
        }
    }

    onKeyUp() {
        if (event.key === 'Escape') {
            this.exit();
        } else if (event.key === 'ArrowLeft' || event.key === 'a') {
            this.app.prevSlide();
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
            this.app.nextSlide();
        } else {
            return;
        }
    }

    // Interpret updates from the app
    update(notification) {
        if (notification === 'slide selected') {
            document.addEventListener('keyup', this.onKeyUp);
            this.show();
        } else if (notification === 'slide exited') {
            document.removeEventListener('keyup', this.onKeyUp);
            this.hide();
        } else if (notification === 'jump slide') {
            this.updateReel();
        }
    }

    show() {
        this.containerElement.classList.remove('inactive');
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}