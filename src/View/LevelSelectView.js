function LevelSelectView (brush, renderRegion, storageManager, prng, monochromaticPaletteBuilder, numberColor, blockY, blockSize) {
  this.brush = brush;
  this.renderRegion = renderRegion;
  this.storageManager = storageManager;
  this.prng = prng;
  this.monochromaticPaletteBuilder = monochromaticPaletteBuilder;
  this.numberColor = numberColor;
  this.blockY = blockY;
  this.blockSize = blockSize;
}

LevelSelectView.prototype.drawNumber = function (value, x, y, end) {
  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px sans-serif';
  this.brush.fillRect(x - this.blockSize / 2, this.blockY, this.blockSize, this.blockSize);
  this.brush.fillStyle = this.numberColor;
  if (value < 1) {
    value = '?';
  }
  this.brush.fillText('' + value, x, this.blockY + this.blockSize / 2);
};

LevelSelectView.prototype.drawLevelResults = function (value) {
  if (value < 1) {
    this.drawDefaultView();
    return;
  }
  var results = this.storageManager.getLevelResult(value);
  if (!results) {
    this.drawUnplayedLevelView(value);
    return;
  }
  var number = results.endNumber;
  if (number === 1) {
    result = 'ACE!';
  } else {
    result = number < 10 ? 'LOW!' : 'High';
  }
  result += ' (' + number + ')';
  this.brush.fillText('Level ' + value, this.renderRegion.width / 2, this.renderRegion.height * 0.10);
  this.brush.font = 'bold ' + Math.min(this.renderRegion.width * 0.25, 100) + 'px Arial';
  this.brush.fillText(result, this.renderRegion.width / 2, this.renderRegion.height * 0.30);
  this.brush.font = Math.min(this.renderRegion.width * 0.1, 40) + 'px Arial';
};

LevelSelectView.prototype.drawDefaultView = function () {
  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px Arial';
  this.brush.fillText('Select a Level', this.renderRegion.width / 2, this.renderRegion.height * 0.10);
};

LevelSelectView.prototype.drawUnplayedLevelView = function (value) {
  this.brush.fillText('Level ' + value, this.renderRegion.width / 2, this.renderRegion.height * 0.10);
};

LevelSelectView.prototype.draw = function (value, x, y, end) {
  this.brush.textAlign = 'center';
  this.brush.textBaseline = 'middle';
  var blockColor = '#000000';
  if (end) {
    if (typeof this.prng.seed === 'function') {
      this.prng.seed(value);
    }
    var hue = Math.floor(this.prng.random() * 360);
    var saturation = Math.floor(this.prng.random() * 20) + 80;
    this.monochromaticPaletteBuilder.hue = hue;
    this.monochromaticPaletteBuilder.saturation = saturation;
    boardColors = this.monochromaticPaletteBuilder.build(16, 70);
    blockColor = HSL.complement(boardColors[Math.floor(this.prng.random() * 16)]).toString();
  }
  this.brush.fillStyle = blockColor;
  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px Arial';
  this.drawLevelResults(value);
  this.drawNumber(value, x, y, end);
};

LevelSelectView.prototype.redraw = function (value, x, y, end) {
  this.brush.clearRect(0, 0, this.renderRegion.width, this.renderRegion.height);
  this.draw(value, x, y, end);
};
