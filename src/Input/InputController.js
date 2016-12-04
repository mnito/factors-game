function InputController( viewController ) {
  this.viewController = viewController;
  this.puzzle = viewController.level.puzzle;
  var index = this.puzzle.history.slice(-1)[0];
  if( typeof index === 'undefined' ) {
    index = 1;
  }
  this.index = index;
};

InputController.prototype.left = function() {
  if( this.index === 0 ) {
    return;
  }
  this.index -= 1;
  this.viewController.liveIndex = this.index;
  this.viewController.draw();
};

InputController.prototype.right = function() {
  if( this.index === this.puzzle.board.columns - 1 ) {
    return;
  }
  this.index += 1;
  this.viewController.liveIndex = this.index;
  this.viewController.draw();
};

InputController.prototype.down = function() {
  if( this.puzzle.isComplete() ) {
    return;
  }
  this.puzzle.playIndex(this.index);
  this.viewController.draw();
};
