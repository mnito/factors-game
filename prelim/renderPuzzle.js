function renderPuzzle( levelNumber, canvas, width, height ) {
    
    document.body.appendChild(canvas);

    canvas.width = width;
    canvas.height = height;

    canvas.style.backgroundColor = '#333333';

    canvas.id = 'gameView';

    var levels = new Levels( new XSPRNG(1), 70, new MonochromaticPaletteBuilder());
    var level = levels.get(levelNumber);

    var vc = new ViewController( level, canvas, 2, 'white' );

    vc.draw();

    var inputController = new InputController( vc );
    var keyboardInput = new KeyboardInput(inputController);
    var touchInput = new TouchInput(inputController, canvas);

    keyboardInput.listen();
    touchInput.listen();
}
