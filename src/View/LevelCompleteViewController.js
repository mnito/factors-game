function LevelCompleteViewController( canvas, level, score, textColor ) {
    this.canvas = canvas;
    this.brush = canvas.getContext('2d');
    this.level = level;
    this.score = score;
    this.textColor = textColor;
    this.brush.fillStyle = this.textColor;
}

LevelCompleteViewController.prototype.drawResult = function() {
    var puzzle = this.level.puzzle;
    var result = 'done';
    var state = puzzle.state();
    if( state === 'ace') {
        result = 'ACE!'
    }else if(state === 'done') {
        result = puzzle.number < 10 ? 'LOW!' : 'High';
    } else {
        throw "Puzzle is still ongoing. Level is not complete.";
    }
    var fontSizeFactor = .35;
    if(result === 'LOW!') {
        fontSizeFactor = .3;
    } else if( result === 'High') {
        fontSizeFactor = .25;
    }
    this.brush.font = 'bolder ' + Math.min(this.canvas.height, this.canvas.width) * fontSizeFactor + 'px sans-serif';
    this.brush.fillText(result, canvas.width / 2, canvas.height * .175);
};

LevelCompleteViewController.prototype.drawScore = function() {
    var total, sixteenTotal;
    total = sixteenTotal = "\u221E";
    var levelNumber = this.level.puzzle.original;
    var lowerBound = Math.max(levelNumber - 15, 1);
    var upperBound = levelNumber;
    try {
        total = this.score.average().toFixed(4);
        sixteenTotal = this.score.averageFrom(lowerBound, upperBound).toFixed(4);
    }
    catch(e){ }
    this.brush.font = Math.min(this.canvas.width, this.canvas.height) * .085 + 'px sans-serif';
    this.brush.fillText('AVG: ' + total, canvas.width / 2, canvas.height * .475);
    this.brush.fillText('AVG[' + lowerBound + '-' + upperBound + ']: ' + sixteenTotal, canvas.width / 2, canvas.height * .575);
};

LevelCompleteViewController.prototype.drawControlLabels = function() {
    this.brush.font = 'bold '+ Math.min(this.canvas.width, this.canvas.height) * .1 + 'px sans-serif';
    this.brush.fillText('< RETRY', canvas.width / 4, canvas.height * .875)
    this.brush.fillText('NEXT >', 3 * (canvas.width / 4), canvas.height * .875);
};

LevelCompleteViewController.prototype.draw = function() {
    this.drawResult();
    this.drawScore();
    this.drawControlLabels();
};
