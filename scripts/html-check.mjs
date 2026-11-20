// The build emits quoted attributes and explicit closing tags. This small tree reader
// preserves nesting and inherited lang for checks; it is not a general HTML validator.
export function decodeHtml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, key) => {
    if (key[0] !== '#') return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }[key.toLowerCase()];
    const code = key[1].toLowerCase() === 'x' ? parseInt(key.slice(2), 16) : Number(key.slice(1));
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
  });
}

export function readHtml(html) {
  const root = { tag: '', attrs: {}, children: [] };
  const nodes = [];
  const stack = [root];
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
  const markup = html.replace(/<!--[^]*?-->|<(script|style)\b[^>]*>[^]*?<\/\1>/gi, '');
  for (const match of markup.matchAll(/<\/?([a-z][\w:-]*)\b([^>]*?)>|([^<]+)/gi)) {
    if (match[3] !== undefined) {
      stack.at(-1).children.push(decodeHtml(match[3]));
      continue;
    }
    const tag = match[1].toLowerCase();
    if (match[0].startsWith('</')) {
      const idx = stack.findLastIndex(node => node.tag === tag);
      if (idx > 0) stack.length = idx;
      continue;
    }
    const attrs = Object.fromEntries([...match[2].matchAll(/([\w:-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)]
      .map(m => [m[1].toLowerCase(), decodeHtml(m[2] ?? m[3] ?? m[4] ?? '')]));
    const parent = stack.at(-1);
    const node = { tag, attrs, parent, children: [] };
    parent.children.push(node);
    nodes.push(node);
    if (!voidTags.has(tag) && !match[0].endsWith('/>')) stack.push(node);
  }
  return { root, nodes };
}

export const textOf = node => !node ? '' : typeof node === 'string' ? node : node.children.map(textOf).join(' ').replace(/\s+/g, ' ').trim();
export const hasClass = (node, name) => (node.attrs.class || '').split(/\s+/).includes(name);

export function textByLanguage(node, include, inherited) {
  if (typeof node === 'string') return include(inherited) ? node : '';
  if (node.attrs['aria-hidden'] === 'true') return '';
  const current = node.attrs.lang || inherited;
  const labels = include(current) ? ['alt', 'aria-label', 'title', 'data-label'].map(key => node.attrs[key] || '').join(' ') : '';
  return `${labels} ${node.children.map(child => textByLanguage(child, include, current)).join(' ')}`;
}

export function proBlock(node) {
  for (let current = node; current; current = current.parent) {
    if ((current.tag === 'a' && current.attrs['data-status']) || ['section', 'article', 'details', 'nav'].includes(current.tag) ||
        ['info-nudge', 'roadmap-stage', 'hero-links'].some(name => hasClass(current, name)) ||
        (current.tag === 'a' && current.parent?.tag === 'nav')) return current;
    if (current.parent?.tag === 'main') return current;
  }
  return node;
}

export function cspErrors(policy, header = false) {
  const entries = policy.split(';').map(s => s.trim().split(/\s+/)).filter(parts => parts[0]);
  const directives = new Map(entries.map(([key, ...values]) => [key, values.join(' ')]));
  const expected = {
    'default-src': "'self'", 'base-uri': "'none'", 'script-src': "'self'", 'style-src': "'self'",
    'img-src': "'self'", 'font-src': "'self'", 'object-src': "'none'", 'frame-src': "'none'",
    'connect-src': "'none'", 'form-action': "'none'", 'manifest-src': "'self'",
    'worker-src': "'none'", 'media-src': "'none'", 'upgrade-insecure-requests': ''
  };
  if (header) expected['frame-ancestors'] = "'none'";
  const errors = Object.entries(expected).filter(([key, value]) => directives.get(key) !== value).map(([key, value]) => `${key} ${value}`.trim());
  if (entries.length !== directives.size) errors.push('duplicate directive');
  for (const key of directives.keys()) if (!(key in expected)) errors.push(`unexpected directive ${key}`);
  return errors;
}
