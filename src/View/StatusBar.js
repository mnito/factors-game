function StatusBar (brush, renderRegion, fontSize, score, level) {
  this.brush = brush;
  this.fontSize = fontSize;
  this.renderRegion = renderRegion;
  this.score = score;
  this.level = level;
}

StatusBar.prototype.draw = function () {
  this.brush.font = this.fontSize + 'px sans-serif';
  this.brush.textAlign = 'left';
  this.brush.textBaseline = 'top';
  this.brush.fillStyle = this.level.palette.numberColor.toString();
  var levelStr = 'level ' + this.level.getNumber();
  if (this.score) {
    try {
      levelStr += ' | avg: ' + this.score.average().toFixed(4);
    } catch (e) {
      //
    }
  }
  this.brush.fillText(levelStr, this.renderRegion.x, this.renderRegion.y);
  this.brush.textAlign = 'right';
  this.brush.fillText('[select]', this.renderRegion.x + this.renderRegion.width, this.renderRegion.y);
};

StatusBar.prototype.redraw = function () {
  this.brush.clearRect(this.renderRegion.x, this.renderRegion.y, this.renderRegion.width, this.renderRegion.height);
  this.draw();
};
