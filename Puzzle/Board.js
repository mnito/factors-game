/**
 * Board object
 */
function Board( board ) {
    this.board = board;
}

/**
 * Create new unshuffled board
 */
Board.create = function(rows, columns) {
    var initial = [];
    var c = 1;
    for(var i = 0; i < rows; i += 1) {
        var row = [];
        for(var j = 0; j < columns; j += 1) {
            row.push(c);
            c += 1;
        }
        initial.push(row);
    }
    return new Board( initial );
};

/**
 * Randomly shuffle board using PRNG

 * Uses modified Fisher-Yates/Durstenfeld algorithm
 */
Board.prototype.shuffle = function( prng ) {
    var index = 0;
    var temp = 0;
    for(var i = 0; i < this.board.length; i += 1) {
        for(var j = 0; j < this.board[i].length; j += 1) {
            var randomI= Math.floor(prng.next() * this.board.length);
            var randomJ = Math.floor(prng.next() * this.board[i].length);
            var temp = this.board[i][j];
            this.board[i][j] = this.board[randomI][randomJ];
            this.board[randomI][randomJ] = temp;
        }
    }
};

Board.prototype.get = function() {
    return this.board;
}

/**
 * Implements iterable protocol to enable looping with for...of
 */
Board.prototype[Symbol.iterator] = function () {
    var board = this.board;
    return {
        next: function() {
            if( this._pos >= board.length) {
               return {done: true};
            }
            var next = { value: board[this._pos], done: false };
            this._pos += 1;
            return next;

        },
        _pos: 0
    };
};
