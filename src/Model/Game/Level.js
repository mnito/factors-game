function Level(puzzle, palette) {
    this.puzzle = puzzle;
    this.palette = palette;
}

Level.prototype.getNumber = function() {
    return this.puzzle.original;
};
