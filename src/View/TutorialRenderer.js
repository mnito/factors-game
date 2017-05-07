function TutorialRenderer (brush, renderRegion, textColor, blockColor, borderColor, level) {
  this.brush = brush;
  this.renderRegion = renderRegion;
  this.textColor = textColor;
  this.blockColor = blockColor;
  this.borderColor = borderColor || textColor;
  this.level = level;

  this.initial = true;
  this.up = false;
  this.done = false;

  this.lines = [
    'Swipe or type left or right.',
    'Swipe or type down to make a move.',
    'Swipe or type up to start over.',
    'Factors divide. Others add. Go for 1.'
  ];
  this.currentLine = '';
}

TutorialRenderer.prototype.resetFont = function () {
  this.brush.font = 'bold ' + this.renderRegion.width * 0.045 + 'px sans-serif';
  this.brush.textAlign = 'center';
  this.brush.textBaseline = 'middle';
  this.brush.fillStyle = this.textColor;
};

TutorialRenderer.prototype.draw = function () {
  this.resetFont();
  var line;
  if (this.initial) {
    line = this.lines[0];
  } else if (this.level.puzzle.history === [] || this.level.puzzle.history.length === 0 && !this.up) {
    line = this.lines[1];
  } else if (this.level.puzzle.history.length > 0 && !this.done) {
    line = this.lines[2];
    this.up = true;
  } else {
    line = this.lines[3];
    this.done = true;
  }
  // Avoid unnecessary draw
  if (line === this.currentLine || typeof line === 'undefined') {
    return;
  }
  this.drawLine(line);
};

TutorialRenderer.prototype.drawLine = function (text) {
  this.brush.fillStyle = this.blockColor;
  this.brush.strokeStyle = this.textColor;
  this.brush.lineWidth = this.renderRegion.width * 0.005;
  var x = this.renderRegion.x;
  var y = this.renderRegion.y;
  var width = this.renderRegion.width;
  var height = this.renderRegion.height;
  this.brush.fillRect(x, y, width, height);
  this.brush.strokeRect(x, y, width, height);
  this.brush.fillStyle = this.textColor;
  this.brush.fillText(text, x + (width / 2), y + (height / 2));
};
