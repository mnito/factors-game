function StorageManager(storageMethod, prefix) {
    try {
        storageMethod.setItem('__available__', true);
        if(storageMethod.removeItem) {
            storageMethod.removeItem('__available__');
        }
    } catch(e) {
        throw "Storage method is not currently available.";
    }
    this.storageMethod = storageMethod;
    this.prefix = prefix || '';
}

StorageManager.prototype.setCurrentLevel = function(level) {
    this.storageMethod.setItem(this.prefix + 'level_current', level);
};

StorageManager.prototype.incrementCurrentLevel = function() {
   this.setCurrentLevel(this.getCurrentLevel() + 1);
};

StorageManager.prototype.getCurrentLevel = function() {
    return parseInt(this.storageMethod.getItem(this.prefix + 'level_current')) || 1;
};

StorageManager.prototype.getLevelResults = function() {
    var results = this.storageMethod.getItem(this.prefix + 'level_results');
    return results ? JSON.parse(results) : [];
};

StorageManager.prototype.setLevelResult = function(level, result) {
    var results = this.getLevelResults();
    results[level - 1] = result;
    this.storageMethod.setItem(this.prefix + 'level_results', JSON.stringify(results));
};

StorageManager.prototype.getLevelResult = function(level) {
    return this.getLevelResults()[level - 1];
};
