/*
 * Basic form of game implemented with experimentation (cross style right now)
 * 
 * Still need to (maybe) prevent jumping and work out touch stuff
 * Need to adjust concept for more fun
 */

//Main block
function MainBlock(value, x, y, size, goal)
{
    this.value = value;
    this.x = x;
    this.y = y;
    this.size = size;
    this.goal = goal ? goal : 1;
}

//Other blocks
function Block(value, x, y, size) {
   this.value = value;
   this.x = x;
   this.y = y;
   this.size = size;
   this.retired = false;
}

Block.prototype.transform = function( mainBlock ) {
   var newValue = mainBlock.value;
   if( mainBlock.goal === 1 ) {
      newValue = mainBlock.value % this.value === 0 ? mainBlock.value / this.value : mainBlock.value + this.value;
   } else {
      newValue = mainBlock.goal % block.value === 0 ? mainBlock.value * this.value : mainBlock.value - this.value;
   }
   mainBlock.value = newValue;
}

Block.prototype.retire = function() {
    this.retired = true;
}

console.log('start');
document.body.innerHTML = "";

var canvas = document.createElement("canvas");

canvas.width = 500;
canvas.height = 768;
canvas.style.backgroundColor = 'gray';
canvas.id = 'view';

//Need to figure out touch stuff, Firefox not firing touch events
canvas.addEventListener('touchstart', function(e){
    //
}, false);

canvas.addEventListener('touchmove', function(e){
    //
}, false);


//Mouse events
var isMouseDown = false;

canvas.addEventListener('mousedown', function(e){
    isMouseDown = true;
    mainBlock.x = e.clientX;
    e.preventDefault();
}, false);

canvas.addEventListener('mousemove', function(e){
    if(isMouseDown) {
        mainBlock.x = e.clientX;
    }
    e.preventDefault();
}, false);

canvas.addEventListener('mouseup', function(e){
    isMouseDown = false;
    e.preventDefault();
}, false);

var brush = canvas.getContext('2d');
brush.textAlign = 'center';
brush.textBaseline = 'middle';

document.body.appendChild(canvas);

var mainBlock = new MainBlock(17, (canvas.width - canvas.width * .15) / 2, canvas.height * .10, canvas.width * .15);
var blocks = [new Block(2, 0, canvas.height, canvas.width * .15), new Block(3, 300, canvas.height - 300, canvas.width * .15)];
var blocks = generateCrossBlocks(25, 1000);
function generateCrossBlocks(x, y)
{
    var size = canvas.width * .15;
    return [new Block(2, x, y, size), new Block(3, x + size * 2, y, size), new Block(3, x + size, y + size, size), new Block(3, x + size, y - size, size)];
}
var blockValues = [2, 3, 5, 7];

console.log(mainBlock.value);

var fps = 60;
var timeout = 1000/fps;

//Loop stuff
function main(timestamp) {
    setTimeout(function(){        
       window.requestAnimationFrame(main);
       frame(timestamp);
    }, timeout);
}


function frame(timestamp) {
    brush.clearRect(0, 0, canvas.width, canvas.height);
    var collide = false;
    for each(block in blocks) {
       
       brush.fillStyle = 'lime';
       brush.fillRect(block.x, block.y, block.size, block.size);
       brush.fillStyle = "white";
       brush.font = 'bold ' + block.size * .8 + 'px Arial';
       brush.fillText('' + block.value, block.x + block.size / 2, block.y + block.size / 2);
       block.y -= .5;
       if(block.y + block.size < 0) {
           block.y = canvas.height;
           block.retired = false;
           block.value = blockValues[Math.floor(Math.random() * blockValues.length)];
           blocks = generateCrossBlocks(Math.floor((Math.random() * 400) + 1), 1000);
       }

       if (mainBlock.x < block.x + block.size &&
           mainBlock.x + mainBlock.size > block.x &&
           mainBlock.y < block.y + block.size &&
           mainBlock.size + mainBlock.y > block.y && !block.retired) {
           collide = true;
           console.log(mainBlock.value + '{' + block.value + '}');
           block.transform( mainBlock );
           block.retire();
           console.log(mainBlock.value);
       }
     }
     if(collide) {
         brush.fillStyle = 'blue';
     } else {
         brush.fillStyle = 'red';
     }
     brush.fillRect(mainBlock.x , mainBlock.y, mainBlock.size, mainBlock.size);
     brush.fillStyle = "white";
     brush.font = 'bold ' + mainBlock.size * .8 + 'px Arial';
     brush.fillText('' + mainBlock.value, mainBlock.x + mainBlock.size / 2, mainBlock.y + mainBlock.size / 2);
     if(mainBlock.value === 1) {
         alert("You won.");
         mainBlock.value = 90;
     }
}

window.requestAnimationFrame(main);
