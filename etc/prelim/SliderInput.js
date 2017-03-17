document.write('<p id="value">0</p>');

function SliderInput(element, min, max, callback) {
    this.element = typeof element !== 'undefined' ? element : document;
    this.min = min;
    this.max = max;
    this.maxWidth = element.width || element.offsetWidth || element.clientWidth || window.innerWidth;
    this.callback = callback;
    this.value = min;
}

SliderInput.prototype.listen = function() {
    this.element.addEventListener('touchstart', this.startTouch.bind(this));
    this.element.addEventListener('touchmove', this.determineValue.bind(this));
    this.element.addEventListener('keydown', this.setValue.bind(this));
};

SliderInput.prototype.startTouch = function(event) {
    event.preventDefault();
    this.xStart = event.touches[0].clientX;
};

SliderInput.prototype.determineValue = function(event) {
    event.preventDefault();
    if( this.xStart === null) {
        return;
    }
    var xEnd = event.touches[0].clientX;
    var value = Math.max(0, Math.min(Math.round(((xEnd * (this.max - this.min)) / (this.maxWidth)) + this.min), this.max));
    this.value = value;
    if(typeof this.callback === 'function') {
        this.callback(value);
    }
};

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
    this.callback(this.value);
};

var input = new SliderInput(document, 0, 20, function(value) {
    document.getElementById('value').innerText = value;
});

input.listen();
