function CompleteState(game) {
    this.game = game;
    var renderRegion = new RenderRegion(0, 0, game.canvas.width, game.canvas.height);
    this.animation = new LevelCompleteAnimation(game.brush, renderRegion);
    this.completeView = new LevelCompleteView(game.brush, renderRegion, game.config.numberColor);
    this.levelCompleteController = new LevelCompleteController(game.storageManager, function(levelNumber) {
        this.nextLevel = game.levels.get(levelNumber);
        game.transition('PLAYING');
    }.bind(this));
    this.keyboardInputMethod = new KeyboardInput(this.levelCompleteController);
    this.touchInputMethod = new TouchInput(game.canvas, this.levelCompleteController);
    var leftTapRegion = new TapRegion(new BoundingBox(0, renderRegion.height * .825, renderRegion.width * .5 - 1, renderRegion.height * .1), function() {
        this.levelCompleteController.left();
    }.bind(this));
    var rightTapRegion = new TapRegion(new BoundingBox(renderRegion.width * .5 + 1, renderRegion.height * .825, renderRegion.width * .5 - 1, renderRegion.height * .1), function() {
        this.levelCompleteController.right();
    }.bind(this));
    this.tapInputMethod = new TapInput(canvas, [leftTapRegion, rightTapRegion]);
}

CompleteState.prototype.onEnter = function(context) {
    var result = {level: context.level.getNumber(), path: context.level.puzzle.history, endNumber: context.level.puzzle.number};
    try {
        var currentResult = this.game.storageManager.getLevelResult(result.level);
        if(result.endNumber < currentResult.endNumber || (result.endNumber === currentResult.endNumber && result.path.length <= currentResult.path.length)) {
            this.game.storageManager.setLevelResult(result.level, result);
        }
    } catch(e) {
        this.game.storageManager.setLevelResult(result.level, result);
    }
    this.completeView.level = context.level;
    this.completeView.score = this.game.score;
    this.animation.level = context.level;
    this.animation.levelView = context.levelView;
    this.animation.statusBar = context.statusBar;
    this.levelCompleteController.level = context.level;
    var completeView = this.completeView;
    var keyboardInputMethod = this.keyboardInputMethod;
    var touchInputMethod = this.touchInputMethod;
    var tapInputMethod = this.tapInputMethod;
    this.animation.run(function() {
        completeView.draw();
        keyboardInputMethod.listen();
        touchInputMethod.listen();
        tapInputMethod.listen();
    });
};

CompleteState.prototype.onLeave = function() {
    this.keyboardInputMethod.detach();
    this.touchInputMethod.detach();
    this.tapInputMethod.detach();
    return { level: this.nextLevel };
};
