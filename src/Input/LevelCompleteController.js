function LevelCompleteController(levelController) {
    this.levelController = levelController;
};

LevelCompleteController.prototype.left = function() {
    this.levelController.retry();
};

LevelCompleteController.prototype.right = function() {
    this.levelController.next();
};
