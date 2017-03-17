function DoubleUpInput (onDoubleUp) {
  this.onDoubleUp = onDoubleUp;
  this.upCount = 0;
  this.listeners = { keyDown: this.listener.bind(this) };
}

DoubleUpInput.prototype.listener = function (e) {
  switch (e.keyCode) {
    // Up keys
    case 38 :
    case 75 :
    case 87 :
      this.upCount += 1;
      break;
    default :
      this.upCount = 0;
  }
  if (this.upCount > 1) {
    if (typeof this.onDoubleUp === 'function') {
      this.onDoubleUp();
    }
    this.upCount = 0;
  }
};

DoubleUpInput.prototype.listen = function () {
  document.addEventListener('keydown', this.listeners.keyDown);
};

DoubleUpInput.prototype.detach = function () {
  document.removeEventListener('keydown', this.listeners.keyDown);
};
