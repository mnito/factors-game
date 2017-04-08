function LevelController (afterInput, onComplete, onInitialStateUp, level) {
  this.afterInput = afterInput;
  this.onComplete = onComplete;
  this.onInitialStateUp = onInitialStateUp;
  this.level = level;
}

LevelController.prototype.left = function () {
  // Prevent exceeding board
  if (this.level.index === 0) {
    return;
  }
  this.level.index -= 1;
  this.tryAfterInput();
};

LevelController.prototype.right = function () {
  // Prevent exceeding board
  if (this.level.index === this.level.puzzle.board.columns - 1) {
    return;
  }
  this.level.index += 1;
  this.tryAfterInput();
};

LevelController.prototype.down = function () {
  if (!this.level.puzzle.isComplete()) {
    this.level.puzzle.playIndex(this.level.index);
  }
  if (this.level.puzzle.isComplete() && typeof this.onComplete === 'function') {
    this.onComplete(this.level);
  }
  this.tryAfterInput();
};

LevelController.prototype.up = function () {
  var initialState = this.level.puzzle.history.length === 0;
  if (initialState && typeof this.onInitialStateUp === 'function') {
    this.onInitialStateUp();
    return;
  }
  this.level.puzzle.reset();
  this.tryAfterInput();
};

LevelController.prototype.tryAfterInput = function () {
  if(typeof this.afterInput === 'function') {
    this.afterInput();
  }
};
