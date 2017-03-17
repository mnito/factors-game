/* Refactoring - preliminary */

function FactorsGame(levels, config, storageManager, score, canvas) {
    this.levels = levels;
    this.config = config;
    this.storageManager = storageManager;
    this.score = score;
    this.canvas = canvas;
    this.brush = canvas.getContext('2d');
    this.brush.clearAll = function() {
        this.clearRect(0, 0, canvas.width, canvas.height);
    };

    this.states = {
        PLAYING: new PlayingState(this),
        COMPLETE: new CompleteState(this),
        SELECT: new SelectState(this)
    };
    this.state = null;
}

FactorsGame.prototype.start = function() {
    this.transition('PLAYING');
};

FactorsGame.prototype.transition = function(nextState) {
    var context;
    if(this.state) {
        context = this.state.onLeave();
    }
    if(this.states[nextState]) {
        this.state = this.states[nextState];
    }
    this.state.onEnter(context);
};

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

function CompleteState(game) {
    this.game = game;
    var renderRegion = new RenderRegion(0, 0, game.canvas.width, game.canvas.height);
    this.animation = new LevelCompleteAnimation(game.brush, renderRegion);
    this.completeView = new LevelCompleteView(game.brush, renderRegion, game.config.numberColor);
    this.levelCompleteController = new LevelCompleteController(game.storageManager, function() {
        game.transition('PLAYING');
    });
    this.inputMethod = new KeyboardInput(this.levelCompleteController);
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
    var inputMethod = this.inputMethod;
    this.animation.run(function() {
        completeView.draw();
        inputMethod.listen();
    });
};

CompleteState.prototype.onLeave = function() {
    this.inputMethod.detach();
    return { level: this.game.levels.get(this.game.storageManager.getCurrentLevel()) };
};

function SelectState(game) {
    this.game = game;
    var selectView = new LevelSelectView(game.brush, new RenderRegion(0, 0, game.canvas.width, game.canvas.height), game.storageManager, new XSPRNG(1), new MonochromaticPaletteBuilder(), game.config.numberColor, game.canvas.height * .7);
    this.selectView = selectView;
    this.inputMethod = new SliderInput(game.canvas, function(value, x, y, end) {
        selectView.redraw(value, x, y, end);
    });
    this.inputMethod.onSelect = function(value) {
        if(value > 0) {
            game.transition('PLAYING');
        }
    }.bind(this);
};

SelectState.prototype.onEnter = function(context) {
    this.game.brush.clearAll();
    this.selectView.blockSize = context.levelView.blockSize || context.blockSize;
    this.inputMethod.min = 0;
    this.inputMethod.max = this.game.score.totalLevelsPlayed();
    this.inputMethod.xPad = this.selectView.blockSize / 2;
    this.inputMethod.yMin = this.selectView.renderRegion.height * .7;
    this.inputMethod.yMax = this.selectView.renderRegion.height * .7 + this.selectView.blockSize;
    this.inputMethod.triggerInitial(this.game.storageManager.getLastPlayedLevel());
    this.inputMethod.listen();
}

SelectState.prototype.onLeave = function() {
    this.inputMethod.detach();
    return { level: this.game.levels.get(this.inputMethod.value) };
};
