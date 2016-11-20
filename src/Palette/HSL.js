function HSL(h, s, l) {
  this.h = h;
  this.s = s;
  this.l = l;
}

HSL.complement = function( hsl ) {
   return {h: (hsl.h + 180) % 360 , s: hsl.s, l: hsl.l }
};
