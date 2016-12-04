function ViewController( level, canvas, spacing, numberColor ) {
   this.level = level;
   this.canvas = canvas;
   this.spacing = spacing;
   this.numberColor = numberColor;
   
   this.offset = canvas.height * .1;
   this.determineBlockSize();
   this.determineLeftMargin();

   var brush = canvas.getContext('2d');
   brush.font = 'bold ' + this.blockSize * .5 + 'px Arial';
   brush.textAlign = 'center';
   brush.textBaseline = 'middle';
   this.brush = brush;
}

ViewController.prototype.determineBlockSize = function() {
    var columns = this.level.puzzle.board.columns;
    var rows = this.level.puzzle.board.rows + 1;
    var maxWidth = this.canvas.width / columns; 
    var maxHeight = (this.canvas.height - this.offset) / rows;
    this.blockSize = Math.min(maxWidth, maxHeight) - this.spacing;
};

ViewController.prototype.determineLeftMargin = function() {
    var columns = this.level.puzzle.board.columns;
    this.leftMargin = (this.canvas.width - ((this.blockSize * columns) + (this.spacing * (columns - 1)))) / 2;
};

ViewController.prototype.drawBoard = function() {
   var blockIndex = this.level.puzzle.currentRow * this.level.puzzle.board.columns;
   var x = 0;
   var y = 0;
   var offset = this.offset + this.blockSize + this.spacing;
   for( var i = 0; i < this.level.puzzle.board.columns; i += 1) {
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

ViewController.prototype.drawNumber = function() {
    var lastIndex = this.level.puzzle.history.slice(-1)[0];
    if( typeof lastIndex === 'undefined' ) {
        lastIndex = 1;
    }
    var currentRow = this.level.puzzle.currentRow;
    var x = lastIndex * this.blockSize + ( this.spacing * lastIndex ) + this.leftMargin;
    var y = currentRow * this.blockSize + this.offset + (this.spacing * currentRow);
    this.brush.fillStyle = this.level.palette.numberColor.toString();
    this.brush.fillRect(x, y, this.blockSize, this.blockSize);
    this.brush.fillStyle = this.numberColor;
    this.brush.fillText('' + this.level.puzzle.number, x + this.blockSize / 2, y + this.blockSize / 2);
};
