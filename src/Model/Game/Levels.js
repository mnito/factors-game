function Levels (prng, theme) {
  this.prng = prng;
  this.theme = theme;
}

Levels.prototype.get = function (level) {
  if (typeof this.prng.seed === 'function') {
    this.prng.seed(level);
    this.prng.random();
    this.prng.random();
    this.prng.random();
  }

  var levelPalette = this.theme.getLevelPalette(level);

  var board = Board.create(4, 4, this.prng);
  board.shuffle();

  var puzzle = new Puzzle(level, board);

  return new Level(puzzle, levelPalette);
};
