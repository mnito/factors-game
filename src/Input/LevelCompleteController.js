function LevelCompleteController(storageManager, onSelect, level) {
    this.storageManager = storageManager;
    this.onSelect = onSelect;
    this.level = level;
};

LevelCompleteController.prototype.left = function() {
    if(typeof this.onSelect === 'function') {
        this.onSelect(this.level);
    }
};

LevelCompleteController.prototype.right = function() {
    if(this.level.getNumber() === this.storageManager.getCurrentLevel()) {
        this.storageManager.incrementCurrentLevel();
    }
    if(typeof this.onSelect === 'function') {
        this.onSelect(this.level + 1);
    }
};
