// save object in localStorage
function localStorageSetObject(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// get object from localStorage
function localStorageGetObject(key) {
  var value = localStorage.getItem(key);
  return value && JSON.parse(value);
}

// IE8 doesn't support Array.prototype.filter
// so we implement it if its not there already
if (!Array.prototype.filter) {
  Array.prototype.filter = function(predicate) {
    var results = [];
    for (var i=0; i < this.length; i++) {
      if (predicate(this[i])) {
        results.push(this[i]);
      }
    }
    return results;
  }
}
