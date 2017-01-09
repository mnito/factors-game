function LevelInputController( viewController, completeCallback ) {
  this.viewController = viewController;
  this.completeCallback = completeCallback;
  var index = this.viewController.level.puzzle.history.slice(-1)[0];
  if( typeof index === 'undefined' ) {
    index = Math.floor(this.viewController.level.puzzle.board.columns / 2);
  }
  this.index = index;
};

LevelInputController.prototype.left = function() {
  if( this.index === 0 ) {
    return;
  }
  this.index -= 1;
  this.viewController.liveIndex = this.index;
  this.viewController.draw();
};

LevelInputController.prototype.right = function() {
  if( this.index === this.viewController.level.puzzle.board.columns - 1 ) {
    return;
  }
  this.index += 1;
  this.viewController.liveIndex = this.index;
  this.viewController.draw();
};

LevelInputController.prototype.down = function() {
  if(!this.viewController.level.puzzle.isComplete()) {
      this.viewController.level.puzzle.playIndex(this.index);
      this.viewController.draw();
  }
  if(this.viewController.level.puzzle.isComplete() && typeof this.completeCallback !== 'undefined') {
      this.completeCallback(this.viewController.level);
  }
};
