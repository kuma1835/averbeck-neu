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

    const href = link.getAttribute('href');
    const anchorTargets = {
      '#leistungen': '.problem__lead .label',
      '#ablauf': '.process__head .label',
      '#projekte': '.work__head .label'
    };
    const target = anchorTargets[href] ? document.querySelector(anchorTargets[href]) : null;
    if (target) {
      event.preventDefault();
      const headerHeight = header.getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 48;
      window.history.pushState(null, '', href);
      window.scrollTo({
        top: Math.max(0, top),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }
  }
});
document.querySelector('[data-year]').textContent = new Date().getFullYear();
