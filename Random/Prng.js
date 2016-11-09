function Prng(seed) {
    this.seed = seed;
}

Prng.prototype.next = function() {
    return Math.random();
}
