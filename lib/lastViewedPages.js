var LastViewedPages = (function() {
  function LastViewedPages(options) {
    options = options || {};
    this.pages = options.pages || [];
    this.max = options.max || 10;
    this.localStorageId = 'lastViewedPages';

    localStorageSetObject(this.localStorageId, this.pages);
  }

  LastViewedPages.prototype.all = function() {
    return this.pages;
  };

  LastViewedPages.prototype.addPage = function(newPage) {
    var pages = this.pages.filter(function(page) {
      return JSON.stringify(page) != JSON.stringify(newPage);
    });

    pages.unshift(newPage);

    pages = pages.slice(0, this.max);

    this.pages = pages;

    this._saveToLocalStorage();
  };

  LastViewedPages.prototype._saveToLocalStorage = function() {
    localStorageSetObject(this.localStorageId, this.pages);
  };

  return LastViewedPages;
})();
