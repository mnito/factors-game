function NightRainbowTheme () {
  this.paletteBuilder = new SingleColorPaletteBuilder(new HSL(180, 60, 29));
}

NightRainbowTheme.prototype.colors = [
  new HSL(0, 100, 84),
  new HSL(25, 100, 72),
  new HSL(55, 100, 43),
  new HSL(150, 100, 50),
  new HSL(200, 100, 70),
  new HSL(252, 100, 86),
  new HSL(290, 100, 82)
];

NightRainbowTheme.prototype.numberColor = '#202030';

NightRainbowTheme.prototype.defaultBackgroundColor = '#202030';

NightRainbowTheme.prototype.textColor = '#000000';

NightRainbowTheme.prototype.textBackground = '#FFFFFF';

NightRainbowTheme.prototype.sliderColor = '#FFFFFF';

NightRainbowTheme.prototype.changesDocumentTextColor = true;

NightRainbowTheme.prototype.getLevelPalette = function (level) {
  var numberColor = this.colors[(level - 1) % 7];
  var boardColors = this.paletteBuilder.build(16);
  return new LevelPalette(numberColor, boardColors);
};
