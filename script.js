'use strict';
document.body.classList.add('js-ready');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const links = [...nav.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.hash)).filter(Boolean);
function closeMenu(returnFocus = false) {
  const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('open');
  if (wasOpen && returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
});
links.forEach(a => a.addEventListener('click', () => {
  const wasOpen = nav.classList.contains('open');
  closeMenu();
  const target = document.querySelector(a.hash);
  if (wasOpen && target) { target.setAttribute('tabindex', '-1'); target.focus({preventScroll: true}); }
}));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(true); });
document.addEventListener('click', e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu(); });
nav.addEventListener('focusout', e => { if (!nav.contains(e.relatedTarget) && e.relatedTarget !== toggle) closeMenu(); });
const desktop = matchMedia('(min-width: 901px)');
desktop.addEventListener('change', () => closeMenu());
const progress = document.querySelector('.reading-progress');
let pending = false;
function updateReading() {
  pending = false;
  let current = 'home';
  sections.forEach(s => { if (s.getBoundingClientRect().top <= 160) current = s.id; });
  if (scrollY + innerHeight >= document.documentElement.scrollHeight - 5) current = 'contact';
  links.forEach(a => {
    const active = a.hash === '#' + current;
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  });
  const range = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? Math.max(0,Math.min(1,scrollY / range)) : 0})`;
}
function scheduleReading() { if (!pending) { pending = true; requestAnimationFrame(updateReading); } }
window.addEventListener('scroll', scheduleReading, {passive:true});
window.addEventListener('resize', scheduleReading);
window.addEventListener('load', scheduleReading);
updateReading();
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('marthathuku92@gmail.com'); status.textContent = 'Email address copied.'; }
  catch { status.textContent = 'Select and copy: marthathuku92@gmail.com'; }
});
const effectsToggle = document.querySelector('#effects-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let effectsOn = !reducedMotion.matches;
try { if (localStorage.getItem('mwt-effects') === 'off') effectsOn = false; } catch {}
function applyEffects() {
  document.body.classList.toggle('effects-off', !effectsOn);
  effectsToggle.setAttribute('aria-pressed', String(effectsOn));
  effectsToggle.setAttribute('aria-label', effectsOn ? 'Turn off sparkle effects' : 'Turn on sparkle effects');
}
effectsToggle.addEventListener('click', () => {
  effectsOn = !effectsOn; applyEffects();
  try { localStorage.setItem('mwt-effects', effectsOn ? 'on' : 'off'); } catch {}
});
reducedMotion.addEventListener('change', e => { if (e.matches) { effectsOn = false; applyEffects(); } });
applyEffects();
const sparkleLayer = document.querySelector('.sparkles');
for (let i = 0; i < 8; i++) {
  const star = document.createElement('span');
  star.style.cssText = `left:${(i * 37 + 11) % 100}%;top:${(i * 23 + 7) % 95}%;animation-delay:${-(i % 7)}s;animation-duration:${3 + i % 5}s`;
  sparkleLayer.append(star);
}
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const tools = [...document.querySelectorAll('[data-category]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  let count = 0;
  tools.forEach(tool => { tool.hidden = filter !== 'all' && tool.dataset.category !== filter; if (!tool.hidden) count++; });
  document.querySelector('#tool-status').textContent = filter === 'all' ? `Showing all ${count} tools.` : `Showing ${count} ${button.textContent.toLowerCase()} ${count === 1 ? 'tool' : 'tools'}.`;
}));
