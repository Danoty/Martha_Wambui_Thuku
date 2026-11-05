const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
const links = [...nav.querySelectorAll('a')];
function updateNavigation() {
  let current = 'home';
  [...document.querySelectorAll('main section[id]')].filter(s => links.some(a => a.hash === '#' + s.id)).sort((a,b) => a.offsetTop-b.offsetTop).forEach(s => {if(s.getBoundingClientRect().top <= 150) current = s.id;});
  links.forEach(a => { const active = a.hash === '#' + current; a.classList.toggle('active',active); if(active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
}
window.addEventListener('scroll',updateNavigation,{passive:true}); updateNavigation();
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('marthathuku92@gmail.com'); status.textContent = 'Email address copied.'; }
  catch { status.textContent = 'Email: marthathuku92@gmail.com — select and copy this address.'; }
});
