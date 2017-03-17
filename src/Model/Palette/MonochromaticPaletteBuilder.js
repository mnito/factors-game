function MonochromaticPaletteBuilder(hue, saturation) {
  this.hue = hue;
  this.saturation = saturation;
}

MonochromaticPaletteBuilder.prototype.build = function(count, range) {
  if (count < 1) {
    throw 'Count cannot be less than 1.';
  }

  var maxRange = 100;
  if(range > maxRange) {
    range = maxRange;
  }

  var min = (maxRange - range) / 2;
  var h = this.hue;
  var s = this.saturation;
  var interval = range / (count - 1);

  var palette = [];
  //get evenly spaced colors starting from the lightest (highest l value)
  for(var c = count - 1; c >= 0; c -= 1) {
     palette.push(new HSL(h, s, Math.floor(interval * c + min)));
  }

  return palette;
};
