function GameController(levels, levelComponents, storageManager, canvas) {
    this.levels = levels;
    this.levelComponents = levelComponents;
    this.levelComponents.canvas = canvas;
    this.storageManager = storageManager;
    this.score = new Score([]);
    this.canvas = canvas;
    this.clear = function() {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
    this.levelSelectListener = new TapInput(null, canvas);
    this.levelSelectListener.callback = function(x, y) {
        this.selectLevel();
        this.levelComponents.detachInputListeners();
        this.isListeningForInput = false;
        this.levelSelectListener.detach();
    }.bind(this);
}

GameController.prototype.startLevel = function(level) {
    var levelComponents = this.levelComponents;
    levelComponents.level = this.levels.get(level);
    var view = this.levelComponents.getView();
    this.setLevelSelectBoundingBox(view);
    this.score.results = this.storageManager.getLevelResults();
    var statusBar = this.levelComponents.getStatusBar(this.score);
    var inputController = this.levelComponents.getInputController();
    levelComponents.setInputControllers(inputController);
    inputController.onComplete = function() {
        var result = {level: levelComponents.level.puzzle.original, path: levelComponents.level.puzzle.history, endNumber: levelComponents.level.puzzle.number};
        try {
            var currentResult = this.storageManager.getLevelResult(result.level);
            if(result.endNumber < currentResult.endNumber || (result.endNumber === currentResult.endNumber && result.path.length <= currentResult.path.length)) {
                this.storageManager.setLevelResult(result.level, result);
            }
        } catch(e) {
            this.storageManager.setLevelResult(result.level, result);
        }
        this.score.results = this.storageManager.getLevelResults();
        levelComponents.getCompleteAnimation(this.score).run();
        var completeInputController = levelComponents.getCompleteInputController(this.storageManager, this.startLevel.bind(this));
        levelComponents.setInputControllers(completeInputController);
    }.bind(this);
    if(!this.isListeningForInput) {
        this.levelSelectListener.listen();
        this.levelComponents.attachInputListeners();
        this.isListeningForInput = true;
    }
    this.storageManager.setLastPlayedLevel(level);
    this.clear();
    statusBar.draw();
    view.draw();
};

GameController.prototype.selectLevel = function() {
    var viewController = new LevelSelectViewController(this.canvas, this.storageManager, 'white', 'red', this.canvas.height * .7, 4, 4, new XSPRNG(1), new MonochromaticPaletteBuilder());
    this.score.results = this.storageManager.getLevelResults();
    var inputController = new SliderInput(canvas, 0, this.score.totalLevelsPlayed() + 1, viewController.blockSize / 2, this.canvas.height * .7, this.canvas.height * .7 + viewController.blockSize, function(value, x, y, end) {
        viewController.draw(value, x, y, end);
    });
    inputController.onSelect = function(value) {
        if(value > 0) {
            this.startLevel(value);
            inputController.detach();
        }
    }.bind(this);
    inputController.listen();
    inputController.triggerInitial(this.storageManager.getLastPlayedLevel());
};

GameController.prototype.setLevelSelectBoundingBox = function(viewController) {
    if(this.lastBlockSize !== viewController.blockSize) {
        this.levelSelectListener.boundingBox = new BoundingBox(viewController.leftMargin + (viewController.blockSize + viewController.spacing) * 3, 0, viewController.blockSize, this.canvas.height * .10 );
        this.lastBlockSize = viewController.blockSize;
    }
};
