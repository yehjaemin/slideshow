class StartScreen {
    constructor(containerElement, app) {
        this.containerElement = containerElement;
        this.app = app;

        // Bind methods
        this.startNextAnimation = this.startNextAnimation.bind(this);
        this.start = this.start.bind(this);
        this.update = this.update.bind(this);

        // Configure letters from the title
        const title = this.containerElement.querySelector('#title');
        this.spans = title.querySelectorAll('span');
        this.letters = [];
        for (let i=0; i < this.spans.length; i++) {
            this.letters.push(new Letter(this.spans[i], i, this.startNextAnimation));
        }

        // Configure start button
        const button = containerElement.querySelector('#start-button');
        button.addEventListener('click', this.start);
    }

    startNextAnimation(i) {
        this.spans[i].removeEventListener('animationend', this.startNextAnimation);
        if (i < this.spans.length - 1)
            this.spans[i+1].classList.add('animation');
    }

    start() {
        this.app.startShow();
    }

    // Interpret updates from the app
    update(notification) {
        if (notification === 'slideshow started') {
            this.hide();
        } else if (notification === 'slideshow ended') {
            this.show();
        }
    }

    show() {
        this.containerElement.classList.remove('inactive');
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}

class Letter {
    constructor(span, i, startNextAnimation) {
        this.span = span;
        this.i = i;

        this.startNextAnimation = startNextAnimation;
        this.onAnimationEnd = this.onAnimationEnd.bind(this);
        this.span.addEventListener('animationend', this.onAnimationEnd);
    }

    onAnimationEnd() {
        this.startNextAnimation(this.i);
    }
}
