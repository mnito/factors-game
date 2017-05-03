function ClassicTheme (paletteRange) {
  this.paletteRange = paletteRange;
  this.paletteBuilder = new MonochromaticPaletteBuilder(null, null, 0.8);
}

ClassicTheme.prototype.numberColor = '#FFFFFF';

ClassicTheme.prototype.defaultBackgroundColor = '#D3D3D3';

ClassicTheme.prototype.textColor = '#000000';

ClassicTheme.prototype.textBackground = '#FFFFFF';

ClassicTheme.prototype.level = null;

ClassicTheme.prototype.randomInput = [];

ClassicTheme.prototype.getLevelPalette = function (level) {
  if(this.randomInput.length < 2) {
    throw "Classic theme requires at least 3 random inputs.";
  }

  var hue = Math.floor(this.randomInput[0] * 360);
  var saturation = Math.floor(this.randomInput[1] * 20) + 80;

  this.paletteBuilder.hue = hue;
  this.paletteBuilder.saturation = saturation;

  var boardColors = this.paletteBuilder.build(16, this.paletteRange);
  var numberColor = HSL.complement(boardColors[Math.floor(this.randomInput[2] * 16)]);
  var backgroundColor = numberColor.clone();
  backgroundColor.l = Math.floor(numberColor.l + 45) % 101;
  backgroundColor.a = 1;

  return new LevelPalette(numberColor, boardColors, backgroundColor);
};
