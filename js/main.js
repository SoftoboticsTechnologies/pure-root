/* PureRoot Natural Foods — site interactions */
(function () {
  'use strict';

  var WA_NUMBER = '919352454356';
  var waLink = function (text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  };

  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Year ---------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Order buttons → prefilled WhatsApp ---------- */
  $$('[data-order]').forEach(function (btn) {
    btn.href = waLink('Hi PureRoot, I would like to order: ' + btn.dataset.order + '. Please share price and delivery details.');
  });

  /* ---------- Header: scrolled state, back-to-top ---------- */
  var header = $('#header');
  var toTop = $('#toTop');
  var onScroll = function () {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    toTop.classList.toggle('is-visible', y > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* ---------- Mobile nav ---------- */
  var burger = $('#burger');
  var nav = $('#nav');
  var overlay = $('#navOverlay');
  var setNav = function (open) {
    nav.classList.toggle('is-open', open);
    overlay.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('no-scroll', open);
  };
  burger.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });
  overlay.addEventListener('click', function () { setNav(false); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1024) setNav(false); });

  /* ---------- Active nav link on scroll ---------- */
  var links = $$('.nav__link');
  var sections = links.map(function (l) { return $(l.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.add('is-in');
        revObs.unobserve(el);
        // hand transitions back to the element's own styles (hover effects)
        setTimeout(function () { el.classList.remove('reveal', 'is-in'); el.style.transitionDelay = ''; }, 1300);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      // stagger siblings in grids
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(idx, 5) * 70 + 'ms';
      revObs.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Product filter ---------- */
  var filters = $$('.filter');
  var products = $$('.product');
  var applyFilter = function (cat) {
    filters.forEach(function (f) {
      var on = f.dataset.filter === cat;
      f.classList.toggle('is-active', on);
      f.setAttribute('aria-selected', String(on));
    });
    products.forEach(function (p) {
      p.classList.toggle('is-hidden', cat !== 'all' && p.dataset.cat !== cat);
      p.classList.add('is-in');
    });
  };
  filters.forEach(function (f) { f.addEventListener('click', function () { applyFilter(f.dataset.filter); }); });
  $$('[data-goto-filter]').forEach(function (a) {
    a.addEventListener('click', function () { applyFilter(a.dataset.gotoFilter); });
  });

  /* ---------- Banner slider ---------- */
  var slider = $('#slider');
  if (slider) {
    var track = $('.slider__track', slider);
    var slides = $$('.slide', slider);
    var dotsWrap = $('.slider__dots', slider);
    var current = 0;
    var timer;

    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', function () { go(i); restart(); });
      dotsWrap.appendChild(d);
    });
    var dots = $$('button', dotsWrap);

    var go = function (i) {
      current = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-current * 100) + '%)';
      dots.forEach(function (d, k) {
        d.classList.toggle('is-active', k === current);
        d.setAttribute('aria-selected', String(k === current));
      });
    };
    var restart = function () {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(function () { go(current + 1); }, 5000);
    };

    $('.slider__btn--prev', slider).addEventListener('click', function () { go(current - 1); restart(); });
    $('.slider__btn--next', slider).addEventListener('click', function () { go(current + 1); restart(); });
    slider.addEventListener('mouseenter', function () { clearInterval(timer); });
    slider.addEventListener('mouseleave', restart);

    // swipe
    var startX = null;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
      startX = null;
      restart();
    });

    go(0);
    restart();
  }

  /* ---------- Lazy videos: load + play only when visible ---------- */
  var lazyVideos = $$('video.lazy-video');
  var loadVideo = function (v) {
    if (v.dataset.loaded) return;
    $$('source[data-src]', v).forEach(function (s) { s.src = s.dataset.src; });
    v.load();
    v.dataset.loaded = '1';
  };
  if ('IntersectionObserver' in window) {
    var vidObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          loadVideo(v);
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    lazyVideos.forEach(function (v) { vidObs.observe(v); });
  } else {
    lazyVideos.forEach(function (v) { loadVideo(v); v.play(); });
  }

  /* ---------- Reel sound toggles (one unmuted at a time) ---------- */
  var soundBtns = $$('.reel__sound');
  soundBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var v = $('video', btn.parentNode);
      var unmute = v.muted;
      soundBtns.forEach(function (b) {
        var ov = $('video', b.parentNode);
        ov.muted = true;
        $('use', b).setAttribute('href', '#i-sound');
        b.setAttribute('aria-label', 'Unmute video');
      });
      if (unmute) {
        v.muted = false;
        loadVideo(v);
        v.play();
        $('use', btn).setAttribute('href', '#i-sound-on');
        btn.setAttribute('aria-label', 'Mute video');
      }
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = $('#lightbox');
  var lbImg = $('img', lb);
  var lbCap = $('figcaption', lb);
  var lastFocus = null;
  var openLb = function (src, caption) {
    lastFocus = document.activeElement;
    lbImg.src = src;
    lbImg.alt = caption || '';
    lbCap.textContent = caption || '';
    lb.hidden = false;
    document.body.classList.add('no-scroll');
    $('.lightbox__close', lb).focus();
  };
  var closeLb = function () {
    lb.hidden = true;
    lbImg.src = '';
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  };
  $$('[data-lightbox]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openLb(el.dataset.lightbox, el.dataset.caption);
    });
  });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('.lightbox__close')) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!lb.hidden) closeLb();
    if (nav.classList.contains('is-open')) setNav(false);
  });

  /* ---------- Enquiry form → WhatsApp ---------- */
  var form = $('#waForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameField = form.elements.name;
      var name = nameField.value.trim();
      nameField.closest('.field').classList.toggle('is-invalid', !name);
      if (!name) { nameField.focus(); return; }
      var msg = 'Hi PureRoot, I am ' + name + '.\nInterested in: ' + form.elements.product.value;
      var extra = form.elements.message.value.trim();
      if (extra) msg += '\n' + extra;
      window.open(waLink(msg), '_blank', 'noopener');
    });
    form.elements.name.addEventListener('input', function () {
      this.closest('.field').classList.remove('is-invalid');
    });
  }

  /* ---------- WhatsApp tooltip nudge ---------- */
  var waFloat = $('.wa-float');
  setTimeout(function () {
    waFloat.classList.add('show-tip');
    setTimeout(function () { waFloat.classList.remove('show-tip'); }, 4500);
  }, 4000);
})();
