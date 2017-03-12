function LevelComponents(canvas, config, level) {
    this.canvas = canvas;
    this.config = config;
    this.level = level;
    this.brush = canvas.getContext('2d');
}

LevelComponents.prototype.getView = function() {
    if(typeof this.view === 'undefined') {
        var renderRegion = new RenderRegion(0, this.canvas.height * .15, this.canvas.width, this.canvas.height * .85);
        this.view = new LevelView(this.brush, renderRegion, 2, '#FFFFFF', this.getCurrentLevel());
    } else {
        this.view.level = this.getCurrentLevel();
    }
    if(this.level.puzzle.original === 1) {
        var tutorialController = new TutorialViewController(this.view);
        this.view.onDraw = function() {
            tutorialController.draw();
        }.bind(this);
    } else {
        this.view.onDraw = function() {};
    }
    return this.view;
};

LevelComponents.prototype.getStatusBar = function(score) {
    var view = this.view;
    if(typeof this.statusBar === 'undefined') {
        var renderRegion = new RenderRegion(view.leftMargin + view.spacing, 0, (view.blockSize + view.spacing) * 4, this.canvas.height * .15);
        this.statusBar = new StatusBar(this.brush, renderRegion, view.blockSize / 3.75, score, this.getCurrentLevel());
    }
    this.statusBar.level = this.getCurrentLevel();
    return this.statusBar;
};

LevelComponents.prototype.getInputController = function() {
    if(typeof this.inputController === 'undefined') {
        this.inputController = new LevelInputController(this.getView());
    }
    return this.inputController;
};

LevelComponents.prototype.getCurrentLevel = function() {
    if(typeof this.currentLevel === 'undefined' || this.currentLevel !== this.level) {
        this.currentLevel = this.level;
    }
    return this.currentLevel;
};

LevelComponents.prototype.getInputListeners = function() {
    if(typeof this.inputListeners === 'undefined') {
        this.inputListeners = [
            new KeyboardInput(this.getInputController()),
            new TouchInput(this.getInputController(), this.canvas)
        ];
    }
    return this.inputListeners;
};

LevelComponents.prototype.attachInputListeners = function() {
    var inputListeners = this.getInputListeners();
    for(var i = 0; i < inputListeners.length; i += 1) {
        inputListeners[i].listen();
    }
};

LevelComponents.prototype.detachInputListeners = function() {
    var inputListeners = this.getInputListeners();
    for(var i = 0; i < inputListeners.length; i += 1) {
        inputListeners[i].detach();
    }
};

LevelComponents.prototype.getCompleteAnimation = function(score) {
    var currentLevel = this.getCurrentLevel();
    return new LevelCompleteAnimation(this.getView(), this.getStatusBar(), this.canvas, function() {
        var levelCompleteViewController = new LevelCompleteViewController(this.canvas, currentLevel, score, '#FFFFFF');
        levelCompleteViewController.draw();
    });
};

LevelComponents.prototype.setInputControllers = function(inputController) {
    var inputListeners = this.getInputListeners();
    for(var i = 0; i < inputListeners.length; i += 1) {
        inputListeners[i].inputController = inputController;
    }
    console.log(inputController);
    this.inputListeners = inputListeners;
};

LevelComponents.prototype.getCompleteInputController = function(storageManager, onSelect) {
    if(typeof this.completeInputController === 'undefined') {
        this.completeInputController = new LevelCompleteInputController(this.level.puzzle.original, storageManager, onSelect);
    } else {
        this.completeInputController.level = this.level.puzzle.original;
    }
    return this.completeInputController;
};
