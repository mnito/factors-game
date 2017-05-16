function ClassicTheme (paletteRange) {
  this.paletteRange = paletteRange || 70;
  this.prng = new XSPRNG(1);
  this.paletteBuilder = new MonochromaticPaletteBuilder(null, null, 0.8);
}

ClassicTheme.prototype.numberColor = '#FFFFFF';

ClassicTheme.prototype.defaultBackgroundColor = '#D3D3D3';

ClassicTheme.prototype.textColor = '#000000';

ClassicTheme.prototype.textBackground = '#FFFFFF';

ClassicTheme.prototype.sliderColor = '#FFFFFF';

ClassicTheme.prototype.changesDocumentTextColor = false;

ClassicTheme.prototype.defaultGray = '#808080';

ClassicTheme.prototype.getLevelPalette = function (level) {
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

  return new LevelPalette(numberColor, boardColors, backgroundColor);
};
