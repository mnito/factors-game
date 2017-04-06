function SwipeInput (element, inputController, afterInput) {
  this.element = typeof element !== 'undefined' ? element : document;
  this.inputController = inputController;
  this.afterInput = afterInput;

  this.listeners = {
    touchStart: this.startTouch.bind(this),
    touchMove: function(event) { event.preventDefault(); },
    touchEnd: this.detectSwipe.bind(this)
  };

  this.xStart = null;
  this.yStart = null;
}

SwipeInput.prototype.listen = function () {
  this.element.addEventListener('touchstart', this.listeners.touchStart);
  this.element.addEventListener('touchmove', this.listeners.touchMove);
  this.element.addEventListener('touchend', this.listeners.touchEnd);
};

SwipeInput.prototype.startTouch = function (event) {
  event.preventDefault();
  this.xStart = event.touches[0].clientX;
  this.yStart = event.touches[0].clientY;
};

SwipeInput.prototype.detectSwipe = function (event) {
  event.preventDefault();

  if (this.xStart === null || this.yStart === null) {
    return;
  }

  var xEnd = event.changedTouches[0].clientX;
  var yEnd = event.changedTouches[0].clientY;

  var deltaX = xEnd - this.xStart;
  var deltaY = yEnd - this.yStart;

  var isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

  if (isHorizontalSwipe) {
    deltaX < 0 ? this.inputController.left() : this.inputController.right();
  } else if (deltaY > 0) {
    this.inputController.down();
  } else {
    this.inputController.up();
  }

  this.xStart = null;
  this.yStart = null;

  if (typeof this.afterInput === 'function') {
    this.afterInput();
  }
};

SwipeInput.prototype.detach = function () {
  this.xStart = null;
  this.yStart = null;
  this.element.removeEventListener('touchstart', this.listeners.touchStart);
  this.element.removeEventListener('touchmove', this.listeners.touchMove);
  this.element.removeEventListener('touchend', this.listeners.touchEnd);
};
