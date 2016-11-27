var canvas = document.createElement('canvas');

document.body.appendChild(canvas);

canvas.width = 640;
canvas.height = 860;

canvas.style.backgroundColor = '#333333';

canvas.id = 'gameView';

var brush = canvas.getContext('2d');

var rows = 5;
var columns = 7;

brush.textAlign = 'center';
brush.textBaseline = 'middle';
brush.fillStyle = 'red';

var minSpacing = canvas.width * .01;

var offset = 100;

var width = canvas.width;
var height = canvas.height - offset;

var maxWidth = width / columns; 
var maxHeight = height / rows;

var spacing = 2;

var blockSize = Math.min(maxWidth, maxHeight) - spacing;

var marginLeft = (width - ((blockSize * columns) + (spacing * (columns - 1)))) / 2;

for( var x = 0; x < columns; x += 1) {
   for (var y = 0; y < rows; y += 1) {
     brush.fillRect(x * blockSize + (spacing * x) + marginLeft, y * blockSize + offset + (spacing * y), blockSize, blockSize);
   }
}
