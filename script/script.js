'use strict';

class ProgressBar {
    constructor(option = {}) {
        const {
            start = 0,
                end = 100,
                bg = 'green',
                heigth = 20,
                textColor = 'white',
                border = '2px solid black',
        } = option;

        this.start = start;
        this.end = end;
        this.bg = bg;
        this.heigth = heigth;
        this.textColor = textColor;
        this.border = border;
        this.showText = true;
    }

    init(selector) {
        document.querySelector(selector).append(this.createProgressBar());
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        const bar = this.createBar();
        progressBar.append(bar);
        progressBar.style.width = '100%';
        progressBar.style.border = this.border;
        this.animateBar(bar);
        return progressBar;
    }

    createBar() {
        const bar = document.createElement('div');
        bar.style.cssText = `
        text-align: center;
        background-color: ${this.bg};
        height: ${this.heigth}px;
        line-height: ${this.heigth}px;
        color: ${this.textColor};
        `;
        this.stateProgress(bar);
        return bar;
    }

    stateProgress(bar) {
        bar.style.width = `${this.start}%`;
        bar.textContent = `${this.showText ? this.start + '%' : '' }`;
    }

    animateBar(bar) {
        const animate = () => {
            if (this.start < this.end) {
                this.start += 0.5;
                this.stateProgress(bar);
                requestAnimationFrame(animate);
            }
        };
        animate();
    }
}

class RoundedProgressBar extends ProgressBar {
    constructor(option = {}) {
        super(option);
        const { rounded = '30px' } = option;
        this.rounded = rounded;
    }

    createProgressBar() {
        const progressBar = super.createProgressBar();
        this.roundedProgressBar(progressBar);
        return progressBar;

    }

    roundedProgressBar(elem) {
        elem.style.borderRadius = this.rounded;
        elem.style.overflow = 'hidden';
    }
}