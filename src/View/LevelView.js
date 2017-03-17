function LevelView (brush, renderRegion, spacing, numberColor, level) {
  this.brush = brush;
  this.renderRegion = renderRegion;
  this.spacing = spacing;
  this.numberColor = numberColor;
  this.level = level;
  this.last = this.level;
}

LevelView.prototype.resetFont = function () {
  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px sans-serif';
  this.brush.textAlign = 'center';
  this.brush.textBaseline = 'middle';
};

LevelView.prototype.determineBlockSize = function () {
  var columns = this.level.puzzle.board.columns;
  var rows = this.level.puzzle.board.rows + 1;
  var maxWidth = this.renderRegion.width / columns;
  var maxHeight = this.renderRegion.height / rows;
  this.blockSize = Math.min(maxWidth, maxHeight) - this.spacing;
};

LevelView.prototype.determineLeftMargin = function () {
  var columns = this.level.puzzle.board.columns;
  this.leftMargin = (this.renderRegion.width - ((this.blockSize * columns) + (this.spacing * (columns - 1)))) / 2;
};

LevelView.prototype.drawBoard = function () {
  var blockIndex = this.level.puzzle.currentRow * this.level.puzzle.board.columns;
  var x = 0;
  var y = 0;
  var offset = this.renderRegion.y + this.blockSize + this.spacing;
  for (var i = 0; i < this.level.puzzle.board.columns; i += 1) {
    for (var j = this.level.puzzle.history.length; j < this.level.puzzle.board.rows; j += 1) {
      var number = this.level.puzzle.board.get(j, i);
      this.brush.fillStyle = this.level.palette.boardColors[number - 1].toString();
      x = i * this.blockSize + (this.spacing * i) + this.leftMargin;
      y = j * this.blockSize + offset + (this.spacing * j);
      this.brush.fillRect(x, y, this.blockSize, this.blockSize);
      this.brush.fillStyle = this.numberColor;
      this.brush.fillText('' + number, x + this.blockSize / 2, y + this.blockSize / 2);
      blockIndex += 1;
    }
  }
};

LevelView.prototype.drawNumber = function () {
  var index = this.level.index;
  var currentRow = this.level.puzzle.currentRow;
  var x = index * this.blockSize + (this.spacing * index) + this.leftMargin;
  var y = currentRow * this.blockSize + this.renderRegion.y + (this.spacing * currentRow);
  this.brush.fillStyle = this.level.palette.numberColor.toString();
  this.brush.fillRect(x, y, this.blockSize, this.blockSize);
  this.brush.fillStyle = this.numberColor;
  this.brush.fillText('' + this.level.puzzle.number, x + this.blockSize / 2, y + this.blockSize / 2);
};

LevelView.prototype.draw = function () {
  if (typeof this.level === 'undefined') {
    return;
  }
  // Caching of block size and left margin
  if (typeof this.last === 'undefined' || this.last.columns !== this.level.columns || this.last.rows !== this.level.rows) {
    this.determineBlockSize();
    this.determineLeftMargin();
    this.last = this.level;
  }
  this.resetFont();
  this.drawNumber();
  this.drawBoard();
};

LevelView.prototype.redraw = function () {
  this.brush.clearRect(this.renderRegion.x, this.renderRegion.y - 1, this.renderRegion.width, this.renderRegion.height + 1);
  this.draw();
};
