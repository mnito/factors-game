function SliderInput(element, min, max, xPad, yMin, yMax, callback) {
    this.element = typeof element !== 'undefined' ? element : document;
    this.min = min;
    this.max = max;
    this.maxWidth = element.width || element.offsetWidth || element.clientWidth || window.innerWidth;
    this.xPad = xPad;
    this.yMin = yMin;
    this.yMax = yMax;
    this.callback = callback;
    this.value = min;
}

SliderInput.prototype.listen = function() {
    this.element.addEventListener('touchstart', this.startTouch.bind(this));
    this.element.addEventListener('touchmove', this.determineValue.bind(this));
    document.addEventListener('keydown', this.setValue.bind(this));
};

SliderInput.prototype.startTouch = function(event) {
    event.preventDefault();
    this.xStart = event.touches[0].clientX;
    this.yStart = event.touches[0].clientY;
};

SliderInput.prototype.determineValue = function(event) {
    event.preventDefault();
    if( this.xStart === null || this.yStart < this.yMin || this.yStart > this.yMax ) {
        return;
    }
    var xEnd = event.touches[0].clientX;
    var yEnd = event.touches[0].clientY;
    if(this.dispatchBeforeTouchValueChange(this.value, xEnd, yEnd)) {
        return;
    }
    var value = Math.max(this.min, Math.min(Math.round((((xEnd - this.xPad) * (this.max - this.min)) / (this.maxWidth - this.xPad * 2)) + this.min), this.max));
    this.value = value;
    if(typeof this.callback === 'function') {
        this.callback(value, Math.max(this.xPad, Math.min(xEnd, this.maxWidth - this.xPad)), event.touches[0].clientY);
    }
};

SliderInput.prototype.dispatchBeforeTouchValueChange = function(value, xEnd, yEnd) {
    if(!(typeof this.beforeTouchValueChange === 'function')) {
        return;
    }
    return this.beforeTouchValueChange({currentValue: value, xStart: this.xStart, yStart: this.yStart, xEnd: xEnd, yEnd: yEnd });
}

SliderInput.prototype.beforeTouchValueChange = function(callback) {
    this.beforeTouchValueChange = callback;
}

SliderInput.prototype.setValue = function(event) {
    var keyCode = event.keyCode;
    //For number input - tries to append digit if within range
    if(keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105) {
       var zeroCode = keyCode <= 57 ? 48 : 96;
       var number = keyCode - zeroCode;
       var value = this.value.toString();
       value += number.toString();
       this.value = value > this.max ? Math.min(number, this.max) : parseInt(value);
    //Backspace input - let's do it mathematically
    } else if(keyCode === 8) {
        event.preventDefault();
       this.value = Math.floor(this.value / 10);
    //Left and right arrow keys - treat it like a number line
    } else {
        switch(event.keyCode) {
            //Left
            case 37 :
            case 65 :
            case 72 :
                if(this.value > this.min) {
                    this.value -= 1;
                }
                break;
            //Right
            case 39 :
            case 68 :
            case 76 :
                if(this.value < this.max) {
                    this.value += 1;
                }
                break;
        }
    }
    var x = Math.max(this.value, this.min) * ((this.maxWidth - this.xPad * 2) / this.max) + this.xPad;
    this.callback(this.value, x);
};

/*
sliderInputController.beforeTouchValueChange(function(event) {
    var deltaX = event.xEnd - event.xStart;
    var deltaY = event.yEnd - event.yStart;

    var isDownSwipe = Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 50;

    if(isDownSwipe) {
        alert("It's a down swipe! Value: " + event.currentValue);
        return true;
    }
});
sliderInputController.listen();
*/
