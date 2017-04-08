function KeyboardInput (inputController) {
  this.inputController = inputController;
  this.listeners = { keyDown: this.listener.bind(this) };
}

KeyboardInput.prototype.listener = function (e) {
  switch (e.keyCode) {
    case 37 :
    case 65 :
    case 72 :
      e.preventDefault();
      this.inputController.left();
      break;
    case 40 :
    case 74 :
    case 83 :
      e.preventDefault();
      this.inputController.down();
      break;
    case 38 :
    case 75 :
    case 87 :
      e.preventDefault();
      this.inputController.up();
      break;
    case 39 :
    case 68 :
    case 76 :
      e.preventDefault();
      this.inputController.right();
      break;
  }
};

KeyboardInput.prototype.listen = function () {
  document.addEventListener('keydown', this.listeners.keyDown);
};

KeyboardInput.prototype.detach = function () {
  document.removeEventListener('keydown', this.listeners.keyDown);
};
