/* Niva Medical Clinic — small progressive enhancements. The page works without this file. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile navigation */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) toggle.click();
    });
  }

  /* Back to top: appears after scrolling 600px */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    var onScroll = function () { toTop.classList.toggle('is-visible', (window.scrollY || document.documentElement.scrollTop) > 600); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      var skip = document.querySelector('.skip-link');
      if (skip) skip.focus({ preventScroll: true });
    });
  }

  /* Services accordion: one row open at a time.
     Mouse: hovering a row opens it (it stays open until another row is hovered,
     so the list doesn't jump under the pointer). Touch and keyboard (Enter/Space):
     the button toggles its row. */
  document.querySelectorAll('[data-accordion]').forEach(function (list) {
    var items = Array.prototype.slice.call(list.querySelectorAll('.svc'));
    function open(item) {
      items.forEach(function (it) {
        var on = it === item;
        it.classList.toggle('is-open', on);
        it.querySelector('.svc-btn').setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    }
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    items.forEach(function (item) {
      var btn = item.querySelector('.svc-btn');
      btn.addEventListener('click', function () {
        if (canHover) { open(item); return; }
        if (item.classList.contains('is-open')) {
          item.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false');
        } else { open(item); }
      });
      if (canHover) item.addEventListener('mouseenter', function () { open(item); });
    });
  });

  /* Review carousel: duplicate the cards once so the loop is seamless */
  if (!reduce) {
    document.querySelectorAll('.marquee-track').forEach(function (track) {
      Array.prototype.slice.call(track.children).forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    });
  }

  /* Reveal on scroll + counter */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        var num = en.target.querySelector('[data-count]');
        if (num && !num.dataset.done) {
          num.dataset.done = '1';
          var to = parseInt(num.dataset.count, 10), start = null;
          if (reduce) { num.textContent = to; return; }
          (function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / 1500, 1);
            num.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
          })(performance.now());
        }
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
  /* Gallery slider arrows */
  var slider = document.querySelector('.gallery-grid');
  var prevBtn = document.querySelector('[data-slider-prev]');
  var nextBtn = document.querySelector('[data-slider-next]');
  if (slider && prevBtn && nextBtn) {
    function step() { return Math.max(240, slider.clientWidth * 0.8); }
    function updateArrows() {
      prevBtn.disabled = slider.scrollLeft <= 2;
      nextBtn.disabled = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 2;
    }
    prevBtn.addEventListener('click', function () { slider.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
    nextBtn.addEventListener('click', function () { slider.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });
    slider.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
  }

  /* Gallery lightbox */
  var lb = document.getElementById('lightbox');
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (lb && links.length && typeof lb.showModal === 'function') {
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('figcaption'), current = 0;
    function show(i) {
      current = (i + links.length) % links.length;
      lbImg.src = links[current].getAttribute('href');
      lbImg.alt = links[current].getAttribute('data-caption') || '';
      lbCap.textContent = lbImg.alt;
    }
    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); show(i); lb.showModal(); });
    });
    lb.querySelector('[data-lightbox-close]').addEventListener('click', function () { lb.close(); });
    lb.querySelector('[data-lightbox-prev]').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('[data-lightbox-next]').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
