(()=>{'use strict';
document.documentElement.dataset.armReady='1';
const locale=document.body.dataset.lang||'ru';
const toastMessage={ru:'Страница установки появится после публикации расширения.',en:'Store links will appear when the extension is published.',tr:'Mağaza bağlantıları uzantı yayınlanınca eklenecek.'};
const toast=document.querySelector('.toast');let toastTimer;
function showToast(message){if(!toast)return;toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),3400)}
document.querySelectorAll('[data-store]').forEach(button=>button.addEventListener('click',()=>showToast(toastMessage[locale])));
const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}})}
document.documentElement.classList.add('js');
const motionToggle=document.querySelector('[data-motion-toggle]');
let storedMotionOff=false;try{storedMotionOff=localStorage.getItem('arm-motion-off')==='true'}catch(_error){}
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionText={ru:['Отключить анимации','Включить анимации'],en:['Pause animations','Play animations'],tr:['Animasyonları durdur','Animasyonları oynat']}[locale]||['Pause animations','Play animations'];
function updateMotion(off){document.body.classList.toggle('motion-off',off);if(motionToggle){motionToggle.setAttribute('aria-pressed',String(off));const label=off?motionText[1]:motionText[0];motionToggle.setAttribute('aria-label',label);motionToggle.title=label}}
updateMotion(storedMotionOff||reducedMotion);
if(motionToggle)motionToggle.addEventListener('click',()=>{const off=!document.body.classList.contains('motion-off');updateMotion(off);if(off)document.querySelectorAll('.reveal').forEach(node=>node.classList.add('in-view'));try{localStorage.setItem('arm-motion-off',String(off))}catch(_error){}});
const motionEnabled=!document.body.classList.contains('motion-off');
if('IntersectionObserver' in window&&motionEnabled){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}},{threshold:.07});document.querySelectorAll('.reveal').forEach(node=>observer.observe(node))}else document.querySelectorAll('.reveal').forEach(node=>node.classList.add('in-view'));
const compare=document.querySelector('[data-comparison]');if(compare){const slider=compare.querySelector('input[type=range]');const update=()=>compare.style.setProperty('--split',`${slider.value}%`);slider.addEventListener('input',update);update()}
function languageRoute(next,page){const base=next==='ru'?'':`/${next}`;const suffix=page==='home'?'/':page==='404'?'/':`/${page}/`;return base+suffix}
document.querySelectorAll('[data-language]').forEach(select=>select.addEventListener('change',()=>{location.href=languageRoute(select.value,select.dataset.page)}));
const header=document.getElementById('site-header');if(header&&'IntersectionObserver' in window){const sentinel=document.createElement('div');sentinel.style.cssText='position:absolute;top:0;height:1px;pointer-events:none';document.body.prepend(sentinel);new IntersectionObserver(entries=>{header.classList.toggle('scrolled',!entries[0].isIntersecting)}).observe(sentinel)}
})();
