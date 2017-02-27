function GameController(levels, levelComponents, storageManager) {
    this.levels = levels;
    this.levelComponents = levelComponents;
    this.storageManager = storageManager;
    this.score = new Score([]);
}

GameController.prototype.startLevel = function(level) {
    var levelComponents = this.levelComponents;
    levelComponents.level = this.levels.get(this.storageManager.getCurrentLevel());
    var viewController = this.levelComponents.getViewController();
    var inputController = this.levelComponents.getInputController();
    levelComponents.setInputControllers(inputController);
    inputController.onComplete = function() {
        var result = {level: levelComponents.level.puzzle.original, path: levelComponents.level.puzzle.history, endNumber: levelComponents.level.puzzle.number};
        this.storageManager.setLevelResult(result.level, result);
        this.score.results = this.storageManager.getLevelResults();
        levelComponents.getCompleteAnimation(this.score).run();
        var completeInputController = levelComponents.getCompleteInputController(this.storageManager, this.startLevel.bind(this));
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
