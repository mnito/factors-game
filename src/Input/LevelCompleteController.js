function LevelCompleteController (storageManager, onSelect, levelLimit, level) {
  this.storageManager = storageManager;
  this.onSelect = onSelect;
  this.levelLimit = levelLimit;
  this.level = level;
}

LevelCompleteController.prototype.left = function () {
  if (typeof this.onSelect === 'function') {
    this.onSelect(this.level.getNumber(), true);
  }
};

LevelCompleteController.prototype.right = function () {
  var nextLevelNumber = this.level.getNumber() + 1;
  // Wrap back around if above limit
  if (this.levelLimit && nextLevelNumber > this.levelLimit) {
    nextLevelNumber = 1;
  }

  if (typeof this.onSelect === 'function') {
    this.onSelect(nextLevelNumber, true);
  }
};

LevelCompleteController.prototype.up = function () {
  if (typeof this.onSelect === 'function') {
    this.onSelect(this.level.getNumber(), false);
  }
};

LevelCompleteController.prototype.down = function () {};
