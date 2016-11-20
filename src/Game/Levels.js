function Levels( prng, constant, paletteRange, paletteBuilder, puzzleGenerator ) {
    this.prng = prng;
    this.constant = constant;
    this.paletteRange = paletteRange;
    this.paletteBuilder = paletteBuilder;
    this.puzzleBuilder = puzzleBuilder;
    this.puzzleBuilder.prng = prng;
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
   var numberColor = HSL.complement(palette[Math.floor(this.prng.random() * 16)]);
   
   var levelPalette = new LevelPalette( numberColor, boardColors );
   var puzzle = this.puzzleGenerator.generate();
   
   return new Level( puzzle, levelPalette );
};
