/* Refactoring - preliminary */
function FactorsGame(canvas) {
    this.states = {
        PLAYING: 0,
        COMPLETE: 1,
        SELECT: 2,
        SUSPENDED: 3
    };
    this.state = this.states.SUSPENDED;
    this.score = new Score();
    this.storageManager = new StorageManager(localStorage);
}

FactorsGame.prototype.start = function() {
    var levels = new Levels(new XSPRNG(1), 70, new MonochromaticPaletteBuilder());
    var state = new PlayingState(canvas, this);
    var level = levels.get(16);
    this.score.results = this.storageManager.getLevelResults();
    state.onEnter({level: level, score: this.score});
    this.state = state;
};

FactorsGame.prototype.transition = function() {
    var context = this.state.onLeave();
    this.state = new CompleteState(canvas, this);
    context.score = this.score;
    this.state.onEnter(context);
};

function PlayingState(canvas, game) {
    var brush = canvas.getContext('2d');
    var renderRegion = new RenderRegion(0, canvas.height * .15, canvas.width, canvas.height * .85);
    this.levelView = new LevelView(brush, renderRegion, 2, '#FFFFFF');
    this.statusBar = new StatusBar(brush);
    this.levelController = new LevelController();
    this.inputMethod = new KeyboardInput(this.levelController, function() {
        this.levelView.redraw();
    }.bind(this));
    this.levelController.onComplete = function() {
        game.transition();
    }
}

PlayingState.prototype.onEnter = function(context) {
    var level = context.level;
    this.levelController.level = level;
    this.levelView.level = level;
    this.inputMethod.listen();
    this.levelView.draw();

    this.statusBar.renderRegion = new RenderRegion(this.levelView.leftMargin + this.levelView.spacing, 0, (this.levelView.blockSize + this.levelView.spacing) * 4, canvas.height * .15);
    this.statusBar.level = level;
    this.statusBar.fontSize = this.levelView.blockSize / 3.75;
    this.statusBar.score = context.score;
    this.statusBar.draw();
};

PlayingState.prototype.onLeave = function() {
    this.inputMethod.detach();
    return { level: this.levelView.level, levelView: this.levelView, statusBar: this.statusBar };
};

function CompleteState(canvas, game) {
    var brush = canvas.getContext('2d');
    var renderRegion = new RenderRegion(0, 0, canvas.width, canvas.height);
    this.animation = new LevelCompleteAnimation(brush, renderRegion);
    this.completeView = new LevelCompleteView(brush, renderRegion, '#FFFFFF');
    this.game = game;
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
    context.score.results = this.game.storageManager.getLevelResults();
    this.completeView.level = context.level;
    this.completeView.score = context.score;
    this.animation.level = context.level;
    this.animation.levelView = context.levelView;
    this.animation.statusBar = context.statusBar;
    var completeView = this.completeView;
    this.animation.run(function() {
        completeView.draw();
    });
};
