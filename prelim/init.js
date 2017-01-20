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
    var inputController = new LevelInputController(vc, function() {
        var lastIndex = this.viewController.level.puzzle.history.slice(-1)[0];
        var blockColor = this.viewController.level.palette.numberColor;
        var blockSize = this.viewController.blockSize;
        var brush = this.viewController.brush;
        var offset = this.viewController.offset + this.viewController.blockSize + this.viewController.spacing;
        var x = lastIndex * this.viewController.blockSize + (this.viewController.spacing * lastIndex) + this.viewController.leftMargin;
        var y = 3 * this.viewController.blockSize + offset + (this.viewController.spacing * 3);
        var number = this.viewController.level.puzzle.number;
        var numberColor = this.viewController.numberColor;
        var width = this.viewController.canvas.width;
        var animation = function(x, y, maxX, maxY, size) {
            brush.fillStyle = blockColor;
            brush.font = '2px';
            brush.clearRect(0, 0, canvas.width, canvas.height);
            brush.fillRect(x, y, size, size);
            if(x >= 0) {
                brush.fillStyle = numberColor;
                brush.fillText('' + number, x + size / 2, y + size / 2);
            }
            if( size + 30 > width ) {
                levelController.next();
                return;
            }
            window.requestAnimationFrame(function() {
                if(x < 0) {
                    size += 30;
                    y -= 30;
                } else {
                    x -= 15;
                }
                animation(x, y, 0, 0, size);
            });
        };
        setTimeout(function() {
            animation(x, y, 0, 0, blockSize);
        }, 500);

        //levelController.next();
    });
    var keyboardInput = new KeyboardInput(inputController);
    var touchInput = new TouchInput(inputController, canvas);

    keyboardInput.listen();
    touchInput.listen();
}
