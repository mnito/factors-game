function LevelCompleteController (storageManager, onSelect, levelLimit, level) {
  this.storageManager = storageManager;
  this.onSelect = onSelect;
  this.levelLimit = levelLimit;
  this.level = level;
}

LevelCompleteController.prototype.left = function () {
  if (typeof this.onSelect === 'function') {
    this.onSelect(this.level.getNumber());
  }
};

LevelCompleteController.prototype.right = function () {
  var nextLevelNumber = this.level.getNumber() + 1;
  // Wrap back around if above limit
  if (this.levelLimit && nextLevelNumber > this.levelLimit) {
    nextLevelNumber = 1;
  }
  // Don't increment if last level
  if (nextLevelNumber - 1 === this.storageManager.getCurrentLevel()) {
    this.storageManager.incrementCurrentLevel();
  }
  if (typeof this.onSelect === 'function') {
    this.onSelect(nextLevelNumber);
  }
};

LevelCompleteController.prototype.up = function () {};

LevelCompleteController.prototype.down = function () {};
