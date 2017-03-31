function PlayingState (game) {
  this.game = game;
  var renderRegion = new RenderRegion(0, game.canvas.height * 0.15, game.canvas.width, game.canvas.height * 0.85);
  this.levelView = new LevelView(game.brush, renderRegion, 2, game.config.numberColor);
  this.statusBar = new StatusBar(game.brush, new RenderRegion());
  this.statusBar.renderRegion.height = game.canvas.height * 0.15;
  this.levelController = new LevelController();
  var afterInput = function () {
    this.levelView.redraw();
  }.bind(this);
  this.levelKeyboardInputMethod = new KeyboardInput(this.levelController, afterInput);
  this.levelTouchInputMethod = new SwipeInput(game.canvas, this.levelController, afterInput);
  this.selectTransitionTouchInputMethod = new TapInput(game.canvas, [new TapRegion(null, function () {
    game.transition('SELECT');
  })]);
  this.selectTransitionKeyboardInputMethod = new DoubleUpInput(function () {
    game.transition('SELECT');
  });
  this.levelController.onComplete = function () {
    game.transition('COMPLETE');
  };
}

PlayingState.prototype.onEnter = function (context) {
  this.game.brush.clearAll();
  var level = context && context.level ? context.level : this.game.levels.get(this.game.storageManager.getCurrentLevel());
  this.game.canvas.style.backgroundColor = level.palette.backgroundColor;
  this.levelController.level = level;
  this.levelView.level = level;
  this.levelKeyboardInputMethod.listen();
  this.levelTouchInputMethod.listen();
  this.levelView.draw();

  this.statusBar.renderRegion.x = this.levelView.leftMargin + this.levelView.spacing;
  this.statusBar.renderRegion.y = 0;
  this.statusBar.renderRegion.width = (this.levelView.blockSize + this.levelView.spacing) * 4;
  this.statusBar.level = level;
  this.statusBar.fontSize = this.levelView.blockSize / 3.75;
  this.statusBar.score = this.game.score;
  this.statusBar.draw();

  this.selectTransitionTouchInputMethod.tapRegions[0].boundingBox = new BoundingBox(this.levelView.leftMargin + (this.levelView.blockSize + this.levelView.spacing) * 3, 0, this.levelView.blockSize, this.statusBar.renderRegion.height * 0.75);
  this.selectTransitionTouchInputMethod.listen();
  this.selectTransitionKeyboardInputMethod.listen();
};

PlayingState.prototype.onLeave = function () {
  this.levelKeyboardInputMethod.detach();
  this.levelTouchInputMethod.detach();
  this.selectTransitionTouchInputMethod.detach();
  this.selectTransitionKeyboardInputMethod.detach();
  return { level: this.levelView.level, levelView: this.levelView, statusBar: this.statusBar };
};
