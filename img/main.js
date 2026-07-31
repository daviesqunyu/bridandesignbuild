    // Project prev/next navigation on single project pages
    (function ensureProjectPrevNext(){
      var path = location.pathname;
      if (!/^\/projects\//.test(path) || \/\/projects\/index\.html$/.test(path)) return;

      var projectsOrder = [
        '/projects/lil-motors-isuzu-dealership/index.html',
        '/projects/de-vries-africa-office-fitout/index.html',
        '/projects/freds-ranch-hotel-rooms/index.html',
        '/projects/grand-daddy-restaurant-bungoma/index.html',
        '/projects/twiva-media-office-renovation/index.html',
        '/projects/res_home_ngong/index.html',
        '/projects/Kitale-Club-Main- Kitchen-Facility/index.html',
        '/projects/Residential House, Lukhhome, Trans Nzoia/index.html',
        '/projects/grand-westpeak-kilimani/index.html',
        '/projects/milimani-kitale-residential/index.html',
        '/projects/mukinduri-gazebo-bedroom-extension/index.html',
        '/projects/ngong-kitchen-design/index.html'
      ].map(function(u){ return u; });

      function normalize(p){
        try { return decodeURI(p).replace(/\\+/g,' ').replace(/\\/g,'/'); } catch(e) { return p; }
      }
      var current = normalize(path);
      var idx = projectsOrder.findIndex(function(u){ return normalize(u) === current; });
      if (idx === -1) {
        // try matching by directory
        var dir = current.replace(/\/index\.html$/, '');
        idx = projectsOrder.findIndex(function(u){ return normalize(u).replace(/\/index\.html$/, '') === dir; });
      }
      if (idx === -1) return;
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
      }

    })();

// Ensure the Grand Daddy project appears in every Projects dropdown at runtime
(function addGrandDaddyToDropdowns(){
  try {
    var linkHref = '/projects/grand-daddy-restaurant-bungoma/index.html';
    var linkText = 'Grand Daddy Restaurant';
    // find all Projects menu anchors
    var anchors = document.querySelectorAll('.site-navigation a[href="/projects/index.html"]');
    anchors.forEach(function(a){
      var parentLi = a.closest('li');
      if (!parentLi) return;
      var submenu = parentLi.querySelector('.sub-menu');
      if (!submenu) return;
      // If the link already exists, skip
      if (submenu.querySelector('a[href="'+linkHref+'"]')) return;
      var li = document.createElement('li');
      li.className = 'menu-item menu-item-type-post_type menu-item-object-page menu-item-depth-1';
      var child = document.createElement('a');
      child.setAttribute('href', linkHref);
      child.textContent = linkText;
      li.appendChild(child);
      submenu.appendChild(li);
    });
  } catch(e){
    console.error('Failed to add Grand Daddy link to dropdowns', e);
  }
})();
