function Levels(prng, constant, paletteRange, paletteBuilder) {
    this.prng = prng;
    this.constant = constant;
    this.paletteRange = paletteRange;
    this.paletteBuilder = paletteBuilder;
}

Levels.prototype.get = function(level) {
   if( typeof this.prng.seed === 'function') {
       this.prng.seed(level + this.constant);
   }
   var hue = Math.floor(this.prng.random() * 360);
   var saturation = Math.floor(this.prng.random() * 50) + 50;
   this.paletteBuilder.hue = hue;
   this.paletteBuilder.saturation = saturation;

   var boardColors = this.paletteBuilder.build(16, this.paletteRange);
   var numberColor = HSL.complement(boardColors[Math.floor(this.prng.random() * 16)]);
   
   var levelPalette = new LevelPalette(numberColor, boardColors);

   var board = Board.create(4, 4, this.prng);
   board.shuffle();
   
   var puzzle = new Puzzle(level, board);
   
   return new Level(puzzle, levelPalette);
};
