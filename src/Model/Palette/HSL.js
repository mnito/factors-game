function HSL (h, s, l, a) {
  this.h = h;
  this.s = s;
  this.l = l;
  this.a = a || 1;
}

HSL.complement = function (hsl) {
  // Complement is on the opposite side of the color wheel
  return new HSL((hsl.h + 180) % 360, hsl.s, hsl.l, hsl.a);
};

HSL.prototype.clone = function () {
  return new HSL(this.h, this.s, this.l, this.a);
};

HSL.prototype.toString = function () {
  return 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
};
