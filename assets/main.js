(() => {
'use strict';
const locale = document.body.dataset.lang || 'ru';
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
const toastMessage = {
ru: 'Страница в магазине браузера появится после публикации расширения. Подробная инструкция доступна в разделе «Установка».',
en: 'Store links will appear when the extension is published.',
tr: 'Mağaza bağlantıları uzantı yayınlanınca eklenecek.'
};
const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
if (!toast) return;
toast.textContent = message;
toast.classList.add('visible');
clearTimeout(toastTimer);
toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000);
}
document.querySelectorAll('[data-store]').forEach(button => {
button.addEventListener('click', () => showToast(toastMessage[locale] || toastMessage.ru));
});
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const menuText = {
ru: ['Открыть меню', 'Закрыть меню'],
en: ['Open menu', 'Close menu'],
tr: ['Menüyü aç', 'Menüyü kapat']
}[locale] || ['Открыть меню', 'Закрыть меню'];
function setMenuState(open, restoreFocus = false) {
if (!menu || !nav) return;
nav.classList.toggle('open', open);
menu.setAttribute('aria-expanded', String(open));
const label = open ? menuText[1] : menuText[0];
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
const firstLink = nav.querySelector('a');
if (firstLink) firstLink.focus();
}
});
nav.querySelectorAll('a').forEach(a => {
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
if (nav.classList.contains('open') && window.innerWidth > 950) setMenuState(false);
});
}
const motionText = {
ru: ['Отключить анимации', 'Включить анимации'],
en: ['Pause animations', 'Play animations'],
tr: ['Animasyonları durdur', 'Animasyonları oynat']
}[locale] || ['Отключить анимации', 'Включить анимации'];
function updateMotion(off) {
document.body.classList.toggle('motion-off', off);
if (motionToggle) {
motionToggle.setAttribute('aria-pressed', String(off));
const label = off ? motionText[1] : motionText[0];
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
function languageRoute(next, page) {
const base = next === 'ru' ? '' : `/${next}`;
const suffix = page === 'home' ? '/' : page === '404' ? '/' : `/${page}/`;
return base + suffix;
}
document.querySelectorAll('[data-language]').forEach(select => {
select.addEventListener('change', () => {
location.href = languageRoute(select.value, select.dataset.page);
});
});
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