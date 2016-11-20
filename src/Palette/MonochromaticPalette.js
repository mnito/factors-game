function MonochromaticPalette(hue, saturation) {
  this.hue = hue;
  this.saturation = saturation;
}

MonochromaticPalette.prototype.generate = function (count, range) {
  if (count < 1) {
    throw 'Count cannot be less than 1.';
  }
  
  var maxRange = 100;
  if (range > 100) {
    range = 100;
  }
  
  var h = this.hue;
  var s = this.saturation;
  var interval = range / (count - 1);
  var min = (100 - range) / 2;
  var colors = [];

  for(var c = count - 1; c >= 0; c -= 1) {
     colors.push({h: h, s: s, l: Math.floor(interval * c + min)});
  }
  
  return colors;
};
