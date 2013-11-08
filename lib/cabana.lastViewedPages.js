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
      title: function() {
        return $('title').text();
      },
      linkClasses: []
    },

    // prefix all custom events that this widget will fire: "lastViewedPages:eventname"
    widgetEventPrefix: 'lastViewedPages:',

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

      var currentPage = {
        url: window.location.href,
        title: _this.options.title()
      }

      pages.addPage(currentPage);

      _this._render();
    },

     _pagesSavedToLocalStorage: function() {
      return localStorageGetObject('lastViewedPages') && localStorageGetObject('lastViewedPages').length;
     },

    _destroy: function() {
      // this.element.unbind();
      // this.element.html('');
      // this.element.remove();
    },

    _render: function() {
      this.element.append(this._markup(pages.all()));
    },

    _markup: function(pages) {
      var markup = '';
      for (var i=0; i < pages.length; i++) {
        var page = pages[i];

        markup += '<li>';
        markup += '<a href="' + page.url + '">';
        markup += page.title;
        markup += '</a>';
        markup += "</li>";
      };
      return markup;
    }
  });

})(jQuery, window, document);
