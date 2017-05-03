function CompleteState (game) {
  this.game = game;
  var renderRegion = new RenderRegion(0, 0, game.canvas.width, game.canvas.height);
  this.animation = new LevelCompleteAnimation(game.brush, renderRegion);
  this.completeView = new LevelCompleteView(game.brush, renderRegion, game.config.theme.numberColor);

  this.levelCompleteController = new LevelCompleteController(game.storageManager, function (levelNumber, playing) {
    this.nextLevel = game.levels.get(levelNumber);
    game.transition(playing ? 'PLAYING' : 'SELECT');
  }.bind(this));
  this.levelCompleteController.levelLimit = game.config.levelLimit;

  // Tap regions for retry and next
  var leftTapRegion = new TapRegion(new BoundingBox(0, renderRegion.height * 0.825, renderRegion.width * 0.5 - 1, renderRegion.height * 0.1), function () {
    this.levelCompleteController.left();
  }.bind(this));
  var rightTapRegion = new TapRegion(new BoundingBox(renderRegion.width * 0.5 + 1, renderRegion.height * 0.825, renderRegion.width * 0.5 - 1, renderRegion.height * 0.1), function () {
    this.levelCompleteController.right();
  }.bind(this));
  this.tapInputMethod = new TapInput(game.canvas, [leftTapRegion, rightTapRegion]);
  this.keyboardInputMethod = new KeyboardInput(this.levelCompleteController);
  this.swipeInputMethod = new SwipeInput(game.canvas, this.levelCompleteController);
}

CompleteState.prototype.onEnter = function (context) {
  var result = {level: context.level.getNumber(), path: context.level.puzzle.history, endNumber: context.level.puzzle.number};
  try {
    var currentResult = this.game.storageManager.getLevelResult(result.level);
    if (result.endNumber < currentResult.endNumber || (result.endNumber === currentResult.endNumber && result.path.length <= currentResult.path.length)) {
      this.game.storageManager.setLevelResult(result.level, result);
    }
  } catch (e) {
    this.game.storageManager.setLevelResult(result.level, result);
    if(result.level < this.game.config.levelLimit) {
        this.game.storageManager.incrementCurrentLevel();
    }
  }

  this.levelView = context.levelView;
  this.completeView.level = context.level;
  this.completeView.score = this.game.score;
  this.animation.level = context.level;
  this.animation.levelView = context.levelView;
  this.animation.statusBar = context.statusBar;
  this.levelCompleteController.level = context.level;

  var completeView = this.completeView;
  var keyboardInputMethod = this.keyboardInputMethod;
  var swipeInputMethod = this.swipeInputMethod;
  var tapInputMethod = this.tapInputMethod;

  this.animation.run(function () {
    completeView.draw();
    // Listen after animation
    keyboardInputMethod.listen();
    swipeInputMethod.listen();
    tapInputMethod.listen();
  });
};

CompleteState.prototype.onLeave = function () {
  this.keyboardInputMethod.detach();
  this.swipeInputMethod.detach();
  this.tapInputMethod.detach();

  this.levelView.level = this.nextLevel;
  return { level: this.nextLevel, levelView: this.levelView };
};
