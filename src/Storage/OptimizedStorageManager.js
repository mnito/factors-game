/* Found the game would gradually slow down when progressing through the
   levels. The write operation seemed to be the source of the bottleneck, so
   this optimized storage manager was created to simplify writes. Caching was
   also added so the only actual read operation from the storage method
   occurs when the object is constructed. */
function OptimizedStorageManager (storageMethod, prefix, bucketSize) {
  try {
    /* With private browsing modes, sometimes localStorage appears to be
       available yet when attempting to set an item an exception is thrown. */
    storageMethod.setItem('__available__', true);
    if (storageMethod.removeItem) {
      storageMethod.removeItem('__available__');
    }
  } catch (e) {
    throw 'Storage method is not currently available.';
  }
  this.storageMethod = storageMethod;
  this.prefix = prefix || '';
  this.bucketSize = bucketSize || 16;

  this.cachedLevelResults = [];
  // Read operation from storage method
  this.cacheLevelResults();
}

OptimizedStorageManager.prototype.cacheLevelResults = function() {
  var cachedLevelResults = [];
  var i = 0;
  while(true) {
    var bucket = this.getLevelResultBucket(i);
    if(bucket.length === 0) {
      break;
    }
    cachedLevelResults = cachedLevelResults.concat(bucket);
    i += 1;
  }
  this.cachedLevelResults = cachedLevelResults;
};

OptimizedStorageManager.prototype.getLevelResultBucket = function(bucket) {
  var results = this.storageMethod.getItem(this.prefix + 'level_results_bucket_' + bucket);
  return results ? JSON.parse(results) : [];
};

OptimizedStorageManager.prototype.setLevelResultBucket = function(bucket, results) {
  this.storageMethod.setItem(this.prefix + 'level_results_bucket_' + bucket, JSON.stringify(results));
};

OptimizedStorageManager.prototype.setCurrentLevel = function (level) {
  this.storageMethod.setItem(this.prefix + 'level_current', level);
};

OptimizedStorageManager.prototype.incrementCurrentLevel = function () {
  this.setCurrentLevel(this.getCurrentLevel() + 1);
};

OptimizedStorageManager.prototype.getCurrentLevel = function () {
  return parseInt(this.storageMethod.getItem(this.prefix + 'level_current')) || 1;
};

OptimizedStorageManager.prototype.getLevelResults = function () {
  return this.cachedLevelResults;
};

OptimizedStorageManager.prototype.setLevelResult = function (level, result) {
  var levelIndex = level - 1;
  var bucket = Math.floor(levelIndex / this.bucketSize);
  var results = this.getLevelResultBucket(bucket);
  results[levelIndex % this.bucketSize] = result;
  // Add level result to cache
  this.cachedLevelResults[levelIndex] = result;
  // Level results are placed into buckets to simplify writes
  this.setLevelResultBucket(bucket, results);
};

OptimizedStorageManager.prototype.getLevelResult = function (level) {
  return this.getLevelResults()[level - 1];
};
