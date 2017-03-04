function LevelCompleteInputController(level, storageManager, onSelect) {
    this.level = level;
    this.storageManager = storageManager;
    this.onSelect = onSelect;
};

LevelCompleteInputController.prototype.left = function() {
    if(typeof this.onSelect === 'function') {
        this.onSelect(this.level);
    }
};

LevelCompleteInputController.prototype.right = function() {
    if(this.level === this.storageManager.getCurrentLevel()) {
        this.storageManager.incrementCurrentLevel();
    }
    if(typeof this.onSelect === 'function') {
        this.onSelect(this.level + 1);
    }
};
