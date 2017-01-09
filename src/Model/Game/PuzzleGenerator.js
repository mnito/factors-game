function PuzzleGenerator(rows, columns, maxNumber) {
  this.rows = rows;
  this.columns =  columns;
  this.maxNumber = maxNumber;
}

PuzzleGenerator.generateWinningRun = function(steps, maxIntermediate) {
  var run = [];
  var currentNumber = 1;
  for(var i = steps; i > 0; i -= 1) {
    var randomIntermediate = Math.floor(Math.random() * maxIntermediate) + 1;
    run[i] = randomIntermediate;
    var subtract = currentNumber > randomIntermediate && currentNumber % randomIntermediate !== 0;
    if(subtract) {
      currentNumber -= randomIntermediate;
    } else {
      currentNumber *= randomIntermediate;
    }
  }
  run[0] = currentNumber;
  return run;
};

PuzzleGenerator.generatePuzzle = function(columns, winningRun, maxFiller) {
  var board = [];
  var rows = winningRun.length;
  for(var i = 1; i < rows; i += 1) {
      var randomPosition = Math.floor(Math.random() * columns);
      var row = [];
      for(var j = 0; j < columns; j += 1) {
        row[j] = Math.floor(Math.random() * maxFiller) + 1;
      }
      row[randomPosition] = winningRun[i];
      board.push(row);
  }
  return new Puzzle(winningRun[0], new Board(board));
};


PuzzleGenerator.prototype.getPuzzle = function() {
  var winningRun = PuzzleGenerator.generateWinningRun(this.rows, this.maxNumber);
  return PuzzleGenerator.generatePuzzle(this.columns, winningRun, this.maxNumber);
};
