function SwipeInput (element, inputController) {
  this.element = typeof element !== 'undefined' ? element : document;
  this.inputController = inputController;

  this.listeners = {
    touchStart: this.startTouch.bind(this),
    touchMove: this.detectSwipe.bind(this),
    touchEnd: this.endSwipe.bind(this),
    mouseDown: this.startTouch.bind(this),
    mouseMove: this.detectSwipe.bind(this),
    mouseUp: this.endSwipe.bind(this)
  };

  this.xStart = null;
  this.yStart = null;

  this.threshold = 25;
}

SwipeInput.prototype.listen = function () {
  this.element.addEventListener('touchstart', this.listeners.touchStart);
  this.element.addEventListener('touchmove', this.listeners.touchMove);
  this.element.addEventListener('touchend', this.listeners.touchEnd);

  //Simulate touch events for mouse
  this.element.addEventListener('mousedown', this.listeners.mouseDown);
  this.element.addEventListener('mousemove', this.listeners.mouseMove);
  this.element.addEventListener('mouseup', this.listeners.mouseUp);
};

SwipeInput.prototype.startTouch = function (event) {
  event.preventDefault();
  this.xStart = event.clientX || event.touches[0].clientX;
  this.yStart = event.clientY || event.touches[0].clientY;
};

SwipeInput.prototype.detectSwipe = function (event) {
  event.preventDefault();

  if (this.xStart === null || this.yStart === null) {
    return;
  }

  var xEnd = event.clientX || event.changedTouches[0].clientX;
  var yEnd = event.clientY || event.changedTouches[0].clientY;

  var deltaX = xEnd - this.xStart;
  var deltaY = yEnd - this.yStart;

  if(Math.abs(deltaX) < this.threshold && Math.abs(deltaY) < this.threshold) {
      return;
  }

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
};

SwipeInput.prototype.endSwipe = function (event) {
  event.preventDefault();
  this.xStart = null;
  this.yStart = null;
};

SwipeInput.prototype.detach = function () {
  this.xStart = null;
  this.yStart = null;

  this.element.removeEventListener('touchstart', this.listeners.touchStart);
  this.element.removeEventListener('touchmove', this.listeners.touchMove);
  this.element.removeEventListener('touchend', this.listeners.touchEnd);

  this.element.removeEventListener('mousedown', this.listeners.mouseDown);
  this.element.removeEventListener('mousemove', this.listeners.mouseMove);
  this.element.removeEventListener('mouseup', this.listeners.mouseUp);
};
