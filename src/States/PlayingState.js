function PlayingState(game) {
    this.game = game;
    var renderRegion = new RenderRegion(0, game.canvas.height * .15, game.canvas.width, game.canvas.height * .85);
    this.levelView = new LevelView(game.brush, renderRegion, 2, game.config.numberColor);
    this.statusBar = new StatusBar(game.brush, new RenderRegion());
    this.statusBar.renderRegion.height = game.canvas.height * .15;
    this.levelController = new LevelController();
    this.inputMethod = new KeyboardInput(this.levelController, function() {
        this.levelView.redraw();
    }.bind(this));
    this.selectTransitionInputMethod = new TapInput(game.canvas, function() {
        game.transition('SELECT');
    });
    this.levelController.onComplete = function() {
        game.transition('COMPLETE');
    }
}

PlayingState.prototype.onEnter = function(context) {
    this.game.brush.clearAll();
    var level = context && context.level ? context.level : this.game.levels.get(this.game.storageManager.getCurrentLevel());
    this.levelController.level = level;
    this.levelView.level = level;
    this.inputMethod.listen();
    this.levelView.draw();

    this.statusBar.renderRegion.x = this.levelView.leftMargin + this.levelView.spacing;
    this.statusBar.renderRegion.y = 0;
    this.statusBar.renderRegion.width = (this.levelView.blockSize + this.levelView.spacing) * 4;
    this.statusBar.level = level;
    this.statusBar.fontSize = this.levelView.blockSize / 3.75;
    this.statusBar.score = this.game.score;
    this.statusBar.draw();

    this.selectTransitionInputMethod.boundingBox = new BoundingBox(this.levelView.leftMargin + (this.levelView.blockSize + this.levelView.spacing) * 3, 0, this.levelView.blockSize, this.statusBar.renderRegion.height * .75);
    this.selectTransitionInputMethod.listen();
};

PlayingState.prototype.onLeave = function() {
    this.inputMethod.detach();
    this.selectTransitionInputMethod.detach();
    return { level: this.levelView.level, levelView: this.levelView, statusBar: this.statusBar };
};
