(() => {
  'use strict';
  const locale = document.body.dataset.lang || 'ru';
  const page = document.body.dataset.page || 'home';
  const motionToggle = document.querySelector('[data-motion-toggle]');
  let storedMotionOff = false;
  try {
    storedMotionOff = localStorage.getItem('arm-motion-off') === 'true';
  } catch (_error) {}
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const initialMotionOff = storedMotionOff || reducedMotion;

  const reveals = document.querySelectorAll('.reveal');

  document.documentElement.dataset.armReady = '1';
  document.documentElement.classList.add('js');

  // Inert analytics hook: sends nothing and sets no cookies unless a future approved provider is wired.
  function track(_eventName, _payload) {
    return undefined;
  }

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-event]');
    if (!el) return;
    track(el.dataset.event, {
      lang: locale,
      page,
      store: el.dataset.store || undefined,
      targetLang: el.dataset.targetLang || undefined
    });
  });

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const openLabel = menu?.dataset.labelOpen || 'Open menu';
  const closeLabel = menu?.dataset.labelClose || 'Close menu';

  function setMenuState(open, restoreFocus = false) {
    if (!menu || !nav) return;
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    const label = open ? closeLabel : openLabel;
    menu.setAttribute('aria-label', label);
    menu.title = label;
    if (!open && restoreFocus) menu.focus();
  }

  if (menu && nav) {
    setMenuState(false);
    menu.addEventListener('click', () => {
      const next = !nav.classList.contains('open');
      setMenuState(next);
      if (next) {
        const firstLink = nav.querySelector('a[href]');
        if (firstLink) firstLink.focus();
      }
    });
    nav.querySelectorAll('a[href]').forEach(a => {
      a.addEventListener('click', () => setMenuState(false));
    });
    document.addEventListener('click', e => {
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(e.target) && !menu.contains(e.target)) {
        setMenuState(false);
      }
    });
    document.addEventListener('keydown', e => {
      if (!nav.classList.contains('open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuState(false, true);
        return;
      }
      if (e.key === 'Tab') {
        const links = [...nav.querySelectorAll('a[href]')];
        if (!links.length) return;
        const firstLink = links[0];
        const lastLink = links[links.length - 1];
        if (document.activeElement === menu) {
          e.preventDefault();
          (e.shiftKey ? lastLink : firstLink).focus();
        } else if (e.shiftKey && document.activeElement === firstLink) {
          e.preventDefault();
          menu.focus();
        } else if (!e.shiftKey && document.activeElement === lastLink) {
          e.preventDefault();
          menu.focus();
        }
      }
    });
    window.addEventListener('resize', () => {
      if (nav.classList.contains('open') && window.innerWidth > 1300) setMenuState(false);
    });
  }

  const motionLabelOff = motionToggle?.dataset.labelOff || 'Pause animations';
  const motionLabelOn = motionToggle?.dataset.labelOn || 'Play animations';

  function updateMotion(off) {
    document.body.classList.toggle('motion-off', off);
    if (motionToggle) {
      motionToggle.setAttribute('aria-pressed', String(off));
      const label = off ? motionLabelOn : motionLabelOff;
      motionToggle.setAttribute('aria-label', label);
      motionToggle.title = label;
    }
  }
  updateMotion(initialMotionOff);

  if (motionToggle) {
    motionToggle.addEventListener('click', () => {
      const off = !document.body.classList.contains('motion-off');
      updateMotion(off);
      if (off) document.querySelectorAll('.reveal').forEach(node => node.classList.add('in-view'));
      try {
        localStorage.setItem('arm-motion-off', String(off));
      } catch (_error) {}
    });
  }

  if ('IntersectionObserver' in window && !initialMotionOff) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0, rootMargin: '140px 0px' });
    reveals.forEach(node => observer.observe(node));
    setTimeout(() => document.documentElement.classList.add('reveal-safe'), 900);
  } else {
    reveals.forEach(node => node.classList.add('in-view'));
  }

  const compare = document.querySelector('[data-comparison]');
  if (compare) {
    const slider = compare.querySelector('input[type=range]');
    if (slider) {
      const update = () => compare.style.setProperty('--split', `${slider.value}%`);
      slider.addEventListener('input', update);
      update();
    }
  }

  const header = document.getElementById('site-header');
  if (header && 'IntersectionObserver' in window) {
    const sentinel = document.createElement('div');
    sentinel.className = 'scroll-sentinel';
    sentinel.setAttribute('aria-hidden', 'true');
    document.body.prepend(sentinel);
    new IntersectionObserver(entries => {
      header.classList.toggle('scrolled', !entries[0].isIntersecting);
    }).observe(sentinel);
  }
})();
