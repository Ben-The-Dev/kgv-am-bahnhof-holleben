// Loads shared nav and footer, then marks the active nav link.
// Place this <script> tag at the BOTTOM of <body>, after the placeholders.

(function () {
  // Determine base URL robustly — works on file://, http://, and subdirectories
  var scripts = document.getElementsByTagName('script');
  var thisScript = scripts[scripts.length - 1];
  var scriptSrc = thisScript.src; // e.g. https://example.com/components/components.js
  var root = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);
  // root = https://example.com/  (always ends with /)
  var base = document.createElement('base');
  base.href = '/kgv-am-bahnhof-holleben/';
  document.head.insertBefore(base, document.head.firstChild);

  function loadComponent(id, url) {
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status + ' loading ' + url);
        return res.text();
      })
      .then(function (html) {
        var el = document.getElementById(id);
        if (el) {
          var tmp = document.createElement('div');
          tmp.innerHTML = html;
          el.replaceWith(tmp.firstElementChild);
        }
      })
      .catch(function (e) {
        console.error('[components.js]', e.message);
      });
  }

  Promise.all([
    loadComponent('nav-placeholder',    root + 'nav.html'),
    loadComponent('footer-placeholder', root + 'footer.html'),
  ]).then(function () {
    // Mark active nav link after both components are injected
    var path = location.pathname.replace(/\/$/, '') || '/aktuelles.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = new URL(a.href).pathname;
      if (href === path || (path.startsWith('/parzellen') && href.includes('/parzellen'))) {
        a.classList.add('active');
      }
    });
  });
})();
