function TutorialViewController(levelViewController) {
    this.levelViewController = levelViewController;
    this.canvas = levelViewController.canvas;
    this.brush = levelViewController.canvas.getContext('2d');
}

TutorialViewController.prototype.resetFont = function() {
    this.brush.font = this.canvas.width * .03 + 'px Arial';
    this.brush.textAlign = 'center';
    this.brush.textBaseline = 'middle'
    this.brush.fillStyle = 'white';
};

TutorialViewController.prototype.draw = function() {
    this.resetFont();
    var brush = this.brush;
    var blockHasMoved = (typeof this.liveIndex) !== 'undefined';
    if(!this.blockHasMoved()) {
        brush.fillText('Swipe or type left or right.', this.canvas.width / 2, this.canvas.height * .05);
    } else if(!this.firstMoveMade()) {
        brush.fillText('Swipe or type down to make a move.', this.canvas.width / 2, this.canvas.height * .05);
    } else {
        brush.fillText('1 is not divisible by your choice.', this.canvas.width / 2, this.canvas.height * .05);
        brush.fillText('Only factors of your current number will cause division.', this.canvas.width / 2, this.canvas.height * .1);
        brush.fillText('All other numbers will cause addition.', this.canvas.width / 2, this.canvas.height * .15);
        brush.fillText('Use this to your advantage.', this.canvas.width / 2, this.canvas.height * .2);
        brush.fillText('Your goal is to get to 1 or close. Happy factoring!', this.canvas.width / 2, this.canvas.height * .25);
    }
};

TutorialViewController.prototype.blockHasMoved = function() {
    return (typeof this.levelViewController.liveIndex) !== 'undefined';
};

TutorialViewController.prototype.firstMoveMade = function() {
    return (typeof this.levelViewController.level.puzzle.history.slice(-1)[0]) !== 'undefined';
};
