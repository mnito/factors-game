function TapInput (element, tapRegions) {
  this.element = typeof element !== 'undefined' ? element : document;
  this.tapRegions = Array.isArray(tapRegions) ? tapRegions : [];
  this.upCount = 0;
  this.listeners = {
    touchStart: this.tap.bind(this),
    mouseDown: this.tap.bind(this)
  };
}

TapInput.prototype.add = function (tapRegion) {
  this.tapRegions.push(tapRegion);
};

TapInput.prototype.listen = function () {
  this.element.addEventListener('touchstart', this.listeners.touchStart);
  this.element.addEventListener('mousedown', this.listeners.mouseDown);
};

TapInput.prototype.tap = function (event) {
  event.preventDefault();

  // Used for both touchstart and mousedown events
  var isTouchEvent = event.type === 'touchstart';

  // Used to get position of point within element
  var targetRect = event.target.getBoundingClientRect();

  // Scale factors for canvas
  var scaleX = (this.element.width || this.element.clientWidth) / this.element.clientWidth;
  var scaleY = (this.element.height || this.element.clientHeight) / this.element.clientHeight;

  var x = ((isTouchEvent ? event.touches[0].clientX  : event.clientX) - targetRect.left) * scaleX;
  var y = ((isTouchEvent ? event.touches[0].clientY  : event.clientY) - targetRect.top) * scaleY;
  for (var i = 0; i < this.tapRegions.length; i += 1) {
    var tapRegion = this.tapRegions[i];
    if (tapRegion.boundingBox.isPointWithin(x, y) && typeof tapRegion.onTap === 'function') {
      tapRegion.onTap(x, y);
    }
  }
};

TapInput.prototype.detach = function () {
  this.element.removeEventListener('touchstart', this.listeners.touchStart);
  this.element.removeEventListener('mousedown', this.listeners.mouseDown);
};
