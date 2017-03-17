//Factors Game by Michael P. Nitowski
function FactorsGame(levels, config, storageManager, score, canvas) {
    this.levels = levels;
    this.config = config;
    this.storageManager = storageManager;
    this.score = score;
    this.canvas = canvas;
    this.brush = canvas.getContext('2d');
    this.brush.clearAll = function() {
        this.clearRect(0, 0, canvas.width, canvas.height);
    };

    this.states = {
        TUTORIAL: new TutorialState(this),
        PLAYING: new PlayingState(this),
        COMPLETE: new CompleteState(this),
        SELECT: new SelectState(this)
    };
    this.state = null;
}

FactorsGame.prototype.start = function() {
    var completedTutorial = this.storageManager.getCurrentLevel() !== 1;
    this.transition(completedTutorial || !this.config.showTutorial ? 'PLAYING' : 'TUTORIAL');
};

FactorsGame.prototype.transition = function(nextState) {
    var context;
    if(this.state) {
        context = this.state.onLeave();
    }
    if(this.states[nextState]) {
        this.state = this.states[nextState];
    }
    this.state.onEnter(context);
};

FactorsGame.init = function(canvas, config) {
    config = config || {};
    this.configure(config);
    var levels = new Levels(new XSPRNG(1), config.paletteRange, new MonochromaticPaletteBuilder());
    var storageManager;
    //make sure storage method can be used
    try {
        storageManager = new StorageManager(config.storageMethod, config.storagePrefix);
    } catch(e) {
        //if it cannot, use temporary storage method
        config.storageMethod = {
            data: {},
            setItem: function(key, value) {
                this.data[key] = value;
            },
            getItem: function(key) {
                return this.data[key];
            }
        };
        storageManager = new StorageManager(config.storageMethod, config.storagePrefix);
    }
    var score = new Score(function() {
        return storageManager.getLevelResults();
    });
    return new FactorsGame(levels, config, storageManager, score, canvas);
};

FactorsGame.configure = function(config) {
    var isPositiveInt = function(number) {
        return ((number ^ 0) === number && number > 0) || number === Number.POSITIVE_INFINITY;
    };
    config.numberColor = config.numberColor || '#FFFFFF';
    config.textColor = config.textColor || '#000000';
    config.textBackground = config.textBackground || '#FFFFFF';
    config.paletteRange = isPositiveInt(config.paletteRange) && config.paletteRange <= 100 || 70;
    config.levelLimit = isPositiveInt(config.levelLimit) || 256;
    config.storageMethod = config.storageMethod || localStorage;
    config.storagePrefix = config.storagePrefix || 'factors_';
    config.showTutorial = typeof config.showTutorial !== 'undefined' ? config.showTutorial : true;
};
