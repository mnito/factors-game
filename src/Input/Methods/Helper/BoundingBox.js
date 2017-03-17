function BoundingBox (x, y, width, length) {
  this.topLeft = {x: x, y: y};
  this.bottomRight = {x: x + width, y: y + length};
}

BoundingBox.prototype.isPointWithin = function (x, y) {
  if (this.topLeft.x > x || x > this.bottomRight.x) {
    return false;
  }
  if (this.topLeft.y > y || y > this.bottomRight.y) {
    return false;
  }
  return true;
};
