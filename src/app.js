(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initMenu() {
    var btn = document.getElementById('menu-btn');
    var menu = document.getElementById('menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function () {
      var isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initActiveNav() {
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-link]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('is-active');
      }
    });
  }

  function initReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-scale');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.getAttribute('data-delay');
            if (delay) entry.target.style.transitionDelay = delay + 'ms';
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        el.textContent = target + suffix;
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  function initSpotlight() {
    if (reduceMotion) return;
    var cards = document.querySelectorAll('.card-spotlight');
    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--y', (e.clientY - rect.top) + 'px');
      });
    });
  }

  function initTilt() {
    if (reduceMotion) return;
    var cards = document.querySelectorAll('.tilt');
    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--rx', (px * 10).toFixed(2) + 'deg');
        card.style.setProperty('--ry', (py * -10).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(function (root) {
      var track = root.querySelector('[data-track]');
      var prev = root.querySelector('[data-prev]');
      var next = root.querySelector('[data-next]');
      if (!track) return;
      function scrollByCard(dir) {
        var card = track.querySelector('[data-slide]');
        var amount = card ? card.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
        track.scrollBy({ left: dir * amount, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      if (prev) prev.addEventListener('click', function () { scrollByCard(-1); });
      if (next) next.addEventListener('click', function () { scrollByCard(1); });
    });
  }

  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function initHeaderShadow() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    function update() {
      if (window.scrollY > 8) header.classList.add('shadow-glow');
      else header.classList.remove('shadow-glow');
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMenu();
    initActiveNav();
    initReveal();
    initCounters();
    initSpotlight();
    initTilt();
    initCarousels();
    initYear();
    initHeaderShadow();
  });
})();
