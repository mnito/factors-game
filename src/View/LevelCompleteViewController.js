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
    this.brush.font = 'bold ' + Math.min(canvas.width * .25, 100) + 'px Arial';
    this.brush.fillText(result, canvas.width / 2, canvas.height * .15);
};

LevelCompleteViewController.prototype.drawScore = function() {
    var total, sixteenTotal;
    total = sixteenTotal = "\u221E";
    var levelNumber = this.level.puzzle.original;
    var lowerBound = Math.max(levelNumber - 15, 1);
    var upperBound = levelNumber;
    try {

        total = score.average();
        sixteenTotal = score.averageFrom(lowerBound, upperBound);
    }
    catch(e){ }
    this.brush.font = Math.min(canvas.width * .1, 40) + 'px Arial';
    this.brush.fillText('AVG: ' + total, canvas.width / 2, canvas.height * .4);
    this.brush.fillText('AVG[' + lowerBound + '-' + upperBound + ']: ' + sixteenTotal, canvas.width / 2, canvas.height * .5);
};

LevelCompleteViewController.prototype.drawControlLabels = function() {
    this.brush.font = 'bold '+ Math.min(canvas.width * .1, 40) + 'px Arial';
    this.brush.fillText('NEXT >', canvas.width / 2, canvas.height * .65);
    this.brush.fillText('< RETRY', canvas.width / 2, canvas.height * .75)
};

LevelCompleteViewController.prototype.draw = function() {
    this.drawResult();
    this.drawScore();
    this.drawControlLabels();
};
