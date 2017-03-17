function LevelCompleteView (brush, renderRegion, textColor, level, score) {
  this.brush = brush;
  this.renderRegion = renderRegion;
  this.textColor = textColor;
  this.level = level;
  this.score = score;
}

LevelCompleteView.prototype.drawResult = function () {
  var puzzle = this.level.puzzle;
  var result = 'done';
  var state = puzzle.state();
  if (state === 'ace') {
    result = 'ACE!';
  } else if (state === 'done') {
    result = puzzle.number < 10 ? 'LOW!' : 'High';
  } else {
    throw 'Puzzle is still ongoing. Level is not complete.';
  }
  var fontSizeFactor = 0.35;
  if (result === 'LOW!') {
    fontSizeFactor = 0.3;
  } else if (result === 'High') {
    fontSizeFactor = 0.25;
  }
  this.brush.font = 'bolder ' + Math.min(this.renderRegion.height, this.renderRegion.width) * fontSizeFactor + 'px sans-serif';
  this.brush.fillText(result, this.renderRegion.width / 2, this.renderRegion.height * 0.175);
};

LevelCompleteView.prototype.drawScore = function () {
  var total, sixteenTotal;
  // Infinity symbol
  total = sixteenTotal = '\u221E';
  var levelNumber = this.level.puzzle.original;
  var lowerBound = Math.max(levelNumber - 15, 1);
  var upperBound = levelNumber;
  try {
    total = this.score.average().toFixed(4);
    sixteenTotal = this.score.averageFrom(lowerBound, upperBound).toFixed(4);
  } catch (e) { }
  this.brush.font = Math.min(this.renderRegion.width, this.renderRegion.height) * 0.085 + 'px sans-serif';
  this.brush.fillText('AVG: ' + total, this.renderRegion.width / 2, this.renderRegion.height * 0.475);
  this.brush.fillText('AVG[' + lowerBound + '-' + upperBound + ']: ' + sixteenTotal, this.renderRegion.width / 2, this.renderRegion.height * 0.575);
};

LevelCompleteView.prototype.drawControlLabels = function () {
  this.brush.font = 'bold ' + Math.min(this.renderRegion.width, this.renderRegion.height) * 0.1 + 'px sans-serif';
  this.brush.fillText('< RETRY', this.renderRegion.width / 4, this.renderRegion.height * 0.875);
  this.brush.fillText('NEXT >', 3 * (this.renderRegion.width / 4), this.renderRegion.height * 0.875);
};

LevelCompleteView.prototype.draw = function () {
  this.brush.textAlign = 'center';
  this.brush.textBaseline = 'middle';
  this.brush.fillStyle = this.textColor;
  this.drawResult();
  this.drawScore();
  this.drawControlLabels();
};
