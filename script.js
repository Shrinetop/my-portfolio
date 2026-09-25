/**
 * Portfolio interactions: accessibility settings, theme toggle, adaptive
 * resume downloads, mobile navigation, active-section highlighting,
 * scroll reveal and the pointer-following glass highlight.
 */
(function () {
  'use strict';

  const root = document.documentElement;
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  const header = $('.site-header');
  const navToggle = $('.nav__toggle');
  const navMenu = $('#nav-menu');
  const navLinks = $$('.nav__link');
  const themeToggle = $('.theme-toggle');
  const sections = $$('main section[id]');
  const panel = $('#a11y-panel');
  const panelForm = $('form', panel);
  const panelOpeners = $$('[data-open-a11y]');
  const statusRegion = $('[data-a11y-status]');

  const media = {
    dark: window.matchMedia('(prefers-color-scheme: dark)'),
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
    reducedTransparency: window.matchMedia('(prefers-reduced-transparency: reduce)'),
    desktopNav: window.matchMedia('(min-width: 900px)'),
    finePointer: window.matchMedia('(hover: hover) and (pointer: fine)'),
  };

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
     Accessibility settings (shared with resume.html via localStorage)
     --------------------------------------------------------------------- */
  const SETTINGS_KEY = 'a11y-settings';
  const VISIONS = ['default', 'protan-deutan', 'tritan', 'mono'];
  const DEFAULTS = {
    vision: 'default',
    dyslexia: false,
    reduceTransparency: false,
    reduceMotion: false,
  };

  const RESUMES = {
    standard: { href: 'assets/resume/Krishal_Maharjan_Resume.pdf', note: '' },
    dyslexia: { href: 'assets/resume/Krishal_Maharjan_Resume_Dyslexia_Friendly.pdf', note: 'Dyslexia-friendly' },
    contrast: { href: 'assets/resume/Krishal_Maharjan_Resume_High_Contrast.pdf', note: 'High contrast' },
  };

  function loadSettings() {
    let saved;
    try {
      saved = JSON.parse(storage.get(SETTINGS_KEY)) || {};
    } catch (err) {
      saved = {};
    }
    return {
      vision: VISIONS.includes(saved.vision) ? saved.vision : DEFAULTS.vision,
      dyslexia: saved.dyslexia === true,
      reduceTransparency: saved.reduceTransparency === true,
      reduceMotion: saved.reduceMotion === true,
    };
  }

  let settings = loadSettings();

  const motionReduced = () => settings.reduceMotion || media.reducedMotion.matches;
  const transparencyReduced = () => settings.reduceTransparency || media.reducedTransparency.matches;

  function setRootAttr(name, value) {
    if (value) {
      root.setAttribute(name, value);
    } else {
      root.removeAttribute(name);
    }
  }

  /** Which resume PDF best fits the current settings. */
  function resumeKey() {
    if (settings.dyslexia) return 'dyslexia';
    if (settings.vision !== 'default') return 'contrast';
    return 'standard';
  }

  function updateResumeLinks() {
    const key = resumeKey();
    const resume = RESUMES[key];

    $$('[data-resume-link]').forEach(function (link) {
      link.setAttribute('href', resume.href);
    });

    $$('[data-resume-note]').forEach(function (note) {
      if (!resume.note) {
        note.textContent = '';
      } else if (note.classList.contains('visually-hidden')) {
        note.textContent = ' (' + resume.note + ')';
      } else {
        note.textContent = resume.note;
      }
    });

    $$('[data-resume-option]').forEach(function (option) {
      const isMatch = key !== 'standard' && option.dataset.resumeOption.split(' ').includes(key);
      const badge = $('[data-match-badge]', option);
      option.classList.toggle('is-match', isMatch);
      if (badge) badge.hidden = !isMatch;
    });
  }

  function syncSystemSwitch(input, userValue, systemValue) {
    const desc = document.getElementById(input.getAttribute('aria-describedby'));
    if (!desc.dataset.base) desc.dataset.base = desc.textContent;

    input.checked = userValue || systemValue;
    input.disabled = systemValue;
    desc.textContent = systemValue
      ? desc.dataset.base + ' On because of your device settings.'
      : desc.dataset.base;
  }

  function syncControls() {
    const fields = panelForm.elements;
    fields.vision.value = settings.vision;
    fields.dyslexia.checked = settings.dyslexia;
    syncSystemSwitch(fields.reduceTransparency, settings.reduceTransparency, media.reducedTransparency.matches);
    syncSystemSwitch(fields.reduceMotion, settings.reduceMotion, media.reducedMotion.matches);
  }

  function applySettings() {
    setRootAttr('data-vision', settings.vision !== 'default' && settings.vision);
    setRootAttr('data-dyslexia', settings.dyslexia && 'true');
    setRootAttr('data-transparency', transparencyReduced() && 'reduced');
    setRootAttr('data-motion', motionReduced() && 'reduced');
    updateResumeLinks();
    syncControls();
    if (motionReduced()) revealAll();
  }

  function saveSettings() {
    storage.set(SETTINGS_KEY, JSON.stringify(settings));
  }

  panelForm.addEventListener('change', function (event) {
    const input = event.target;
    if (input.name === 'vision') {
      settings[input.name] = input.value;
    } else if (input.name in DEFAULTS) {
      settings[input.name] = input.checked;
    } else {
      return;
    }
    saveSettings();
    applySettings();
  });

  $('[data-reset-a11y]', panelForm).addEventListener('click', function () {
    settings = Object.assign({}, DEFAULTS);
    saveSettings();
    applySettings();
    statusRegion.textContent = 'Accessibility settings reset.';
  });

  /* Panel open / close. <dialog> handles focus trapping, Escape and focus return. */
  function setPanelExpanded(expanded) {
    panelOpeners.forEach(function (button) {
      button.setAttribute('aria-expanded', String(expanded));
    });
  }

  panelOpeners.forEach(function (button) {
    button.addEventListener('click', function () {
      setMenu(false);
      statusRegion.textContent = '';
      if (typeof panel.showModal === 'function') {
        panel.showModal();
      } else {
        panel.setAttribute('open', '');
      }
      setPanelExpanded(true);
    });
  });

  panel.addEventListener('close', function () {
    setPanelExpanded(false);
  });

  // Clicking the dimmed backdrop (the dialog itself, outside the form) closes it.
  panel.addEventListener('click', function (event) {
    if (event.target === panel) panel.close();
  });

  /* ---------------------------------------------------------------------
     Theme
     --------------------------------------------------------------------- */
  function currentTheme() {
    return root.getAttribute('data-theme') || (media.dark.matches ? 'dark' : 'light');
  }

  function updateThemeToggle() {
    const label = 'Switch to ' + (currentTheme() === 'dark' ? 'light' : 'dark') + ' theme';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  }

  themeToggle.addEventListener('click', function () {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    storage.set('theme', next);
    updateThemeToggle();
  });

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

  $$('a', navMenu).forEach(function (link) {
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
    if (isMenuOpen() && !header.contains(event.target)) setMenu(false);
  });

  media.desktopNav.addEventListener('change', function (event) {
    if (event.matches) setMenu(false);
  });

  /* ---------------------------------------------------------------------
     Header state + active nav link (scroll-driven, rAF-throttled)
     --------------------------------------------------------------------- */
  function updateActiveLink() {
    const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const marker = window.scrollY + window.innerHeight * 0.4;

    let current = sections[0];
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top + window.scrollY <= marker) current = section;
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

  /* ---------------------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------------------- */
  const revealEls = $$('.reveal');
  let revealObserver = null;

  function revealAll() {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
    if (revealObserver) revealObserver.disconnect();
  }

  if ('IntersectionObserver' in window && !motionReduced()) {
    revealObserver = new IntersectionObserver(
      function (entries, observer) {
        // Stagger elements that enter together (e.g. a row of cards).
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealAll();
  }

  /* ---------------------------------------------------------------------
     Pointer-following highlight on interactive glass
     --------------------------------------------------------------------- */
  if (media.finePointer.matches) {
    document.addEventListener(
      'pointermove',
      function (event) {
        const card = event.target instanceof Element && event.target.closest('.glass--interactive');
        if (!card || motionReduced()) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', event.clientX - rect.left + 'px');
        card.style.setProperty('--my', event.clientY - rect.top + 'px');
      },
      { passive: true }
    );
  }

  /* ---------------------------------------------------------------------
     Init
     --------------------------------------------------------------------- */
  media.dark.addEventListener('change', updateThemeToggle);
  media.reducedMotion.addEventListener('change', applySettings);
  media.reducedTransparency.addEventListener('change', applySettings);

  applySettings();
  updateThemeToggle();
  onScroll();

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
