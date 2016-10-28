/*
 * Move box across screen
 * 
 * Still need to prevent jumping and work out touch stuff
 */

console.log('start');
document.body.innerHTML = "";

var canvas = document.createElement("canvas");

canvas.width = 500;
canvas.height = 768;
canvas.style.backgroundColor = 'gray';
canvas.id = 'view';

document.body.appendChild(canvas);

var x = 0;

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

//Loop stuff
function main(timestamp)
{
     window.requestAnimationFrame(main);
     frame(timestamp);
}

function frame(timestamp)
{
     brush.clearRect(0, 0, canvas.width, canvas.height);
     var s = canvas.width * .15;
     brush.fillStyle = 'red';
     brush.fillRect(x , canvas.height * .10, s, s);
}

window.requestAnimationFrame(main);
