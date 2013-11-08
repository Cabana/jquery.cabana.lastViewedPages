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
    // filter way pages that are already in the list
    var pages = this.pages.filter(function(page) {
      return JSON.stringify(page) != JSON.stringify(newPage);
    });

    // prepend the new page
    pages.unshift(newPage);

    // make sure the list is not too long
    pages = pages.slice(0, this.max);

    // save the pages
    this.pages = pages;

    // save them to local storage
    this._saveToLocalStorage();
  };

  LastViewedPages.prototype._saveToLocalStorage = function() {
    localStorageSetObject(this.localStorageId, this.pages);
  };

  return LastViewedPages;
})();
