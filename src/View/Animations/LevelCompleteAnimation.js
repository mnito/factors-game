function LevelCompleteAnimation( brush, renderRegion, level, levelView, statusBar, onComplete) {
    this.brush = brush;
    this.renderRegion = renderRegion;
    this.level = level;
    this.levelView = levelView;
    //keep status bar in animation
    this.statusBar = statusBar;
    this.onComplete = onComplete;
}

LevelCompleteAnimation.prototype.frame = function() {
    var brush = this.brush;
    var number = this.level.puzzle.number;

    //move block to bottom
    if(this.y < this.renderRegion.height - this.blockSize) {
        this.y += 30;
    //lock block to bottom
    } else if(this.y !== this.renderRegion.height - this.blockSize) {
        this.y = this.renderRegion.height - this.blockSize;
    //expand block
    } else if(this.x < 0) {
        this.blockSize += 30;
        this.y -= 30;
    //move block over
    } else {
        //quickness is somewhat based on width
        this.x -= 13 + (this.renderRegion.width * .005);
    }
    brush.fillStyle = this.blockColor;
    brush.clearRect(0, 0, this.renderRegion.width, this.renderRegion.height);
    brush.fillRect(this.x, this.y, this.blockSize, this.blockSize);
    if(this.x >= 0) {
        this.resetFont();
        brush.fillStyle = this.numberColor;
        brush.fillText('' + number, this.x + this.blockSize / 2, this.y + this.blockSize / 2);
    }
    if(this.blockSize > this.renderRegion.width && this.blockSize > this.renderRegion.height) {
        if(typeof this.onComplete !== 'undefined' ) {
            this.onComplete();
        }
        return;
    }
    if(this.statusBar && typeof this.statusBar.draw === 'function') {
        this.statusBar.draw();
    }
    var instance = this;
    window.requestAnimationFrame(function() {
        instance.frame();
    });
};

LevelCompleteAnimation.prototype.run = function(onComplete) {
    if(typeof onComplete !== 'undefined') {
        this.onComplete = onComplete;
    }
    var lastIndex = this.level.puzzle.history.slice(-1)[0];
    this.x = lastIndex * this.levelView.blockSize + (this.levelView.spacing * lastIndex) + this.levelView.leftMargin;
    var offset = this.levelView.renderRegion.y + this.levelView.blockSize + this.levelView.spacing;
    this.y = this.level.puzzle.history.length * this.levelView.blockSize + offset + (this.levelView.spacing * this.level.puzzle.history.length);
    this.blockSize = this.levelView.blockSize;
    this.blockColor = this.level.palette.numberColor.toString();
    this.numberColor = this.levelView.numberColor;
    this.resetFont = this.levelView.resetFont;
    var instance = this;
    setTimeout(function() { instance.frame(); }, 500);
};
