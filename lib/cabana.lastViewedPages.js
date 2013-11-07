/*
 *   jquery lastViewedPages plugin
 *   jQuery UI Widget-factory plugin (for 1.8/9+)
 *   v0.1
 */

;(function($, window, document, undefined) {

  $.widget("cabana.lastViewedPages", {

    options: {
      optionName: 'optionVal',
    },

    // prefix all custom events that this widget will fire: "lastViewedPages:eventname"
    widgetEventPrefix: 'lastViewedPages:',

    _create: function() {
      console.log('here is something');
    },

    _destroy: function() {
      // this.element.unbind();
      // this.element.html('');
      // this.element.remove();
    },

    _render: function() {
    }
  });

})(jQuery, window, document);
