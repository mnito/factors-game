function SelectState (game) {
  this.game = game;
  var selectView = new LevelSelectView(game.brush, new RenderRegion(0, 0, game.canvas.width, game.canvas.height), game.storageManager, new XSPRNG(1), new MonochromaticPaletteBuilder(), game.config.numberColor, game.canvas.height * 0.7);
  this.selectView = selectView;
  this.inputMethod = new SliderInput(game.canvas, function (value, x, y, end) {
    selectView.redraw(value, x, y, end);
  });
  this.inputMethod.onSelect = function (value) {
    if (value > 0) {
      game.transition('PLAYING');
    }
  };
}

SelectState.prototype.onEnter = function (context) {
  this.game.brush.clearAll();
  this.game.canvas.style.removeProperty('background-color');
  this.selectView.blockSize = context.levelView.blockSize || context.blockSize;
  this.inputMethod.min = 0;
  this.inputMethod.max = Math.min(this.game.score.totalLevelsPlayed() + 1, this.game.config.levelLimit);
  this.inputMethod.xPad = this.selectView.blockSize / 2;
  this.inputMethod.yMin = this.selectView.renderRegion.height * 0.7;
  this.inputMethod.yMax = this.selectView.renderRegion.height * 0.7 + this.selectView.blockSize;
  this.inputMethod.triggerInitial(context.level.getNumber() || 0);
  this.inputMethod.listen();
};

SelectState.prototype.onLeave = function () {
  this.inputMethod.detach();
  return { level: this.game.levels.get(this.inputMethod.value) };
};
