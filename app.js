class App {
    constructor() {
        // Slides
        this.slides = [];
        this.slideNo = 0;

        // Bind methods
        this.selectSlide = this.selectSlide.bind(this);

        // Create screens
        const startElement = document.querySelector('#start');
        this.start = new StartScreen(startElement, this);

        const menuElement = document.querySelector('#menu');
        this.menu = new MenuScreen(menuElement, this);

        const mainElement = document.querySelector('#main');
        this.reel = new SlideScreen(mainElement, this);
    }

    // Update the screen views
    notifyScreens(notification) {
        this.start.update(notification);
        this.menu.update(notification);
        this.reel.update(notification);
    }

    // Start the slideshow
    startShow() {
        this.notifyScreens('slideshow started');
    }

    // End the slideshow
    endShow() {
        this.notifyScreens('slideshow ended');
    }

    // Update the reel bar
    /* updateReel(slide_no) {
        this.slide_no = slide_no;
        this.notifyScreens('update reel');
    } */

    // Set the app's slide to the slide passed by parameter
    selectSlide(i) {
        this.slideNo = i;
        this.notifyScreens('slide selected');
        this.createSlides();
    }

    // TODO figure out constants relationship
    // Creates the slides for the slideshow
    createSlides() {
        const slideContainer = document.querySelector('#slide-container');
        const reelContainer = document.querySelector('#reel');
        for (let i=0; i < SLIDE_REEL.length; i++) {
            // Add slide
            const slideImage = SLIDE_REEL[i];
            const s = new Slide(slideContainer, slideImage, i, this);
            this.slides.push(s);

            // Add reel dot
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === this.slideNo) {
                dot.classList.add('current');
            }
            dot.addEventListener('click', this.reel.jump);
            reelContainer.appendChild(dot);
        }
    }

    jumpSlide(i, tag) {
        const jumpNo = i;

        // Update slide
        if (tag === 'prev') {
            this.slides[jumpNo].slideElement.classList.remove('inactive');
            this.slides[jumpNo].slideElement.classList.add('fwd_in');
            this.slides[this.slideNo].slideElement.classList.add('fwd_out');
        } else if (tag === 'next') {
            this.slides[jumpNo].slideElement.classList.remove('inactive');
            this.slides[jumpNo].slideElement.classList.add('rev_in');
            this.slides[this.slideNo].slideElement.classList.add('rev_out');
        } else if (tag === 'jump') {
            this.slides[this.slideNo].slideElement.classList.add('inactive');
            this.slides[jumpNo].slideElement.classList.remove('inactive');
            this.slides[jumpNo].slideElement.classList.add('animation');
        }

        // Update reel
        const dots = this.reel.reelContainer.querySelectorAll('.dot');
        dots[jumpNo].classList.add('current');
        dots[this.slideNo].classList.remove('current');

        this.slideNo = jumpNo;
    }

    nextSlide() {
        let nextNo = this.slideNo;
        if (nextNo === SLIDE_REEL.length - 1) {
            nextNo = 0;
        } else {
            nextNo++;
        }
        this.jumpSlide(nextNo, 'next');
    }

    prevSlide() {
        let prevNo = this.slideNo;
        if (prevNo === 0) {
            prevNo = SLIDE_REEL.length - 1;
        } else {
            prevNo--;
        }
        this.jumpSlide(prevNo, 'prev');
    }

    exitSlide() {
        this.notifyScreens('slide exited');
    }
}