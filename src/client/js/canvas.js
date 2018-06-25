var global = require('./global');

class Canvas {
    constructor(params) {
        this.target = global.target;
        this.directions = [];
        var self = this;

        this.cv = document.getElementById(global.idDiv);
        this.cv.width = global.screenWidth;
        this.cv.height = global.screenHeight;
        this.cv.addEventListener('touchstart', this.touchInput, false);
        this.cv.addEventListener('touchmove', this.touchInput, false);
        this.cv.parent = self;
        global.canvas = this;
    }

    touchInput(touch) {
        touch.preventDefault();
        touch.stopPropagation();
        this.parent.target.x = touch.touches[0].clientX - this.width / 2;
        this.parent.target.y = touch.touches[0].clientY - this.height / 2;
        global.target = this.parent.target;
    }
}

module.exports = Canvas;
