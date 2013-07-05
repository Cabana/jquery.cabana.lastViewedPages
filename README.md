# Last viewed pages

Keep track of a users last viewed pages and make a nice list. Uses web storage (local storage).

## How to use

1. Include jQuery.
2. Include [web storage class](https://github.com/davidpdrsn/Web-storage-class/).
3. Make the required markup.
4. Call the plugin.

## Example markup

```html
<div class="last-viewed-pages">
  <h1>Last viewed pages</h1>
  <ul>
  </ul>
</div>
```

The plugin expects some container element with an empty `ul` inside it. Thats all.

## Calling the plugin

```javascript
$('.last-viewed-pages').lastViewedPages();
```

Thats all it takes to get it setup.

## Options

```javascript
$('.last-viewed-pages').lastViewedPages({

  count: [integer], // the number of last viewed pages to keep track of. Default is 10.

  title: [function], // a function that returns the title of the page as a string. Default is the text of the title element.

  linkClasses: [array] // an array of classes to be applied on the `a` elements inside the list. Default is an empty array.

});
```

Example

```javascript
$('.last-viewed-pages').lastViewedPages({

  count: 15

  title: function() {
    return $('[data-page-title]').data('page-title');
  },

  linkClasses: ['arrow-before']

});
```
