function SingleColorPaletteBuilder (color) {
  this.color = color;
}

SingleColorPaletteBuilder.prototype.build = function (count) {
  var palette = [];
  // Get evenly spaced colors starting from the lightest (highest l value)
  for (var i = 0; i < count; i += 1) {
    palette.push(this.color.clone());
  }
  return palette;
};
