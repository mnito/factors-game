function LevelController(onComplete, level) {
  this.onComplete = onComplete;
  this.level = level;
};

LevelController.prototype.left = function() {
  if( this.index === 0 ) {
    return;
  }
  this.level.index -= 1;
};

LevelController.prototype.right = function() {
  if(this.index === this.level.puzzle.board.columns - 1) {
    return;
  }
  this.level.index += 1;
};

LevelController.prototype.down = function() {
  if(!this.level.puzzle.isComplete()) {
      this.level.puzzle.playIndex(this.level.index);
  }
  if(this.level.puzzle.isComplete() && typeof this.onComplete === 'function') {
      this.onComplete(this.level);
  }
};

LevelController.prototype.up = function() {
    this.level.puzzle.reset();
};

LevelController.prototype.onComplete = function() {};
