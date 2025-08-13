jQuery(function($) {
  function addNewStyle(newStyle) {
      var styleElement = document.getElementById('styles_js');
      if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.type = 'text/css';
          styleElement.id = 'styles_js';
          document.getElementsByTagName('head')[0].appendChild(styleElement);
      }
      styleElement.appendChild(document.createTextNode(newStyle));
  }

  addNewStyle('.ls-wp-fullwidth-container, .ls-wp-fullwidth-helper, .ls-wp-container {height: ' + $(window).height() + 'px !important;}');
  //addNewStyle('@media (max-width: 1024px) {.ls-wp-fullwidth-container, .ls-wp-fullwidth-helper, .ls-wp-container {height: 300px !important;}}');  
   addNewStyle('@media (max-width: 700px) {.ls-wp-fullwidth-container, .ls-wp-fullwidth-helper, .ls-wp-container {height: 300px !important;}}');
})


  /* Sticky menu */

