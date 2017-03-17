function TutorialState(game) {
    this.game = game;
    this.playingState = new PlayingState(game);
    var renderRegion = new RenderRegion(null, game.canvas.height * .005, null, game.canvas.height * .10);
    var tutorial = new TutorialRenderer(game.brush, renderRegion, game.config.textColor, game.config.textBackground);
    this.tutorial = tutorial;
    var afterInput = this.playingState.levelKeyboardInputMethod.afterInput;
    //draw tutorial content after level view is drawn
    var tutorialAfterInput = function() {
        afterInput();
        tutorial.draw();
    };
    this.playingState.levelKeyboardInputMethod.afterInput = tutorialAfterInput;
    this.playingState.levelTouchInputMethod.afterInput = tutorialAfterInput;
}

TutorialState.prototype.onEnter = function(context) {
    if(!context) {
        context = {};
    }
    context.level = this.tutorial.level = this.game.levels.get(1);
    this.playingState.onEnter(context);
    this.playingState.selectTransitionKeyboardInputMethod.detach();
    this.playingState.selectTransitionTouchInputMethod.detach();
    this.tutorial.renderRegion.x = this.playingState.statusBar.renderRegion.x;
    this.tutorial.renderRegion.width = this.playingState.statusBar.renderRegion.width;
    this.tutorial.draw();
    this.tutorial.initial = false;
};

TutorialState.prototype.onLeave = function() {
    return this.playingState.onLeave();
};
