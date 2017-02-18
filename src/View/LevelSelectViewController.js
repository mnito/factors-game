function LevelSelectViewController( canvas, storageManager, numberColor, blockColor, blockY, rows, columns ) {
   this.canvas = canvas;
   this.brush = canvas.getContext('2d');
   this.storageManager = storageManager;
   this.numberColor = numberColor;
   this.blockColor = blockColor;
   var offset = canvas.height * .1;
   this.blockSize = Math.min(this.canvas.width / columns, (this.canvas.height - offset) / rows);
   this.blockY = blockY;
   this.brush.textAlign = 'center';
   this.brush.textBaseline = 'middle';
}

LevelSelectViewController.prototype.drawNumber = function(value, x) {
    this.brush.font = 'bold ' + this.blockSize * .5 + 'px Arial';
    this.brush.fillStyle = this.blockColor;
    this.brush.fillRect(x - this.blockSize / 2, this.blockY, this.blockSize, this.blockSize);
    this.brush.fillStyle = this.numberColor;
    this.brush.fillText('' + value, x, this.blockY + this.blockSize / 2);
};

LevelSelectViewController.prototype.drawLevelResults = function(value) {
    var results = this.storageManager.getLevelResult(value);
    var number = results.endNumber;
    if( number === 1 ) {
        result = 'ACE!'
    }else {
        result = number < 10 ? 'LOW!' : 'High';
    }
    result += ' (' + number + ')';
    this.brush.font = 'bold ' + Math.min(canvas.width * .25, 100) + 'px Arial';
    this.brush.fillText(result, canvas.width / 2, canvas.height * .15);
    this.brush.font = Math.min(canvas.width * .1, 40) + 'px Arial';
    //this.brush.fillText('Lowest End Number: ' + results.endNumber, canvas.width / 2, canvas.height * .2);
};

LevelSelectViewController.prototype.draw = function(value, x) {
    this.brush.clearRect(0, 0, canvas.width, canvas.height);
    this.drawNumber(value, x);
    this.drawLevelResults(value);
};
