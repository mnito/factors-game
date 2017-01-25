function LevelController(levels, storageManager, viewController, completeCallback) {
    this.levels = levels;
    this.storageManager = storageManager;
    this.viewController = viewController;
    this.completeCallback = completeCallback;
}

LevelController.prototype.next = function() {
    this.storageManager.incrementCurrentLevel();
    var levelNumber = parseInt(this.storageManager.getCurrentLevel());
    this.viewController.level = this.levels.get(levelNumber);
    this.viewController.draw();
    if(typeof completeCallback !== 'undefined') {
        completeCallback();
    }
};

//Should eventually use puzzle reset method
LevelController.prototype.retry = function() {
    var levelNumber = parseInt(this.storageManager.getCurrentLevel());
    this.viewController.level = this.levels.get(levelNumber);
    this.viewController.draw();
    if(typeof completeCallback !== 'undefined') {
        completeCallback();
    }
};
