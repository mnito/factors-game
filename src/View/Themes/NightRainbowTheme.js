function NightRainbowTheme () {
  this.paletteBuilder = new SingleColorPaletteBuilder(new HSL(180, 60, 30));
}

NightRainbowTheme.prototype.colors = [
  new HSL(0, 100, 77),
  new HSL(25, 100, 64),
  new HSL(57, 100, 37),
  new HSL(150, 100, 43),
  new HSL(200, 100, 60),
  new HSL(252, 100, 80),
  new HSL(290, 100, 77)
];

NightRainbowTheme.prototype.numberColor = '#202030';

NightRainbowTheme.prototype.defaultBackgroundColor = '#202030';

NightRainbowTheme.prototype.textColor = '#FFFFFF';

NightRainbowTheme.prototype.textBackground = '#202030';

NightRainbowTheme.prototype.sliderColor = '#FFFFFF';

NightRainbowTheme.prototype.changesDocumentTextColor = true;

NightRainbowTheme.prototype.defaultGray = '#969696';

NightRainbowTheme.prototype.getLevelPalette = function (level) {
  var numberColor = this.colors[(level - 1) % 7];
  var boardColors = this.paletteBuilder.build(16);
  return new LevelPalette(numberColor, boardColors);
};
