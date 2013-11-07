var LastViewedPages = (function() {
  function LastViewedPages() {
    this._pages = [];
    this._localStorageId = 'lastViewedPages';

    localStorageSetObject(this._localStorageId, this._pages);
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
    localStorageSetObject(this._localStorageId, this._pages);
  };

  return LastViewedPages;
})();
