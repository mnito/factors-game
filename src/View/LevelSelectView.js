function LevelSelectView (brush, renderRegion, storageManager, theme, blockSize, xPad) {
  this.brush = brush;
  this.renderRegion = renderRegion;
  this.storageManager = storageManager;
  this.theme = theme;
  this.sliderY = this.renderRegion.height * .5
  this.blockSize = blockSize;
  this.xPad = xPad || 0;
}

LevelSelectView.prototype.drawLevelResults = function (value) {
  var results = this.storageManager.getLevelResult(value);
  if (!results) {
    return;
  }

  var number = results.endNumber;
  if (number === 1) {
    result = 'ACE!';
  } else {
    result = number < 10 ? 'LOW!' : 'High';
  }

  this.brush.fillStyle = this.theme.sliderColor;
  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px sans-serif';
  this.brush.fillText(result, this.renderRegion.width / 2, this.renderRegion.height * 0.40);

  this.brush.font = 'bold ' + this.blockSize * 0.25 + 'px sans-serif';
  this.brush.fillText('End Number: ' + number, this.renderRegion.width / 2, this.renderRegion.height * .6);
  if(number === 1) {
      this.brush.fillText('Moves: ' + results.path.length, this.renderRegion.width / 2, this.renderRegion.height * .6675);
  }
};

LevelSelectView.prototype.drawNumber = function (value, blockColor) {
  this.brush.fillStyle = blockColor;
  this.brush.fillRect((this.renderRegion.width / 2) - (this.blockSize / 2), this.renderRegion.height * .15, this.blockSize, this.blockSize);

  if (value < 1) {
    value = '?';
  }

  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px sans-serif';
  this.brush.fillStyle = this.theme.numberColor;
  this.brush.fillText('' + value, this.renderRegion.width / 2, (this.renderRegion.height * .15) + (this.blockSize / 2));
};

LevelSelectView.prototype.drawSlider = function (value, x, y, color) {
  var radius = this.blockSize / 6;
  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px sans-serif';
  this.brush.strokeStyle = color;
  this.brush.lineWidth = 5;

  this.brush.beginPath();
  this.brush.moveTo(this.xPad - radius * 2, this.sliderY);
  this.brush.lineTo(this.renderRegion.width - this.xPad + radius * 2, this.sliderY);
  this.brush.stroke();
  this.brush.closePath();

  this.brush.beginPath();
  this.brush.arc(x, this.sliderY, radius, 2 * Math.PI, false);
  this.brush.stroke();
  this.brush.closePath();

  this.drawSliderTapControls(color);
};

LevelSelectView.prototype.drawSliderTapControls = function (color) {
  this.brush.fillStyle = color;
  this.brush.strokeStyle = color;
  this.brush.lineWidth = 10;

  var xPos = this.xPad / 2;
  var xSize = this.blockSize / 3;
  var yPos = this.sliderY;
  var ySize = this.blockSize / 1.5;

  this.brush.beginPath();
  this.brush.moveTo(this.renderRegion.width - xPos, yPos + ySize);
  this.brush.lineTo(this.renderRegion.width - xPos + xSize, yPos);
  this.brush.lineTo(this.renderRegion.width - xPos, yPos - ySize);
  this.brush.lineTo(this.renderRegion.width - xPos, yPos + ySize);
  this.brush.fill();
  this.brush.closePath();

  this.brush.beginPath();
  this.brush.moveTo(xPos, yPos + ySize);
  this.brush.lineTo(xPos - xSize, yPos);
  this.brush.lineTo(xPos, yPos - ySize);
  this.brush.lineTo(xPos, yPos + ySize);
  this.brush.fill();
  this.brush.closePath();
};

LevelSelectView.prototype.drawButton = function (color) {
  this.brush.fillStyle = color;
  this.brush.fillRect(this.xPad, this.renderRegion.height * .75, this.renderRegion.width - this.xPad * 2, this.renderRegion.height * .15);
  this.brush.font = 'bold ' + this.blockSize * 0.5 + 'px sans-serif';
  this.brush.fillStyle = this.theme.numberColor;
  this.brush.fillText('Play', this.renderRegion.width / 2, this.renderRegion.height * .75 + this.renderRegion.height * .075);
};

LevelSelectView.prototype.getButtonBoundingBox = function() {
    return new BoundingBox(this.xPad / 2, this.renderRegion.height * .75, this.renderRegion.width - this.xPad, this.renderRegion.height * .15);
};

LevelSelectView.prototype.getSliderTapBoundingBoxes = function() {
  var ySize = this.blockSize / 1.5;
  var ySizeDoubled = ySize * 2;
  var topY = this.sliderY - ySize;
  var additionalPadding = this.blockSize / 2;

  return {
    previous: new BoundingBox(0, topY, this.xPad - additionalPadding, ySizeDoubled),
    next: new BoundingBox(this.renderRegion.width - this.xPad + additionalPadding, topY, this.xPad - additionalPadding, ySizeDoubled)
  };
};

LevelSelectView.prototype.draw = function (value, x, y, end) {
  this.brush.textAlign = 'center';
  this.brush.textBaseline = 'middle';

  var blockColor = this.theme.defaultGray || '#808080';

  if (end && value > 0) {
    blockColor = this.theme.getLevelPalette(value).numberColor.toString();
  }

  this.brush.font = 'bold ' + this.blockSize * 0.25 + 'px sans-serif';
  this.brush.fillStyle = this.theme.sliderColor;
  this.brush.fillText('LEVEL', this.renderRegion.width / 2, this.renderRegion.height * 0.10);
  this.drawNumber(value, blockColor);
  this.drawLevelResults(value);
  this.drawSlider(value, x, y, this.theme.sliderColor);
  this.drawButton(blockColor);
};

LevelSelectView.prototype.redraw = function (value, x, y, end) {
  this.brush.clearRect(0, 0, this.renderRegion.width, this.renderRegion.height);
  this.draw(value, x, y, end);
};
