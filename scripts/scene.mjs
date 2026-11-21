// "Living meadow" background: sceneMarkup(variant) returns two inline SVG layers (class .scene each):
//   sky    - sun / moon, clouds, pollen, fireflies: fixed px size, pinned to the top-right corner;
//   ground - hills, grass, daisies, drifting leaves: a wide viewBox (GW) in a bottom band of fixed height with
//            "xMidYMax slice", so the scale stays constant on wide screens and only the sides get cropped.
// Styles, theme colours and all animation live in src/scene.css (classes only, no inline styles).
// Only one scene is rendered per page, so ids (scn-*) are unique across both layers.
// CSS contract (src/home.css, src/inner.css): ground height H = var(--ground-h); highest hill line = 0.77 H (hero) /
// 0.72 H (page) above the bottom edge, front hill line (where Minty stands) = 0.19 H / 0.2 H above it.

const GW = 3200; // ground viewBox width
const SUN = [532, 84]; // sun / moon centre in the sky viewBox (620 wide, 1 unit = 1px on desktop)
// Hill top y(x): valley level minus rises [height, centre, width, flatness]; flatness 4 gives a flat ledge.
const hill = (base, rises) => (x) => base - rises.reduce((s, [h, c, w, p = 2]) => s + h * Math.exp(-((Math.abs(x - c) / w) ** p)), 0);

// Closed hill shape: smooth top edge through sampled points (quadratic via midpoints), open to the bottom.
function edge(f, bottom, step = 120) {
  const p = [];
  for (let x = -40; x <= GW + 40; x += step) p.push([x, Math.round(f(x))]);
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
const svg = (w, h, inner) => `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax slice" focusable="false">${inner}</svg>`;
const layer = (kind, inner) => `<div class="scene scene-${kind}" aria-hidden="true">${inner}</div>`;

// Sky symbols: sun gradient and glow (hero only), cloud.
const skyDefs = (v) => `<defs>${[
  v === 'hero' ? grad('gs', 'g-sun', ' x2="1" y2="1"') : '',
  v === 'hero' ? '<radialGradient id="scn-gw" class="scn-g g-wash"><stop stop-opacity=".3"/><stop offset="1" stop-opacity="0"/></radialGradient>' : '',
  grad('gc', 'g-cl', ' x1="0" y1="0" x2="0" y2="66" gradientUnits="userSpaceOnUse"'),
  '<g id="scn-cs"><rect x="14" y="40" width="172" height="26" rx="13"/><circle cx="46" cy="44" r="22"/><circle cx="88" cy="32" r="32"/><circle cx="132" cy="38" r="28"/><circle cx="164" cy="50" r="20"/></g>',
  '<g id="scn-c"><use href="#scn-cs" class="scn-co"/><use href="#scn-cs" fill="url(#scn-gc)"/></g>',
  v === 'hero' ? `<path id="scn-ry" fill="none" d="${rays(12, 60, 80)}"/>` : ''
].join('')}</defs>`;

// Ground symbols: hill gradients, grass blade and tufts, daisy, leaf.
const groundDefs = (v) => `<defs>${[
  grad('gh1', 'g-hb', ' x2="0" y2="1"'), v === 'hero' ? grad('gh2', 'g-hm', ' x2="0" y2="1"') : '', grad('gh3', 'g-hf', ' x2="0" y2="1"'),
  grad('gb', 'g-bl', ' x1="0" y1="1" x2="0" y2="0"'),
  '<path id="scn-b" class="scn-o" fill="url(#scn-gb)" d="M0 0Q-11-20-1-46Q12-22 0 0z"/>',
  '<g id="scn-t1"><use href="#scn-b" transform="rotate(-26) scale(.8)"/><use href="#scn-b" transform="rotate(24) scale(.9)"/><use href="#scn-b" transform="scale(1 1.1)"/></g>',
  '<g id="scn-t2"><use href="#scn-b" transform="rotate(-20) scale(.55)"/><use href="#scn-b" transform="rotate(18) scale(.6)"/><use href="#scn-b" transform="scale(.7 .75)"/></g>',
  `<g id="scn-fl"><path class="scn-o" fill="none" d="M0 0Q-4-12 0-28"/><path class="scn-o scn-pt" transform="translate(0 -30)" d="${petals()}"/><circle class="scn-o scn-ct" cy="-30" r="4.5"/></g>`,
  '<g id="scn-l"><path class="scn-o scn-lv" d="M7-4Q-17-14-17 8Q3 15 17 0z"/><path class="scn-vn" d="M-9 4Q0 5 8-1"/></g>'
].join('')}</defs>`;

function skyHero() {
  const [sx, sy] = SUN;
  return svg(620, 320, skyDefs('hero') +
    `<circle class="scn-day" cx="${sx}" cy="${sy}" r="84" fill="url(#scn-gw)"/>` +
    `<g class="scn-day"><g class="scn-rays"><use href="#scn-ry" class="scn-ro"/><use href="#scn-ry" class="scn-ri"/></g>` +
    `<circle class="scn-o" cx="${sx}" cy="${sy}" r="46" fill="url(#scn-gs)"/></g>` +
    `<path class="scn-o scn-night" transform="translate(${sx - 20} ${sy}) rotate(-24) scale(.9)" fill="url(#scn-gs)" d="M30-40A50 50 0 1 0 30 40A41 41 0 0 1 30-40z"/>` +
    cloud(30, 12, .5, 'c1') + cloud(300, 16, .42, 'c2') +
    dot(150, 90, 't1') + dot(330, 30, 't2') + dot(470, 170, 't3') +
    dot(70, 130, 'scn-ff t3') + dot(370, 120, 'scn-ff t1') + dot(570, 215, 'scn-ff t4') + dot(250, 25, 'scn-ff t2'));
}

function skyPage() {
  return svg(620, 120, skyDefs('page') + cloud(300, 16, .5, 'c2') + dot(450, 70, 't1'));
}

// Ground, hero: 3200x300; highest hill line y~70, front hill line y~244 (Minty's ledge).
function groundHero() {
  const back = hill(128, [[50, 300, 300], [34, 780, 230], [46, 1180, 260], [22, 1500, 120], [58, 1940, 300], [30, 2330, 200], [56, 2720, 300], [36, 3120, 240]]);
  const mid = hill(190, [[38, 200, 260], [30, 640, 220], [46, 1100, 250], [40, 1560, 230], [34, 2060, 260], [46, 2560, 250], [36, 3000, 240]]);
  const front = hill(246, [[6, 500, 300], [8, 1500, 500], [6, 2300, 400], [7, 2900, 300]]);
  return svg(GW, 300, groundDefs('hero') +
    `<path class="scn-o scn-hb" fill="url(#scn-gh1)" d="${edge(back, 320)}"/>` +
    onHill(back, [[120], [380], [640], [900], [1210], [1470], [1740], [2020], [2300], [2560], [2860], [3100]], far) +
    `<path class="scn-o scn-hm" fill="url(#scn-gh2)" d="${edge(mid, 320)}"/>` +
    onHill(mid, [[260, 's2'], [760, 's4'], [1280, 's1'], [1790, 's3'], [2250, 's5'], [2790, 's2']], (x, y, c) => sway(2, x, y, c)) +
    onHill(mid, [[520, .8], [1490, .9], [2400, .9]], (x, y, s) => daisy(x, y, s)) +
    `<path class="scn-o scn-hf" fill="url(#scn-gh3)" d="${edge(front, 320)}"/>` +
    onHill(front, [[180, 's3'], [450, 's1'], [880, 's5'], [1240, 's2'], [1960, 's4'], [2330, 's1'], [2650, 's3'], [3040, 's5']], (x, y, c) => sway(1, x, y, c)) +
    onHill(front, [[330, 1], [1075, 1.1], [1830, 1], [2520, 1.1], [2900, 1]], (x, y, s) => daisy(x, y, s)) +
    leaf(700, 30, 'k1') + leaf(1450, 20, 'k2 lb') + leaf(1900, 50, 'k3 lb') + leaf(2500, 30, 'k4'));
}

// Ground, inner pages: 3200x200; highest hill line y~58, front hill line y~160.
function groundPage() {
  const back = hill(92, [[34, 500, 260], [30, 1250, 240], [20, 1560, 120], [36, 2000, 260], [30, 2700, 260]]);
  const front = hill(163, [[5, 700, 400], [6, 1900, 500], [5, 2800, 300]]);
  return svg(GW, 200, groundDefs('page') +
    `<path class="scn-o scn-hb" fill="url(#scn-gh1)" d="${edge(back, 220)}"/>` +
    onHill(back, [[160], [620], [1100], [1700], [2250], [2900]], far) +
    onHill(back, [[900, .8], [2400, .8]], (x, y, s) => daisy(x, y, s)) +
    `<path class="scn-o scn-hf" fill="url(#scn-gh3)" d="${edge(front, 220)}"/>` +
    onHill(front, [[280, 's1'], [800, 's3'], [1400, 's2'], [2100, 's4'], [2650, 's1']], (x, y, c) => sway(1, x, y, c)) +
    onHill(front, [[540, 1], [1720, 1.1], [2950, 1]], (x, y, s) => daisy(x, y, s)) +
    leaf(900, 20, 'k1') + leaf(2000, 15, 'k2 lb'));
}

export function sceneMarkup(variant = 'hero') {
  const v = variant === 'page' ? 'page' : 'hero';
  return layer('sky', v === 'page' ? skyPage() : skyHero()) + layer('ground', v === 'page' ? groundPage() : groundHero());
}
