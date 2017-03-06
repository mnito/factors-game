function LevelCompleteAnimation( viewController, completeCallback ) {
    this.canvas = viewController.canvas;
    this.brush = viewController.brush;
    this.history = viewController.level.puzzle.history;
    this.spacing = viewController.spacing;
    this.leftMargin = viewController.leftMargin;
    var offset = viewController.offset + viewController.blockSize + viewController.spacing;
    this.y = this.history.length * viewController.blockSize + offset + (viewController.spacing * this.history.length);
    this.puzzle = viewController.level.puzzle;
    this.numberColor = viewController.numberColor;
    this.blockColor = viewController.level.palette.numberColor.toString();
    this.size = viewController.blockSize;
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
        brush.fillStyle = this.numberColor;
        brush.fillText('' + number, this.x + this.size / 2, this.y + this.size / 2);
    }
    if(this.size > this.canvas.width && this.size > this.canvas.height) {
        if(typeof this.completeCallback !== 'undefined' ) {
            this.completeCallback();
        }
        return;
    }
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
