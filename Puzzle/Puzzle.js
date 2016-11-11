/*** Start puzzle code ***/

function Puzzle(number, board) {
   this.number = number;
   this.original = number;
   this.board = board.get();
   this.currentRow = 0;
}

Puzzle.prototype.play = function( number ) {
    this.assertOngoing();
    var index  = this.board[this.currentRow].indexOf(number);
    if ( index < 0 ) {
       throw "Number is not currently an option.";
    }
    return this.playIndex( index );
};

Puzzle.prototype.playIndex = function( index, validated ) {
    this.assertOngoing();
    if( ! index in this.board[this.currentRow] ) {
       throw "Index not available for play.";
    }
    var number = this.board[this.currentRow][index];
    if (this.number % number === 0) {
       this.number /= number;
    } else {
       this.number += number;
    }
    this.currentRow += 1;
    return this.state();
};

Puzzle.prototype.state = function() {
    if( this.currentRow !== 0 && this.number === 1 ) {
        return 'ace';
    } else if( this.currentRow >= this.board.length ) {
        return 'done';
    } else {
        return 'ongoing';
    }
};

Puzzle.prototype.isComplete = function() {
    var state = this.state();
    return state === 'ace' || state === 'done';
};

Puzzle.prototype.assertOngoing = function() {
    if( this.isComplete() ) {
        throw "Puzzle is complete";
    }
};
