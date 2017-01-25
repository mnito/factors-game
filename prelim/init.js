function init(canvas, width, height) {
    document.body.appendChild(canvas);

    canvas.width = width;
    canvas.height = height;

    canvas.style.backgroundColor = '#333333';

    canvas.id = 'gameView';

    var storageManager = new StorageManager(localStorage);
    var levels = new Levels( new XSPRNG(1), 70, new MonochromaticPaletteBuilder());
    var level = levels.get(storageManager.getCurrentLevel());
    var vc = new LevelViewController( canvas, 2, 'white', level );
    vc.draw();

    var levelController = new LevelController(levels, storageManager, vc);
    var levelCompleteAnimation = new LevelCompleteAnimation(vc, function() {
        var lcvc = new LevelCompleteViewController( canvas, vc.level, new Score([]), 'white');
        lcvc.draw();
    });
    var levelInputController = new LevelInputController(vc, function() {
        levelCompleteAnimation.run();
    });
    var keyboardInput = new KeyboardInput(levelInputController);
    var touchInput = new TouchInput(levelInputController, canvas);
    keyboardInput.listen();
    touchInput.listen();
}
