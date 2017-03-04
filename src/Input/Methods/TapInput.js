function TapInput(boundingBox, element, callback) {
    this.boundingBox = boundingBox;
    this.element = typeof element !== 'undefined' ? element : document;
    this.callback = callback;
    this.upCount = 0;
    this.listeners = {
        touchStart: this.tap.bind(this),
        keyDown: this.doubleUp.bind(this)
    };
}

TapInput.prototype.listen = function() {
    this.element.addEventListener('touchstart', this.listeners.touchStart);
    document.addEventListener('keydown', this.listeners.keyDown);
};

TapInput.prototype.tap = function(event) {
    event.preventDefault();
    var x = event.touches[0].clientX;
    var y = event.touches[0].clientY;
    if(this.boundingBox.isPointWithin(x, y)) {
        this.callback(x, y);
    }
};

TapInput.prototype.doubleUp = function(event) {
    if(event.keyCode === 38) {
        this.upCount += 1;
    } else {
        this.upCount = 0;
    }
    if(this.upCount > 1) {
        this.callback();
        this.upCount = 0;
    }
};

TapInput.prototype.detach = function() {
    this.element.removeEventListener('touchstart', this.listeners.touchStart);
    document.removeEventListener('keydown', this.listeners.keyDown);
};

function BoundingBox(x, y, width, length) {
  this.topLeft = {x: x, y: y};
  this.bottomRight = {x: x + width, y: y + length};
};

BoundingBox.prototype.isPointWithin = function(x, y) {
  if(this.topLeft.x > x || x > this.bottomRight.x) {
    return false;
  }
  if(this.topLeft.y > y || y > this.bottomRight.y) {
    return false;
  }
  return true;
};
