/*
 * Move box across screen and basic collision detection
 * Also fps addition
 * 
 * Still need to (maybe) prevent jumping and work out touch stuff
 */

console.log('start');
document.body.innerHTML = "";

var canvas = document.createElement("canvas");

canvas.width = 500;
canvas.height = 768;
canvas.style.backgroundColor = 'gray';
canvas.id = 'view';

document.body.appendChild(canvas);

var x = (canvas.width - canvas.width * .15) / 2;

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
    x = e.clientX;
    e.preventDefault();
}, false);

canvas.addEventListener('mousemove', function(e){
    if(isMouseDown) {
        x = e.clientX;
    }
    e.preventDefault();
}, false);

canvas.addEventListener('mouseup', function(e){
    isMouseDown = false;
    e.preventDefault();
}, false);

brush = canvas.getContext('2d');

var fps = 60;
var timeout = 1000/fps;

//Loop stuff
function main(timestamp) {
    setTimeout(function(){        
       window.requestAnimationFrame(main);
       frame(timestamp);
    }, timeout);
}

var boxes =  [{x: 0, y: canvas.height - 100, s: canvas.height * .20}, {x: 300, y: canvas.height - 300, s: canvas.height * .30}];

function frame(timestamp) {
    brush.clearRect(0, 0, canvas.width, canvas.height);
    var collide = false;
    for each(otherBox in boxes) {
     
       brush.fillStyle = 'lime';
       brush.fillRect(otherBox.x, otherBox.y, otherBox.s, otherBox.s);
       otherBox.y -= .2;
       if(otherBox.y + otherBox.s < 0) {
           otherBox.y = canvas.height;
       }
       var s = canvas.width * .15;
    
       if (x < otherBox.x + otherBox.s &&
           x + s > otherBox.x &&
           canvas.height * .10 < otherBox.y + otherBox.s &&
           s + canvas.height * .10 > otherBox.y) {
          collide = true;
       }
     }
     if(collide) {
         brush.fillStyle = 'blue';
     } else {
         brush.fillStyle = 'red';
     }
     brush.fillRect(x , canvas.height * .10, s, s);
}

window.requestAnimationFrame(main);
