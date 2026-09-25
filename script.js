/**
 * Portfolio interactions: theme toggle, mobile navigation, header state,
 * active-section highlighting and scroll-reveal animations.
 */
(function () {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = Array.from(document.querySelectorAll('.nav__link'));
  const themeToggle = document.querySelector('.theme-toggle');
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopNav = window.matchMedia('(min-width: 768px)');

  /* ---------------------------------------------------------------------
     Storage — localStorage can throw (private mode, blocked site data).
     --------------------------------------------------------------------- */
  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (err) {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (err) {
        /* Preference just won't persist. */
      }
    },
  };

  /* ---------------------------------------------------------------------
     Theme
     --------------------------------------------------------------------- */
  function currentTheme() {
    return root.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light');
  }

  function updateThemeToggle() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    const label = 'Switch to ' + next + ' theme';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  }

  themeToggle.addEventListener('click', function () {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    storage.set('theme', next);
    updateThemeToggle();
  });

  prefersDark.addEventListener('change', updateThemeToggle);
  updateThemeToggle();

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */
  function isMenuOpen() {
    return navToggle.getAttribute('aria-expanded') === 'true';
  }

  function setMenu(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navMenu.classList.toggle('is-open', open);
  }

  navToggle.addEventListener('click', function () {
    setMenu(!isMenuOpen());
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isMenuOpen()) {
      setMenu(false);
      navToggle.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (isMenuOpen() && !header.contains(event.target)) {
      setMenu(false);
    }
  });

  desktopNav.addEventListener('change', function (event) {
    if (event.matches) setMenu(false);
  });

  /* ---------------------------------------------------------------------
     Header shadow + active nav link (scroll-driven, rAF-throttled)
     --------------------------------------------------------------------- */
  function updateActiveLink() {
    const scrollBottom = window.scrollY + window.innerHeight;
    const atPageEnd = scrollBottom >= document.documentElement.scrollHeight - 2;
    const marker = window.scrollY + window.innerHeight * 0.4;

    let current = sections[0];
    sections.forEach(function (section) {
      const top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= marker) current = section;
    });
    if (atPageEnd) current = sections[sections.length - 1];

    navLinks.forEach(function (link) {
      const isActive = link.hash === '#' + current.id;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      updateActiveLink();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------------------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------------------- */
  const revealEls = Array.from(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window) || prefersReducedMotion.matches) {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        // Stagger elements that enter the viewport together (e.g. a row of cards).
        entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .forEach(function (entry, index) {
            entry.target.style.setProperty('--reveal-delay', index * 90 + 'ms');
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
