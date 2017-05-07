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
  var totalAvg;
  var avgThroughCurrent;
  // Infinity symbol
  totalAvg = avgThroughCurrent = '\u221E';
  var levelNumber = this.level.getNumber();
  try {
    totalAvg = this.score.average().toFixed(4);
    avgThroughCurrent = this.score.averageThrough(levelNumber).toFixed(4);
  } catch (e) { }

  var renderWidth = this.renderRegion.width / 2;
  var levelNumberRenderY;
  var endNumberRenderY;
  var totalAvgRenderY;
  var isLastPlayedLevel = this.score.totalLevelsPlayed() <= levelNumber;
  if(isLastPlayedLevel) {
    levelNumberRenderY = this.renderRegion.height * 0.4
    endNumberRenderY = this.renderRegion.height * 0.5;
    totalAvgRenderY = this.renderRegion.height * 0.6;
  } else {
    levelNumberRenderY = this.renderRegion.height * 0.375
    endNumberRenderY = this.renderRegion.height * 0.475;
    totalAvgRenderY = this.renderRegion.height * 0.575;
  }

  this.brush.font = Math.min(this.renderRegion.width, this.renderRegion.height) * 0.0825 + 'px sans-serif';

  this.brush.fillText('Level: ' + this.level.getNumber(), renderWidth, levelNumberRenderY);

  var endNumber = this.level.puzzle.number;
  var endNumberStr = 'End Number: ' + endNumber;
  if(endNumber === 1) {
      var moves = this.level.puzzle.history.length;
      endNumberStr += ' (' + moves + ' Move' + (moves > 1 ? 's)' : ')');
  }
  this.brush.fillText(endNumberStr, renderWidth, endNumberRenderY);

  this.brush.fillText('Avg: ' + totalAvg, renderWidth, totalAvgRenderY);

  if(!isLastPlayedLevel) {
    var label = levelNumber > 1 ? 'Avg[1 - ' + levelNumber + ']: ' : 'Avg[1]: ';
    this.brush.fillText(label + avgThroughCurrent, renderWidth, this.renderRegion.height * 0.675);
  }
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
