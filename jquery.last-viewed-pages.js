var lastViewedPages = new DataSet('lastViewedPages');

;(function ( $, window, document, undefined ) {

  var pluginName = "lastViewedPages",
    defaults = {
      count: 10,
      title: function() {
        return $('title').text();
      },
      linkClasses: []
    };

  function Plugin( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options );

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {

    init: function() {
      var that = this;
      var element = that.element;
      var options = that.options;

      if ( lastViewedPages.all().length ) {
        if ( lastViewedPages.findByKeyAndValue('url', window.location.href).length === 0 ) {
          that.savePage(element, options);
        } else {
          lastViewedPages.destroy( lastViewedPages.findByKeyAndValue('url', window.location.href)[0].id );
          that.savePage(element, options);
        }
        while ( lastViewedPages.all().length > that.options.count ) {
          lastViewedPages.destroy( lastViewedPages.all()[0].id );
        }
      } else {
        that.savePage(element, options);
      }
      that.makeListMarkup(element, options);
    },

    savePage: function(el, options) {
      lastViewedPages.save({
        url: window.location.href,
        title: options.title()
      });
    },

    makeListMarkup: function(el, options) {
      lastViewedPages.all().forEach(function(page){
        var linkClasses = options.linkClasses.join(' ');
        var markup = '<li><a href="' + page.url + '" class="' + linkClasses + '">' + page.title + '</a></li>';
        $(el).find('ul').prepend(markup);
      });
    }
  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
      }
    });
  };

})( jQuery, window, document );
