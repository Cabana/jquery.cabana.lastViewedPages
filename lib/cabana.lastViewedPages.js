/*
 *   jquery lastViewedPages plugin
 *   jQuery UI Widget-factory plugin (for 1.8/9+)
 *   v0.1
 */

;(function($, window, document, undefined) {
  var pages = null;

  $.widget("cabana.lastViewedPages", {

    options: {
      count: 10,
      markup: function(pages) {
        var markup = '';
        markup += '<h1>Last viewed pages</h1>';
        markup += '<ul>';
        for (var i=0; i < pages.length; i++) {
          var page = pages[i];

          markup += '<li>';
          markup += '<a href="' + page.url + '">';
          markup += page.title;
          markup += '</a>';
          markup += "</li>";
        };
        markup += "</ul>";
        return markup;
      },
      currentPage: { url: window.location.href, title: $('title').text() }
    },

    _create: function() {
      _this = this;

      if (_this._pagesSavedToLocalStorage()) {
        pages = new LastViewedPages({
          pages: localStorageGetObject('lastViewedPages'),
          max: _this.options.count
        });
      } else {
        pages = new LastViewedPages({
          max: _this.options.count
        });
      }

      pages.addPage(_this.options.currentPage);

      _this._render();
    },

     _pagesSavedToLocalStorage: function() {
      return localStorageGetObject('lastViewedPages') && localStorageGetObject('lastViewedPages').length;
     },

    destroy: function() {
      this.element.html('');
    },

    _render: function() {
      var markup = this.options.markup(pages.all());
      this.element.append(markup);
    },
  });

})(jQuery, window, document);
