class Slide {
    constructor(containerElement, slideImage, i, app) {
        this.containerElement = containerElement;
        this.slideImage = slideImage;
        this.i = i;
        this.app = app;

        // State variables
        this.originX = null;
        this.currentX = null;
        this.dragStarted = false;

        // Bind methods
        this.dragStart = this.dragStart.bind(this);
        this.dragMove = this.dragMove.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.onAnimationEnd = this.onAnimationEnd.bind(this);

        // Configure slide
        this.slideElement = this.createSlideElement(slideImage);
        this.nextElement = this.slideElement.querySelector('#next');
        this.prevElement = this.slideElement.querySelector('#prev');

        // Add event listeners
        this.slideElement.addEventListener('pointerdown', this.dragStart);
        this.slideElement.addEventListener('pointermove', this.dragMove);
        this.slideElement.addEventListener('pointerup', this.dragEnd);
        this.slideElement.addEventListener('animationend', this.onAnimationEnd);
    }

    createSlideElement(slideImage) {
        const slideContainer = this.containerElement;

        const slide = document.createElement('div');
        slide.classList.add('slide');
        if (this.i !== this.app.slideNo) {
            slide.classList.add('inactive');
        }
        slide.style.backgroundColor = slideImage.backgroundColor;

        slideContainer.appendChild(slide);

        return slide;
    }

    dragStart(event) {
        this.originX = event.clientX;
        event.currentTarget.setPointerCapture(event.pointerId);
        this.dragStarted = true;
    }

    dragMove(event) {
        if (!this.dragStarted) {
            return;
        }
        event.preventDefault();

        this.currentX = event.clientX - this.originX;
    }

    dragEnd(event) {
        this.dragStarted = false;
        if (this.currentX < -150) {
            this.app.nextSlide();
        } else if (this.currentX > 150) {
            this.app.prevSlide();
        }
    }

    onAnimationEnd() {
        if (this.slideElement.classList.contains('fwd_in')) {
            this.slideElement.classList.remove('fwd_in');
        } else if (this.slideElement.classList.contains('fwd_out')) {
            this.slideElement.classList.remove('fwd_out');
            this.slideElement.classList.add('inactive');
        } else if (this.slideElement.classList.contains('rev_in')) {
            this.slideElement.classList.remove('rev_in');
        } else if (this.slideElement.classList.contains('rev_out')) {
            this.slideElement.classList.remove('rev_out');
            this.slideElement.classList.add('inactive');
        } else if (this.slideElement.classList.contains('animation')) {
            this.slideElement.classList.remove('animation');
        }
    }

    show() {
        this.containerElement.classList.remove('inactive');
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}