function init(canvas, width, height) {
    document.body.appendChild(canvas);

    canvas.width = width;
    canvas.height = height;

    canvas.style.backgroundColor = '#333333';

    canvas.id = 'gameView';


    /*
    storageManager.setLevelResult(1, {endNumber: 2});
    storageManager.setLevelResult(240, {endNumber: 3});
    var selectView = new LevelSelectViewController( canvas, storageManager, '#FFFFFF', '#000000', canvas.height * .7, 4, 4, new XSPRNG(1), new MonochromaticPaletteBuilder(0, 0));
    selectView.draw(1, selectView.blockSize / 2);
    var sliderInputController = new SliderInput(canvas, 1, 256, selectView.blockSize / 2, canvas.height * .7, canvas.height * .7 + selectView.blockSize, function(value, x, y, end) {
        selectView.draw(value, x, y, end);
    });
    sliderInputController.listen();
    */
/*
function GameController(levels, levelComponents, storageManager) {
    this.levels = levels;
    this.levelComponents = levelComponents;
    this.storageManager = storageManager;
}

GameController.prototype.startLevel = function(level) {
    var levelComponents = this.levelComponents;
    levelComponents.level = this.levels.get(this.storageManager.getCurrentLevel());
    var viewController = this.levelComponents.getViewController();
    var inputController = this.levelComponents.getInputController();
    levelComponents.setInputControllers(inputController);
    inputController.onComplete = function() {
        levelComponents.getCompleteAnimation().run();
        var completeInputController = levelComponents.getCompleteInputController(storageManager, this.startLevel.bind(this));
        levelComponents.setInputControllers(completeInputController);
    }.bind(this);
    if(!this.isListeningForInput) {
        var inputListeners = this.levelComponents.getInputListeners();
        for(var i = 0; i < inputListeners.length; i += 1) {
            inputListeners[i].listen();
        }
        this.isListeningForInput = true;
    }
    viewController.draw();
};

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

LevelComponents.prototype.getCompleteAnimation = function() {
    var viewController = this.getViewController();
    return new LevelCompleteAnimation(viewController, function() {
        var levelCompleteViewController = new LevelCompleteViewController(this.canvas, viewController.level, new Score([]), 'white');
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
*/

var levels = new Levels( new XSPRNG(1), 70, new MonochromaticPaletteBuilder());
var storageManager = new StorageManager(localStorage);
var gameController = new GameController(levels, new LevelComponents(canvas), storageManager);
gameController.startLevel();


    //var levelCompleteInputController = new LevelCompleteInputController(storageManager, vc);

    /*levelInputController.onComplete = function() {
        keyboardInput.inputController = touchInput.inputController = levelCompleteInputController;
        levelCompleteAnimation.run();
        startLevel();
    };*/

    //keyboardInput.listen();
    //touchInput.listen();
}
