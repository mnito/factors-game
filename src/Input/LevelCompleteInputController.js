function LevelCompleteInputController(storageManager, onSelect) {
    this.storageManager = storageManager;
    this.onSelect = onSelect;
};

LevelCompleteInputController.prototype.left = function() {
    if(typeof this.onSelect === 'function') {
        this.onSelect();
    }
};

LevelCompleteInputController.prototype.right = function() {
    this.storageManager.incrementCurrentLevel();
    if(typeof this.onSelect === 'function') {
        this.onSelect();
    }
};
