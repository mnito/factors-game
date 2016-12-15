function LevelController(levels, storageManager, viewController) {
    this.levels = levels;
    this.storageManager = storageManager;
    this.viewController = viewController;
}

LevelController.prototype.next = function() {
    this.storageManager.incrementCurrentLevel();
    var levelNumber = parseInt(this.storageManager.getCurrentLevel());
    this.viewController.level = this.levels.get(levelNumber);
    alert('Complete');
    this.viewController.draw();
};
