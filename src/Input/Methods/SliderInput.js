function SliderInput (element, callback, xPad, yMin, yMax, min, max, radius) {
  this.element = typeof element !== 'undefined' ? element : document;
  this.maxWidth = element.width || element.offsetWidth || element.clientWidth || window.innerWidth;
  this.callback = callback;

  // Padding from left and right edges
  this.xPad = xPad;
  // Determines touch region
  this.yMin = yMin;
  this.yMax = yMax;

  this.min = min;
  this.max = max;
  this.value = min;

  this.xStart = null;
  this.yStart = null;

  this.radius = radius || 0;

  this.listeners = {
    touchStart: this.startTouch.bind(this),
    touchMove: this.determineValue.bind(this),
    touchEnd: this.endTouch.bind(this),
    mouseDown: this.startTouch.bind(this),
    mouseMove: this.determineValue.bind(this),
    mouseUp: this.endTouch.bind(this),
    keyDown: this.setValue.bind(this)
  };
}

SliderInput.prototype.listen = function () {
  this.element.addEventListener('touchstart', this.listeners.touchStart);
  this.element.addEventListener('touchmove', this.listeners.touchMove);
  this.element.addEventListener('touchend', this.listeners.touchEnd);

  //Simulate touch events for mouse
  this.element.addEventListener('mousedown', this.listeners.mouseDown);
  this.element.addEventListener('mousemove', this.listeners.mouseMove);
  this.element.addEventListener('mouseup', this.listeners.mouseUp);

  document.addEventListener('keydown', this.listeners.keyDown);
};

SliderInput.prototype.startTouch = function (event) {
  event.preventDefault();
  event.stopPropagation();
  var offset = this.offsetPoints(event.clientX || event.touches[0].clientX, event.clientY || event.touches[0].clientY, event);
  this.xStart = offset.x;
  this.yStart = offset.y;
};

SliderInput.prototype.offsetPoints = function (x, y, event) {
  var targetRect = event.target.getBoundingClientRect();

  // Scale factors for canvas
  var scaleX = (this.element.width || this.element.clientWidth) / this.element.clientWidth;
  var scaleY = (this.element.height || this.element.clientHeight) / this.element.clientHeight;

  return {x: (x - targetRect.left) * scaleX, y: (y - targetRect.top) * scaleY};
};

SliderInput.prototype.determineValue = function (event) {
  event.preventDefault();
  event.stopPropagation();

  if (this.xStart === null || this.xStart < (this.xPad - this.radius) || this.xStart > ((this.maxWidth - this.xPad) + this.radius) || this.yStart < this.yMin || this.yStart > this.yMax) {
    return;
  }
  var offset = this.offsetPoints(event.clientX || event.touches[0].clientX, event.clientY || event.touches[0].clientY, event);
  var xEnd = offset.x;
  var yEnd = offset.y;
  // Linear translation
  var value = Math.max(this.min, Math.min(Math.round((((xEnd - this.xPad) * (this.max - this.min)) / (this.maxWidth - this.xPad * 2)) + this.min), this.max));
  this.value = value;
  if (typeof this.callback === 'function') {
    // Make sure x is in range
    var x = Math.max(this.xPad, Math.min(xEnd, this.maxWidth - this.xPad));
    var y = event.clientY || event.touches[0].clientY;
    this.lastX = x;
    this.lastY = y;
    this.callback(value, x, y, false);
  }
};

SliderInput.prototype.endTouch = function (event) {
  var offset = this.offsetPoints(event.clientX || event.changedTouches[0].clientX, event.clientY || event.changedTouches[0].clientY, event);
  var xEnd = offset.x;
  var yEnd = offset.y;
  this.xStart = null;
  this.yStart = null;
  this.callback(this.value, this.lastX, this.lastY, true);
};

SliderInput.prototype.onSelect = function (value) {};

SliderInput.prototype.setValue = function (event) {
  var keyCode = event.keyCode;
  // For number input - tries to append digit if within range
  if (keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105) {
    var zeroCode = keyCode <= 57 ? 48 : 96;
    var number = keyCode - zeroCode;
    var value = this.value.toString();
    value += number.toString();
    this.value = value > this.max ? Math.min(number, this.max) : parseInt(value);
  // Backspace input - let's do it mathematically
  } else if (keyCode === 8) {
    event.preventDefault();
    this.value = Math.floor(this.value / 10);
  // Left and right arrow keys - treat it like a number line
  } else {
    switch (event.keyCode) {
      // Left
      case 37 :
      case 65 :
      case 72 :
        event.preventDefault();
        if (this.value > this.min) {
          this.value -= 1;
        }
        break;
      // Right
      case 39 :
      case 68 :
      case 76 :
        event.preventDefault();
        if (this.value < this.max) {
          this.value += 1;
        }
        break;
      // Down, enter, or spacebar
      case 40 :
      case 74 :
      case 83 :
      case 13 :
      case 32 :
        event.preventDefault();
        this.onSelect(this.value, event);
        return;
    }
  }
  var x = this.min === this.max ? this.maxWidth / 2 : (Math.max(this.value, this.min) - this.min) * ((this.maxWidth - this.xPad * 2) / (this.max - this.min)) + this.xPad;
  this.lastX = x;
  this.callback(this.value, x, null, true);
};

SliderInput.prototype.trigger = function (value) {
  if (value > this.max || value < this.min) {
    return;
  }
  var x = this.min === this.max ? this.maxWidth / 2 : (Math.max(value, this.min) - this.min) * ((this.maxWidth - this.xPad * 2) / (this.max - this.min)) + this.xPad;
  this.lastX = x;
  this.value = value;
  this.callback(value, x, null, true);
};

SliderInput.prototype.detach = function () {
  this.element.removeEventListener('touchstart', this.listeners.touchStart);
  this.element.removeEventListener('touchmove', this.listeners.touchMove);
  this.element.removeEventListener('touchend', this.listeners.touchEnd);
  this.element.removeEventListener('mousedown', this.listeners.mouseDown);
  this.element.removeEventListener('mousemove', this.listeners.mouseMove);
  this.element.removeEventListener('mouseup', this.listeners.mouseUp);
  document.removeEventListener('keydown', this.listeners.keyDown);
};
