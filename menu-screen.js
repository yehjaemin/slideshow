class MenuScreen {
    constructor(containerElement, app) {
        this.containerElement = containerElement;
        this.app = app;

        // Bind methods
        this.reset = this.reset.bind(this);
        this.update = this.update.bind(this);

        // Configure slides menu
        const slidesMenu = this.containerElement.querySelector('#slides');
        this.slideButtons = [];
        for (let i=0; i < SLIDE_REEL.length; i++) {
            let slideButton = SLIDE_REEL[i];
            this.slideButtons.push(new SlideButton(slidesMenu, slideButton, i, this.app.selectSlide));
        }

        // Configure reset button
        const reset = this.containerElement.querySelector('#reset-button');
        reset.addEventListener('click', this.reset);
    }

    reset() {
        this.app.endShow();
    }

    // Interpret updates from the app
    update(notification) {
        if (notification === 'slideshow started') {
            this.show();
        } else if (notification === 'slide selected') {
            this.hide();
        } else if (notification === 'slide exited') {
            this.show();
        } else if (notification === 'slideshow ended') {
            this.hide();
        }
    }

    show() {
        this.containerElement.classList.remove('inactive');
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}

class SlideButton {
    constructor(slidesMenu, slideButton, i, selectSlide) {
        this.slidesMenu = slidesMenu;
        this.slideButton = slideButton;
        this.backgroundColor = slideButton.backgroundColor;
        this.i = i;
        this.selectSlide = selectSlide;

        const button = document.createElement('div');
        button.style.backgroundColor = this.backgroundColor;
        slidesMenu.append(button);

        this.onClick = this.onClick.bind(this);
        button.addEventListener('click', this.onClick);
    }

    onClick() {
        this.selectSlide(this.i);
    }
}