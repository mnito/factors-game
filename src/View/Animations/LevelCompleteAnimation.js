function LevelCompleteAnimation (brush, renderRegion, level, levelView, statusBar, onComplete) {
  this.brush = brush;
  this.renderRegion = renderRegion;
  this.level = level;
  this.levelView = levelView;
  // Keep status bar in animation
  this.statusBar = statusBar;
  this.onComplete = onComplete;
}

LevelCompleteAnimation.prototype.frame = function () {
  var brush = this.brush;
  var number = this.level.puzzle.number;
  // Quickness is based on width and height
  var movementFactor = Math.floor(Math.max(this.renderRegion.width, this.renderRegion.height) * 0.025);
  // Move block to bottom
  if (this.y < this.renderRegion.height - this.blockSize) {
    this.y += movementFactor;
  // Lock block to bottom
  } else if (this.y !== this.renderRegion.height - this.blockSize) {
    this.y = this.renderRegion.height - this.blockSize;
  // Expand block
  } else if (this.x <= 0) {
    this.x = 0;
    this.blockSize += movementFactor;
    this.y -= movementFactor;
  // Move block over
  } else {
    this.x -= movementFactor;
  }

  brush.fillStyle = this.blockColor;
  brush.clearRect(0, 0, this.renderRegion.width, this.renderRegion.height);
  brush.fillRect(this.x, this.y, this.blockSize, this.blockSize);
  if (this.x > 0) {
    this.resetFont();
    brush.fillStyle = this.numberColor;
    brush.fillText('' + number, this.x + this.blockSize / 2, this.y + this.blockSize / 2);
  }
  if (this.blockSize > this.renderRegion.width && this.blockSize > this.renderRegion.height) {
    if (typeof this.onComplete !== 'undefined') {
      this.onComplete();
    }
    return;
  }
  if (this.statusBar && typeof this.statusBar.draw === 'function') {
    this.statusBar.draw();
  }
  var instance = this;
  window.requestAnimationFrame(function () {
    instance.frame();
  });
};

LevelCompleteAnimation.prototype.run = function (onComplete) {
  if (typeof onComplete !== 'undefined') {
    this.onComplete = onComplete;
  }
  var lastIndex = this.level.puzzle.history.slice(-1)[0];
  this.x = lastIndex * this.levelView.blockSize + (this.levelView.spacing * lastIndex) + this.levelView.leftMargin;
  var offset = this.levelView.renderRegion.y + this.levelView.blockSize + this.levelView.spacing;
  this.y = this.level.puzzle.history.length * this.levelView.blockSize + offset + (this.levelView.spacing * this.level.puzzle.history.length);
  this.blockSize = this.levelView.blockSize;
  var blockColor = this.level.palette.numberColor.clone();
  blockColor.a = 1;
  this.blockColor = blockColor;
  this.numberColor = this.levelView.numberColor;
  this.resetFont = this.levelView.resetFont;
  var instance = this;
  setTimeout(function () { instance.frame(); }, 500);
};
