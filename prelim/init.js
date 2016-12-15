function init(canvas, width, height) {
    document.body.appendChild(canvas);

    canvas.width = width;
    canvas.height = height;

    canvas.style.backgroundColor = '#333333';

    canvas.id = 'gameView';

    var storageManager = new StorageManager(localStorage);
    var levels = new Levels( new XSPRNG(1), 70, new MonochromaticPaletteBuilder());
    var level = levels.get(storageManager.getCurrentLevel());

    var vc = new ViewController( canvas, 2, 'white', level );

    vc.draw();

    var levelController = new LevelController(levels, storageManager, vc);
    var inputController = new LevelInputController( vc, function() { levelController.next(); } );
    var keyboardInput = new KeyboardInput(inputController);
    var touchInput = new TouchInput(inputController, canvas);

    keyboardInput.listen();
    touchInput.listen();
}
