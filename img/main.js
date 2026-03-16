// Lightweight SEO/preview enhancer injected sitewide without altering layout
(function () {
  try {
    var d = document;
    var head = d.head || d.getElementsByTagName('head')[0];

    function ensureStyle(href, id) {
      if (!href) return;
      if (id && d.getElementById(id)) return;
      var existing = Array.prototype.slice.call(d.querySelectorAll('link[rel="stylesheet"]'))
        .some(function(l){ return l.href && l.href.indexOf(href) !== -1; });
      if (existing) return;
      var link = d.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (id) link.id = id;
      head.appendChild(link);
    }

    function ensureMeta(attrName, attrValue, content) {
      var selector = 'meta[' + attrName + '="' + attrValue + '"]';
      var el = d.querySelector(selector);
      if (!el) {
        el = d.createElement('meta');
        el.setAttribute(attrName, attrValue);
        head.appendChild(el);
      }
      if (content && !el.getAttribute('content')) {
        el.setAttribute('content', content);
      }
      return el;
    }

    function absUrl(url) {
      if (!url) return '';
      try { return new URL(url, location.origin).href; } catch(e) { return url; }
    }

    // Ensure Font Awesome icons load reliably on every page.
    // Primary: CDN (always reachable). Fallbacks: local copies.
    ensureStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css', 'bdbl-fa6-cdn');
    ensureStyle('/wp-content/themes/constructo/css/font-awesome.min.css', 'bdbl-fa4');
    ensureStyle('/wp-content/plugins/js_composer/assets/lib/vendor/node_modules/@fortawesome/fontawesome-free/css/all.min.css', 'bdbl-fa5');

    // Canonical
    (function ensureCanonical(){
      var canonical = d.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = d.createElement('link');
        canonical.setAttribute('rel','canonical');
        canonical.setAttribute('href', location.href.split('#')[0]);
        head.appendChild(canonical);
      }
    })();

    // Determine best title/description/image
    var title = (d.querySelector('meta[property="og:title"]')||{}).content || (d.querySelector('title')||{}).text || d.title || 'Bridan Design Build';
    var desc = (d.querySelector('meta[name="description"]')||{}).content || 'Premium construction and architectural design services in Kenya.';
    var logo = '/wp-content/uploads/img/bridanlogo-removebg-preview.png';
    var ogImg = (d.querySelector('meta[property="og:image"]')||{}).content || (d.querySelector('img')||{}).src || logo;
    ogImg = absUrl(ogImg);

    // Open Graph
    ensureMeta('property','og:title', title);
    ensureMeta('property','og:description', desc);
    ensureMeta('property','og:type', 'website');
    ensureMeta('property','og:url', location.href.split('#')[0]);
    ensureMeta('property','og:image', ogImg);
    ensureMeta('property','og:site_name', 'Bridan Design Build');

    // Twitter
    ensureMeta('name','twitter:card','summary_large_image');
    ensureMeta('name','twitter:title', title);
    ensureMeta('name','twitter:description', desc);
    ensureMeta('name','twitter:image', ogImg);

    // Image alt fallback for previews and accessibility
    Array.prototype.forEach.call(d.images || [], function(img){
      if (!img.getAttribute('alt') || img.getAttribute('alt').trim()==='') {
        var file = (img.currentSrc || img.src || '').split('/').pop().split('?')[0];
        var nice = (file || 'Project image').replace(/[-_]/g,' ').replace(/\.[a-z0-9]+$/i,'').trim();
        img.setAttribute('alt', nice || 'Project image');
      }
      // Add loading hints without breaking layout
      if (!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding','async');
    });

    // Width/height for CLS reduction where missing
    Array.prototype.forEach.call(d.querySelectorAll('img:not([width])'), function(img){
      if (img.naturalWidth && img.naturalHeight) {
        img.setAttribute('width', img.naturalWidth);
        img.setAttribute('height', img.naturalHeight);
      }
    });

    // Project prev/next navigation on single project pages
    (function ensureProjectPrevNext(){
      var path = location.pathname;
      // Skip the projects listing page
      if (path === '/projects/' || path === '/projects/index.html') return;
      if (!/^\/projects\//.test(path)) return;

      // Clean paths work with both /index.html and trailing-slash formats (Vercel cleanUrls)
      var projectsOrder = [
        '/projects/lil-motors-isuzu-dealership/',
        '/projects/de-vries-africa-office-fitout/',
        '/projects/freds-ranch-hotel-rooms/',
        '/projects/twiva-media-office-renovation/',
        '/projects/res_home_ngong/',
        '/projects/Kitale-Club-Main- Kitchen-Facility/',
        '/projects/Residential House, Lukhhome, Trans Nzoia/',
        '/projects/grand-westpeak-kilimani/',
        '/projects/milimani-kitale-residential/',
        '/projects/mukinduri-gazebo-bedroom-extension/',
        '/projects/ngong-kitchen-design/'
      ];

      function normalize(p){
        try {
          // Decode URI, unify slashes, strip trailing index.html, ensure trailing slash
          var s = decodeURI(p).replace(/\\/g,'/').replace(/\/index\.html$/, '/');
          if (s.slice(-1) !== '/') s += '/';
          return s;
        } catch(e) { return p; }
      }
      var current = normalize(path);
      var idx = -1;
      for (var i = 0; i < projectsOrder.length; i++) {
        if (normalize(projectsOrder[i]) === current) { idx = i; break; }
      }
      var prevUrl = idx > 0 ? projectsOrder[idx-1] : null;
      var nextUrl = idx < projectsOrder.length-1 ? projectsOrder[idx+1] : null;

      var nav = d.querySelector('.folionav');
      if (!nav) {
        var container = d.createElement('div');
        container.className = 'row';
        var inner = d.createElement('div');
        inner.className = 'col-md-12 buttons folionav';
        container.appendChild(inner);
        // append near the end of project content
        var hook = d.querySelector('.portfolio-single') || d.body;
        hook.appendChild(container);
        nav = inner;
      }

      function createBtn(url, text, rel, iconLeft){
        var a = d.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('rel', rel);
        var btn = d.createElement('button');
        btn.className = 'btn btn-lg style-5';
        // Add explicit prev/next classes for styling
        if (rel === 'prev') {
          btn.className += ' folio-prev-btn';
        } else if (rel === 'next') {
          btn.className += ' folio-next-btn';
        }
        btn.innerHTML = iconLeft ? '<i class="fa fa-angle-left"></i> &nbsp; ' + text : text + ' &nbsp; <i class="fa fa-angle-right"></i>';
        a.appendChild(btn);
        return a;
      }

      // Clear any existing inconsistent markup and rebuild
      while (nav.firstChild) nav.removeChild(nav.firstChild);
      if (prevUrl) nav.appendChild(createBtn(prevUrl, 'Previous Project', 'prev', true));
      if (nextUrl) nav.appendChild(createBtn(nextUrl, 'Next Project', 'next', false));
    })();
  } catch(err) {
    // no-op
  }
})();




