function TapInput(element, tapRegions) {
    this.element = typeof element !== 'undefined' ? element : document;
    this.tapRegions = Array.isArray(tapRegions) ? tapRegions : [];
    this.upCount = 0;
    this.listeners = {
        touchStart: this.tap.bind(this)
    };
}

TapInput.prototype.add = function(tapRegion) {
    this.tapRegions.push(tapRegion);
};

TapInput.prototype.listen = function() {
    this.element.addEventListener('touchstart', this.listeners.touchStart);
};

TapInput.prototype.tap = function(event) {
    event.preventDefault();
    var x = event.touches[0].clientX;
    var y = event.touches[0].clientY;
    for(var i = 0; i < this.tapRegions.length; i += 1) {
        var tapRegion = this.tapRegions[i];
        if(tapRegion.boundingBox.isPointWithin(x, y) && typeof tapRegion.onTap === 'function') {
            tapRegion.onTap(x, y);
        }
    }
};

TapInput.prototype.detach = function() {
    this.element.removeEventListener('touchstart', this.listeners.touchStart);
};
