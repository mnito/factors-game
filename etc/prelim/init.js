function init(canvas, width, height) {
    document.body.appendChild(canvas);

    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight - 200;

    canvas.id = 'gameView';

    FactorsGame.init(canvas).start();
}
