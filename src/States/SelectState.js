function SelectState (game) {
  this.game = game;

  var selectView = new LevelSelectView(game.brush, new RenderRegion(0, 0, game.canvas.width, game.canvas.height), game.storageManager, game.config.theme);
  this.selectView = selectView;

  var sliderInput = new SliderInput(game.canvas, function (value, x, y, end) {
    selectView.redraw(value, x, y, end);
  });
  this.sliderInput = sliderInput;

  var tryTransition = function() {
      var value = sliderInput.value;
      if (game.levelIsAvailable(value)) {
        game.transition('PLAYING');
      }
  };
  this.sliderInput.onSelect = tryTransition;
  this.playButtonInput = new TapInput(game.canvas, [new TapRegion(null, tryTransition)]);
}

SelectState.prototype.onEnter = function (context) {
  this.game.brush.clearAll();
  this.game.canvas.style.removeProperty('background-color');
  this.selectView.blockSize = context.levelView.blockSize;
  this.selectView.xPad = context.levelView.leftMargin / 2 + (context.levelView.blockSize / 2);

  this.sliderInput.min = 0;
  this.sliderInput.max = Math.min(this.game.score.totalLevelsPlayed() + 1, this.game.config.levelLimit);
  this.sliderInput.xPad = this.selectView.xPad;
  this.sliderInput.yMin = this.selectView.sliderY - this.selectView.blockSize;
  this.sliderInput.yMax = this.selectView.sliderY + this.selectView.blockSize;
  this.sliderInput.triggerInitial(context.level.getNumber() || 0);
  this.sliderInput.listen();

  this.playButtonInput.tapRegions[0].boundingBox = this.selectView.getButtonBoundingBox();
  this.playButtonInput.listen();
};

SelectState.prototype.onLeave = function () {
  this.sliderInput.detach();
  this.playButtonInput.detach();

  return { level: this.game.levels.get(this.sliderInput.value) };
};
