function LevelComponents(config, canvas, level) {
    this.config = config;
    this.canvas = canvas;
    this.level = level;
}

LevelComponents.prototype.getViewController = function() {
    if(typeof this.viewController === 'undefined') {
        this.viewController = new LevelViewController(this.canvas, 2, 'white', this.getCurrentLevel());
    } else {
        this.viewController.level = this.getCurrentLevel();
    }
    if(this.level.puzzle.original === 1) {
        var tutorialController = new TutorialViewController(this.viewController);
        this.viewController.onDraw = function() {
            tutorialController.draw();
        }.bind(this);
    } else {
        this.viewController.onDraw = function() {};
    }
    return this.viewController;
};

LevelComponents.prototype.getInputController = function() {
    if(typeof this.inputController === 'undefined') {
        this.inputController = new LevelInputController(this.getViewController());
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
    var viewController = this.getViewController();
    return new LevelCompleteAnimation(viewController, function() {
        var levelCompleteViewController = new LevelCompleteViewController(this.canvas, viewController.level, score, 'white');
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
