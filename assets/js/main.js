const header = document.querySelector('[data-header]');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
const rebuildSlider = document.querySelector('[data-rebuild-slider]');
const rebuildTrack = rebuildSlider?.querySelector('.rebuild__track');
const rebuildSlides = rebuildSlider ? [...rebuildSlider.querySelectorAll('[data-rebuild-slide]')] : [];
const rebuildControls = rebuildSlider ? [...rebuildSlider.querySelectorAll('[data-rebuild-to]')] : [];
let activeRebuildSlide = 0;

const setRebuildSlide = index => {
  if (!rebuildTrack || !rebuildSlides[index]) return;
  activeRebuildSlide = index;
  rebuildTrack.style.transform = `translateX(-${index * 100}%)`;
  rebuildControls.forEach(control => {
    control.setAttribute('aria-pressed', String(Number(control.dataset.rebuildTo) === index));
  });
};

rebuildControls.forEach(control => {
  control.addEventListener('click', () => setRebuildSlide(Number(control.dataset.rebuildTo)));
});

const rebuildSlideFromHash = () => {
  const slideIndex = rebuildSlides.findIndex(slide => `#${slide.id}` === window.location.hash);
  if (slideIndex >= 0) setRebuildSlide(slideIndex);
};

rebuildSlideFromHash();
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
  '#grund': '#grund .rebuild__copy .label',
  '#teilgrund': '#teilgrund .rebuild__copy .label',
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
  const rebuildSlide = target.closest('[data-rebuild-slide]');
  if (rebuildSlide) setRebuildSlide(rebuildSlides.indexOf(rebuildSlide));
  window.history.pushState(null, '', href);
  window.requestAnimationFrame(() => {
    const headerHeight = header.getBoundingClientRect().height;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  });
});
document.querySelector('[data-year]').textContent = new Date().getFullYear();
