function LevelSelectViewController( canvas, storageManager, numberColor, blockColor, blockY, rows, columns, prng, monochromaticPaletteBuilder ) {
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
   this.prng = prng;
   this.monochromaticPaletteBuilder = monochromaticPaletteBuilder;
}

LevelSelectViewController.prototype.drawNumber = function(value, x, y, end) {
    this.brush.font = 'bold ' + this.blockSize * .5 + 'px sans-serif';
    this.brush.fillRect(x - this.blockSize / 2, this.blockY, this.blockSize, this.blockSize);
    this.brush.fillStyle = this.numberColor;
    if(value < 1) {
        value = '?';
    }
    this.brush.fillText('' + value, x, this.blockY + this.blockSize / 2);
};

LevelSelectViewController.prototype.drawLevelResults = function(value) {
    if(value < 1) {
        this.drawDefaultView();
        return;
    }
    var results = this.storageManager.getLevelResult(value);
    if(!results) {
        this.drawUnplayedLevelView(value);
        return;
    }
    var number = results.endNumber;
    if( number === 1 ) {
        result = 'ACE!'
    } else {
        result = number < 10 ? 'LOW!' : 'High';
    }
    result += ' (' + number + ')';
    this.brush.fillText('Level ' + value, canvas.width/2, canvas.height * .10);
    this.brush.font = 'bold ' + Math.min(canvas.width * .25, 100) + 'px Arial';
    this.brush.fillText(result, canvas.width/2, canvas.height * .30);
    this.brush.font = Math.min(canvas.width * .1, 40) + 'px Arial';
};

LevelSelectViewController.prototype.drawDefaultView = function() {
    this.brush.font = 'bold ' + this.blockSize * .5 + 'px Arial';
    this.brush.fillText('Select a Level', canvas.width/2, canvas.height * .10);
};

LevelSelectViewController.prototype.drawUnplayedLevelView = function(value) {
    this.brush.fillText('Level ' + value, canvas.width/2, canvas.height * .10);
};

LevelSelectViewController.prototype.draw = function(value, x, y, end) {
    var blockColor = '#000000';
    if(end) {
        if( typeof this.prng.seed === 'function') {
            this.prng.seed(value);
        }
        var hue = Math.floor(this.prng.random() * 360);
        var saturation = Math.floor(this.prng.random() * 20) + 80;
        this.monochromaticPaletteBuilder.hue = hue;
        this.monochromaticPaletteBuilder.saturation = saturation;
        blockColor = this.monochromaticPaletteBuilder.getColor(8, 16, 80).toString();
    }
    this.brush.clearRect(0, 0, canvas.width, canvas.height);
    this.brush.fillStyle = blockColor;
    this.drawLevelResults(value);
    this.drawNumber(value, x, y, end);
};
