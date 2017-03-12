function LevelView(brush, renderRegion, spacing, numberColor, level) {
   this.brush = brush;
   this.renderRegion = renderRegion;
   this.spacing = spacing;
   this.numberColor = numberColor;
   this.level = level;
   this.determineBlockSize();
   this.determineLeftMargin();
}

LevelView.prototype.resetFont = function() {
    this.brush.font = 'bold ' + this.blockSize * .5 + 'px sans-serif';
    this.brush.textAlign = 'center';
    this.brush.textBaseline = 'middle';
};

LevelView.prototype.determineBlockSize = function() {
    var columns = this.level.puzzle.board.columns;
    var rows = this.level.puzzle.board.rows + 1;
    var maxWidth = this.renderRegion.width / columns;
    var maxHeight = this.renderRegion.height / rows;
    this.blockSize = Math.min(maxWidth, maxHeight) - this.spacing;
};

LevelView.prototype.determineLeftMargin = function() {
    var columns = this.level.puzzle.board.columns;
    this.leftMargin = (this.renderRegion.width - ((this.blockSize * columns) + (this.spacing * (columns - 1)))) / 2;
};

LevelView.prototype.drawBoard = function() {
   var blockIndex = this.level.puzzle.currentRow * this.level.puzzle.board.columns;
   var x = 0;
   var y = 0;
   var offset = this.renderRegion.y + this.blockSize + this.spacing;
   for(var i = 0; i < this.level.puzzle.board.columns; i += 1) {
     for(var j = this.level.puzzle.history.length; j < this.level.puzzle.board.rows; j += 1) {
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

LevelView.prototype.drawNumber = function() {
    var lastIndex = this.liveIndex;
    if( typeof lastIndex === 'undefined' ) {
        lastIndex = this.level.puzzle.history.slice(-1)[0];
        if( typeof lastIndex === 'undefined' ) {
            lastIndex = Math.floor(this.level.puzzle.board.columns / 2);
        }
    }
    var currentRow = this.level.puzzle.currentRow;
    var x = lastIndex * this.blockSize + ( this.spacing * lastIndex ) + this.leftMargin;
    var y = currentRow * this.blockSize + this.renderRegion.y + (this.spacing * currentRow);
    this.brush.fillStyle = this.level.palette.numberColor.toString();
    this.brush.fillRect(x, y, this.blockSize, this.blockSize);
    this.brush.fillStyle = this.numberColor;
    this.brush.fillText('' + this.level.puzzle.number, x + this.blockSize / 2, y + this.blockSize / 2);
};

LevelView.onDraw = function(levelViewController) {};

LevelView.prototype.draw = function() {
    this.resetFont();
    this.drawNumber();
    this.drawBoard();
    this.onDraw(this);
};

LevelView.prototype.redraw = function() {
    this.brush.clearRect(this.renderRegion.x, this.renderRegion.y - 1, this.renderRegion.width, this.renderRegion.height + 1);
    this.draw();
};
