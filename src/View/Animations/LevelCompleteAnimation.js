function LevelCompleteAnimation( levelView, statusBar, canvas, completeCallback ) {
    this.canvas = canvas;
    this.brush = levelView.brush;
    this.history = levelView.level.puzzle.history;
    this.spacing = levelView.spacing;
    this.leftMargin = levelView.leftMargin;
    var offset = levelView.offset + levelView.blockSize + levelView.spacing;
    this.y = this.history.length * levelView.blockSize + offset + (levelView.spacing * this.history.length);
    this.puzzle = levelView.level.puzzle;
    this.numberColor = levelView.numberColor;
    this.blockColor = levelView.level.palette.numberColor.toString();
    this.size = levelView.blockSize;
    this.statusBar = statusBar;
    this.levelView = levelView;
    this.completeCallback = completeCallback;
}

LevelCompleteAnimation.prototype.frame = function() {
    var brush = this.brush;
    var number = this.puzzle.number;
    if(this.y < this.canvas.height - this.size) {
        this.y += 30;
    } else if( this.y !== this.canvas.height - this.size) {
        this.y = this.canvas.height - this.size;
    } else if(this.x < 0) {
        this.size += 30;
        this.y -= 30;
    } else {
        this.x -= 13 + (this.canvas.width * .005);
    }
    brush.fillStyle = this.blockColor;
    brush.clearRect(0, 0, this.canvas.width, this.canvas.height);
    brush.fillRect(this.x, this.y, this.size, this.size);
    if(this.x >= 0) {
        this.levelView.resetFont();
        brush.fillStyle = this.numberColor;
        brush.fillText('' + number, this.x + this.size / 2, this.y + this.size / 2);
    }
    if(this.size > this.canvas.width && this.size > this.canvas.height) {
        if(typeof this.completeCallback !== 'undefined' ) {
            this.completeCallback();
        }
        return;
    }
    this.statusBar.draw();
    var instance = this;
    window.requestAnimationFrame(function() {
        instance.frame();
    });
};

LevelCompleteAnimation.prototype.run = function() {
    var lastIndex = this.history.slice(-1)[0];
    this.x = lastIndex * this.size + (this.spacing * lastIndex) + this.leftMargin;
    var instance = this;
    setTimeout(function() { instance.frame(); }, 500);
};
