function LevelComponents(canvas, level) {
    this.canvas = canvas;
    this.level = level;
}

LevelComponents.prototype.getViewController = function() {
    if(typeof this.viewController === 'undefined') {
        this.viewController = new LevelViewController(this.canvas, 2, 'white', this.getCurrentLevel());
    } else {
        this.viewController.level = this.getCurrentLevel();
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
        this.completeInputController = new LevelCompleteInputController(storageManager, onSelect);
    }
    return this.completeInputController;
};
