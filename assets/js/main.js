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
    const target = href?.startsWith('#') ? document.querySelector(href) : null;
    if (target && ['leistungen', 'ablauf', 'projekte'].includes(target.id)) {
      event.preventDefault();
      const headerHeight = header.getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 48;
      window.history.pushState(null, '', `#${target.id}`);
      window.scrollTo({
        top: Math.max(0, top),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }
  }
});
document.querySelector('[data-year]').textContent = new Date().getFullYear();
