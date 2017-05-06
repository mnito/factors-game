function RGB (r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a || 1;
}

RGB.prototype.clone = function () {
  return new RGB(this.r, this.g, this.b, this.a);
};

RGB.prototype.toString = function () {
  return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
};
