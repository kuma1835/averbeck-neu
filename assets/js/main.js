const header = document.querySelector('[data-header]');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
const updateHeader = () => header.classList.toggle('is-stuck', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  header.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (link) {
    menu.setAttribute('aria-expanded', 'false');
    header.classList.remove('is-open');
  }
});

const anchorTargets = {
  '#leistungen': '.problem__lead .label',
  '#ablauf': '.process__head .label',
  '#grund': '.rebuild__copy .label',
  '#beregnung': '.water__head .label',
  '#projekte': '.work__head .label',
  '#standorte': '.locations__intro .label'
};

document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const href = link.getAttribute('href');
  const target = anchorTargets[href]
    ? document.querySelector(anchorTargets[href])
    : document.getElementById(href.slice(1));

  if (!target) return;

  event.preventDefault();
  const headerHeight = header.getBoundingClientRect().height;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
  window.history.pushState(null, '', href);
  window.scrollTo({
    top: Math.max(0, top),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -8%' });

  document.querySelectorAll('main > section:not(.hero)').forEach(section => {
    section.classList.add('reveal-on-scroll');
    revealObserver.observe(section);
  });
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();
