function Levels (prng, paletteRange, paletteBuilder) {
  this.prng = prng;
  this.paletteRange = paletteRange;
  this.paletteBuilder = paletteBuilder;
}

Levels.prototype.get = function (level) {
  if (typeof this.prng.seed === 'function') {
    this.prng.seed(level);
  }
  var hue = Math.floor(this.prng.random() * 360);
  var saturation = Math.floor(this.prng.random() * 20) + 80;

  this.paletteBuilder.hue = hue;
  this.paletteBuilder.saturation = saturation;

  var boardColors = this.paletteBuilder.build(16, this.paletteRange);
  var numberColor = HSL.complement(boardColors[Math.floor(this.prng.random() * 16)]);
  var backgroundColor = numberColor.clone();
  backgroundColor.l = Math.floor(numberColor.l + 45) % 101;
  backgroundColor.a = 1;
  var levelPalette = new LevelPalette(numberColor, boardColors, backgroundColor);

  var board = Board.create(4, 4, this.prng);
  board.shuffle();

  var puzzle = new Puzzle(level, board);

  return new Level(puzzle, levelPalette);
};
