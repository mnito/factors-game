function Board (board, prng) {
  this.board = board;
  this.rows = board.length;
  this.columns = board[0].length;
  this.prng = typeof prng !== 'undefined' ? prng : Math;
}

Board.create = function (rows, columns, prng) {
  var board = [];
  var c = 1;
  for (var i = 0; i < rows; i += 1) {
    var row = [];
    for (var j = 0; j < columns; j += 1) {
      row.push(c);
      c += 1;
    }
    board.push(row);
  }
  return new Board(board, prng);
};

// Uses modified Fisher-Yates/Durstenfeld algorithm
Board.prototype.shuffle = function () {
  var index = 0;
  var temp = 0;
  for (var i = 0; i < this.board.length; i += 1) {
    for (var j = 0; j < this.board[i].length; j += 1) {
      var randomI = Math.floor(this.prng.random() * this.board.length);
      var randomJ = Math.floor(this.prng.random() * this.board[i].length);
      var temp = this.board[i][j];
      this.board[i][j] = this.board[randomI][randomJ];
      this.board[randomI][randomJ] = temp;
    }
  }
};

Board.prototype.get = function (row, column) {
  if (typeof row === 'undefined') {
    return this.board;
  }
  if (typeof column === 'undefined') {
    return this.board[row];
  }
  return this.board[row][column];
};

// Implements iterable protocol to enable looping with for...of
if (typeof Symbol !== 'undefined' && typeof Symbol.iterator !== 'undefined') {
  Board.prototype[Symbol.iterator] = function () {
    var board = this.board;
    return {
      next: function () {
        if (this._pos >= board.length) {
          return {done: true};
        }
        var next = { value: board[this._pos], done: false };
        this._pos += 1;
        return next;
      },
      _pos: 0
    };
  };
}
