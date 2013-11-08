# Last viewed pages

Keep track of a users last viewed pages and make a nice list. Uses web storage (local storage).

## Dependencies

* jQuery library
* jQuery UI Core library
* Zurb Foundation CSS library

## Usuage

Make some HTML

```html
<div class="last-viewed-pages"></div>
```

And instantiate the plugin

```javascript
$(function() {

  $('.last-viewed-pages').lastViewedPages();

});
```

## Options

```javascript
$('.last-viewed-pages').lastViewedPages({

  count: [integer], // the number of last viewed pages to keep track of. Default is 10.

  currentPage: [object], // the object representing the current page. This object will be saved to localStorage. Default is `{ url: window.location.href, title: $('title').text() }`

  markup: [function] // a function that given an array of saved pages will return the markup that should be injected into the DOM. Default is a level 1 heading and an unordered list of links.

});
```

## Methods

- `destroy`: Clear the array of last viewed pages in local storage and remove the injected markup.
