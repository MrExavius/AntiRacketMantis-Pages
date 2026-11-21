// "Living meadow" background: sceneMarkup(variant) returns one inline SVG string.
// Styles, theme colours and all animation live in src/scene.css (classes only, no inline styles).
// Only one scene is rendered per page, so ids (scn-*) are unique.

const SUN = [1395, 260]; // sun / moon centre in the hero viewBox (top-right corner, half peeks out)
// Hill top y(x): valley level minus rises [height, centre, width, flatness]; flatness 4 gives a flat ledge.
const hill = (base, rises) => (x) => base - rises.reduce((s, [h, c, w, p = 2]) => s + h * Math.exp(-((Math.abs(x - c) / w) ** p)), 0);

// Closed hill shape: smooth top edge through sampled points (quadratic via midpoints), open to the bottom.
function edge(f, bottom, step = 80) {
  const p = [];
  for (let x = -40; x <= 1480; x += step) p.push([x, Math.round(f(x))]);
  let d = `M${p[0].join(' ')}`;
  for (let i = 1; i < p.length - 1; i++) {
    d += `Q${p[i].join(' ')} ${(p[i][0] + p[i + 1][0]) / 2} ${Math.round((p[i][1] + p[i + 1][1]) / 2)}`;
  }
  return `${d}L${p.at(-1).join(' ')}V${bottom}H-40z`;
}

// Six daisy petals as one path (rotated copies of one rounded petal).
function petals() {
  const pt = [[0, -3], [-6, -8], [-5, -15], [0, -15], [6, -8]];
  let d = '';
  for (let k = 0; k < 6; k++) {
    const a = (k * Math.PI) / 3, c = Math.cos(a), s = Math.sin(a);
    const q = pt.map(([x, y]) => `${Math.round(x * c - y * s)} ${Math.round(x * s + y * c)}`);
    d += `M${q[0]}C${q[1]} ${q[2]} ${q[3]}S${q[4]} ${q[0]}z`;
  }
  return d;
}

function rays(n, r1, r2) {
  let d = '';
  for (let k = 0; k < n; k++) {
    const a = (k * 2 * Math.PI) / n, c = Math.cos(a), s = Math.sin(a);
    d += `M${Math.round(SUN[0] + r1 * c)} ${Math.round(SUN[1] + r1 * s)}l${Math.round((r2 - r1) * c)} ${Math.round((r2 - r1) * s)}`;
  }
  return d;
}

const grad = (id, cls, extra = '') =>
  `<linearGradient id="scn-${id}" class="scn-g ${cls}"${extra}><stop/><stop offset="1"/></linearGradient>`;

// Animated pieces sit in a translated <g> so their transform-origin is the local base point (use x/y would shift the pivot).
const sway = (id, x, y, c) => `<g transform="translate(${x} ${y})"><use href="#scn-t${id}" class="scn-sw ${c}"/></g>`;
const far = (x, y) => `<use href="#scn-t2" x="${x}" y="${y}" class="scn-far"/>`;
const daisy = (x, y, s) => `<use href="#scn-fl" transform="translate(${x} ${y}) scale(${s})"/>`;
const leaf = (x, y, cls) => `<g transform="translate(${x} ${y})"><use href="#scn-l" class="scn-lf ${cls}"/></g>`;
const dot = (x, y, cls) => `<circle cx="${x}" cy="${y}" r="3.5" class="scn-dt ${cls}"/>`;
const cloud = (x, y, s, cls) => `<g class="scn-cl ${cls}"><use href="#scn-c" transform="translate(${x} ${y}) scale(${s})"/></g>`;
const onHill = (f, list, mk) => list.map(([x, ...r]) => mk(x, Math.round(f(x)) + 3, ...r)).join('');

// Shared symbols (only the ones a variant uses).
const defs = (v) => `<defs>${[
  grad('gh1', 'g-hb', ' x2="0" y2="1"'), v === 'hero' ? grad('gh2', 'g-hm', ' x2="0" y2="1"') : '', grad('gh3', 'g-hf', ' x2="0" y2="1"'),
  grad('gb', 'g-bl', ' x1="0" y1="1" x2="0" y2="0"'),
  v === 'hero' ? grad('gs', 'g-sun', ' x2="1" y2="1"') : '',
  v === 'hero' ? '<radialGradient id="scn-gw" class="scn-g g-wash"><stop stop-opacity=".3"/><stop offset="1" stop-opacity="0"/></radialGradient>' : '',
  grad('gc', 'g-cl', ' x1="0" y1="0" x2="0" y2="66" gradientUnits="userSpaceOnUse"'),
  '<path id="scn-b" class="scn-o" fill="url(#scn-gb)" d="M0 0Q-11-20-1-46Q12-22 0 0z"/>',
  '<g id="scn-t1"><use href="#scn-b" transform="rotate(-26) scale(.8)"/><use href="#scn-b" transform="rotate(24) scale(.9)"/><use href="#scn-b" transform="scale(1 1.1)"/></g>',
  '<g id="scn-t2"><use href="#scn-b" transform="rotate(-20) scale(.55)"/><use href="#scn-b" transform="rotate(18) scale(.6)"/><use href="#scn-b" transform="scale(.7 .75)"/></g>',
  `<g id="scn-fl"><path class="scn-o" fill="none" d="M0 0Q-4-12 0-28"/><path class="scn-o scn-pt" transform="translate(0 -30)" d="${petals()}"/><circle class="scn-o scn-ct" cy="-30" r="4.5"/></g>`,
  '<g id="scn-cs"><rect x="14" y="40" width="172" height="26" rx="13"/><circle cx="46" cy="44" r="22"/><circle cx="88" cy="32" r="32"/><circle cx="132" cy="38" r="28"/><circle cx="164" cy="50" r="20"/></g>',
  '<g id="scn-c"><use href="#scn-cs" class="scn-co"/><use href="#scn-cs" fill="url(#scn-gc)"/></g>',
  '<g id="scn-l"><path class="scn-o scn-lv" d="M7-4Q-17-14-17 8Q3 15 17 0z"/><path class="scn-vn" d="M-9 4Q0 5 8-1"/></g>',
  v === 'hero' ? `<path id="scn-ry" fill="none" d="${rays(12, 80, 102)}"/>` : ''
].join('')}</defs>`;

function hero() {
  const back = hill(520, [[60, 1060, 300], [40, 230, 260], [70, 1430, 200], [20, 620, 120]]);
  const mid = hill(600, [[50, 330, 230], [75, 840, 250], [45, 1300, 220]]);
  const front = hill(715, [[75, 560, 330, 4], [60, 1250, 300], [40, 30, 220]]);
  const [sx, sy] = SUN;
  return `<svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMax slice" focusable="false">${defs('hero')}` +
    `<g class="scn-sky"><circle class="scn-day" cx="${sx}" cy="${sy}" r="210" fill="url(#scn-gw)"/>` +
    `<g class="scn-day"><g class="scn-rays"><use href="#scn-ry" class="scn-ro"/><use href="#scn-ry" class="scn-ri"/></g>` +
    `<circle class="scn-o" cx="${sx}" cy="${sy}" r="60" fill="url(#scn-gs)"/></g>` +
    `<path class="scn-o scn-night" transform="translate(${sx - 25} ${sy}) rotate(-24) scale(1.15)" fill="url(#scn-gs)" d="M30-40A50 50 0 1 0 30 40A41 41 0 0 1 30-40z"/></g>` +
    cloud(40, 95, .9, 'c1') + cloud(560, 40, .7, 'c2') + cloud(1120, 330, .6, 'c3') +
    `<path class="scn-o scn-hb" fill="url(#scn-gh1)" d="${edge(back, 780)}"/>` +
    onHill(back, [[60], [330], [560], [820], [1010], [1190], [1400]], far) +
    `<path class="scn-o scn-hm" fill="url(#scn-gh2)" d="${edge(mid, 780)}"/>` +
    onHill(mid, [[160, 's2'], [640, 's4'], [1110, 's1']], (x, y, c) => sway(2, x, y, c)) +
    onHill(mid, [[420, .8], [1020, .9]], (x, y, s) => daisy(x, y, s)) +
    `<path class="scn-o scn-hf" fill="url(#scn-gh3)" d="${edge(front, 780)}"/>` +
    onHill(front, [[70, 's3'], [240, 's1'], [880, 's5'], [1050, 's2'], [1300, 's4']], (x, y, c) => sway(1, x, y, c)) +
    onHill(front, [[150, 1], [835, 1.1], [1250, 1]], (x, y, s) => daisy(x, y, s)) +
    leaf(720, 120, 'k1') + leaf(1060, 360, 'k2 lb') + leaf(980, 40, 'k3 lb') + leaf(1300, 290, 'k4') +
    dot(330, 420, 't1') + dot(790, 330, 't2') + dot(1040, 470, 't3') + dot(560, 520, 't4') +
    dot(180, 580, 'scn-ff t3') + dot(700, 610, 'scn-ff t1') + dot(960, 540, 'scn-ff t4') + dot(1320, 520, 'scn-ff t2') +
    '</svg>';
}

// Low strip for inner-page heroes: only the bottom ~180 units of the 1440x320 viewBox show on desktop.
function page() {
  const back = hill(228, [[35, 1000, 260], [30, 250, 240], [20, 640, 120]]);
  const front = hill(272, [[30, 120, 220], [40, 1250, 260]]);
  return `<svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" focusable="false">${defs('page')}` +
    cloud(800, 140, .7, 'c2') +
    `<path class="scn-o scn-hb" fill="url(#scn-gh1)" d="${edge(back, 340)}"/>` +
    onHill(back, [[80], [420], [760], [1180], [1380]], far) +
    onHill(back, [[560, .8]], (x, y, s) => daisy(x, y, s)) +
    `<path class="scn-o scn-hf" fill="url(#scn-gh3)" d="${edge(front, 340)}"/>` +
    onHill(front, [[90, 's1'], [330, 's3'], [700, 's2'], [1030, 's4']], (x, y, c) => sway(1, x, y, c)) +
    onHill(front, [[230, 1], [880, 1.1]], (x, y, s) => daisy(x, y, s)) +
    leaf(300, 160, 'k1') + leaf(1000, 150, 'k2 lb') +
    dot(520, 205, 't1') + dot(1140, 190, 't3') +
    dot(760, 235, 'scn-ff t4') +
    '</svg>';
}

export function sceneMarkup(variant = 'hero') {
  const v = variant === 'page' ? 'page' : 'hero';
  return `<div class="scene scene-${v}" aria-hidden="true">${v === 'page' ? page() : hero()}</div>`;
}
