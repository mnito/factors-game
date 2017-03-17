function Level (puzzle, palette) {
  this.puzzle = puzzle;
  this.palette = palette;
  this.index = Math.floor(puzzle.board.columns / 2);
}

Level.prototype.getNumber = function () {
  return this.puzzle.original;
};
