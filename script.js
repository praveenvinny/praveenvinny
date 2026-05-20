(() => {
  'use strict';

  // ----- typewriter on the hero "whoami" output -----
  const target = document.querySelector('.type-target');
  if (target) {
    const text = target.dataset.text || '';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !text) {
      target.textContent = text;
    } else {
      let i = 0;
      target.textContent = '';
      const tick = () => {
        if (i <= text.length) {
          target.textContent = text.slice(0, i++);
          setTimeout(tick, 55);
        }
      };
      setTimeout(tick, 350);
    }
  }

  // ----- year in footer -----
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ----- dynamic duration since YYYY-MM (e.g. for volunteering tenure) -----
  document.querySelectorAll('[data-duration-since]').forEach((el) => {
    const m = el.dataset.durationSince.match(/^(\d{4})-(\d{1,2})$/);
    if (!m) return;
    const start = new Date(+m[1], +m[2] - 1, 1);
    const now = new Date();
    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (months < 0) return;
    const yrs = Math.floor(months / 12);
    const mos = months % 12;
    const parts = [];
    if (yrs) parts.push(`${yrs} yr${yrs === 1 ? '' : 's'}`);
    if (mos) parts.push(`${mos} mo${mos === 1 ? '' : 's'}`);
    el.textContent = parts.join(' ') || 'just started';
  });

  // ----- mobile nav toggle -----
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ----- active-section highlight in top nav -----
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const linkFor = (id) => document.querySelector(`.nav a[href="#${id}"]`);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((l) => l.style.color = '');
          const link = linkFor(e.target.id);
          if (link) link.style.color = 'var(--accent)';
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach((s) => io.observe(s));
  }
})();
