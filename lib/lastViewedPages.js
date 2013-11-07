var LastViewedPages = (function() {
  function LastViewedPages() {
    this._pages = [];
    this._localStorageId = 'lastViewedPages';

    setObject(this._localStorageId, this._pages);
  }

  LastViewedPages.prototype.all = function() {
    return this._pages;
  };

  LastViewedPages.prototype.addPage = function(newPage) {
    var pages = this._pages.filter(function(page) {
      return JSON.stringify(page) != JSON.stringify(newPage);
    });

    pages.unshift(newPage);

    this._pages = pages;

    this._saveToLocalStorage();
  };

  LastViewedPages.prototype._saveToLocalStorage = function() {
    setObject(this._localStorageId, this._pages);
  };

  // save object in localStorage
  function setObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // get object from localStorage
  function getObject(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
  }

  return LastViewedPages;
})();
