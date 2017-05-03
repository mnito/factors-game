function TutorialState (game) {
  this.game = game;
  this.playingState = new PlayingState(game);
  var renderRegion = new RenderRegion(null, game.canvas.height * 0.005, null, game.canvas.height * 0.10);
  var tutorial = new TutorialRenderer(game.brush, renderRegion, game.config.theme.textColor, game.config.theme.textBackground);
  this.tutorial = tutorial;
  var afterInput = this.playingState.levelController.afterInput;
  // Draw tutorial content after level view is drawn
  var tutorialAfterInput = function () {
    afterInput();
    tutorial.draw();
  };
  this.playingState.levelController.afterInput = tutorialAfterInput;
  this.playingState.levelController.onInitialStateUp = null;
}

TutorialState.prototype.onEnter = function (context) {
  if (!context) {
    context = {};
  }
  context.level = this.tutorial.level = this.game.levels.get(1);
  this.playingState.onEnter(context);
  this.playingState.selectTransitionTapInputMethod.detach();
  this.tutorial.renderRegion.x = this.playingState.statusBar.renderRegion.x;
  this.tutorial.renderRegion.width = this.playingState.statusBar.renderRegion.width;
  this.tutorial.draw();
  this.tutorial.initial = false;
};

TutorialState.prototype.onLeave = function () {
  return this.playingState.onLeave();
};
