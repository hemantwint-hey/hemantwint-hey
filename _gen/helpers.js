G.loadFonts = async () => {
  const css = await (await fetch('https://fonts.googleapis.com/css2?family=Lilita+One&family=Cinzel:wght@700&display=swap')).text();
  const blocks = css.split('@font-face').slice(1);
  for (const b of blocks) {
    if (!/U\+0000-00FF/.test(b)) continue;
    const fam = b.match(/font-family: '([^']+)'/)[1];
    const url = b.match(/url\(([^)]+)\)/)[1];
    const wt = b.match(/font-weight: (\d+)/)[1];
    const f = new FontFace(fam, `url(${url})`, { weight: wt });
    await f.load(); document.fonts.add(f);
  }
};
G.rr = (c, x, y, w, h, r) => { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); };
G.rand = (s => () => (s = (s * 16807) % 2147483647) / 2147483647)(42);
G.wood = (c, x, y, w, h, r = 10) => {
  c.save();
  c.shadowColor = 'rgba(0,0,0,.45)'; c.shadowBlur = 18; c.shadowOffsetY = 8;
  G.rr(c, x, y, w, h, r); c.fillStyle = '#2b1a0c'; c.fill();
  c.shadowColor = 'transparent';
  G.rr(c, x + 5, y + 5, w - 10, h - 10, r * .7);
  const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#9c6532'); g.addColorStop(.5, '#7a4a22'); g.addColorStop(1, '#5a3417');
  c.fillStyle = g; c.fill(); c.clip();
  c.strokeStyle = 'rgba(40,20,5,.35)'; c.lineWidth = 2;
  for (let i = 0; i < h / 7; i++) { const yy = y + 8 + i * 7 + G.rand() * 4; c.beginPath(); c.moveTo(x, yy); for (let xx = x; xx < x + w; xx += 40) c.lineTo(xx, yy + (G.rand() - .5) * 3); c.stroke(); }
  c.fillStyle = 'rgba(255,220,160,.18)'; c.fillRect(x, y + 5, w, 4);
  c.restore();
  for (const [nx, ny] of [[x + 16, y + 16], [x + w - 16, y + 16], [x + 16, y + h - 16], [x + w - 16, y + h - 16]]) {
    c.beginPath(); c.arc(nx, ny, 5, 0, 7); c.fillStyle = '#c9c2b5'; c.fill(); c.strokeStyle = '#3a3026'; c.lineWidth = 2; c.stroke();
  }
};
G.text = (c, s, x, y, size, opt = {}) => {
  c.save();
  c.font = `${opt.weight || ''} ${size}px ${opt.font || "'Lilita One'"}`; c.textAlign = opt.align || 'center'; c.textBaseline = 'middle';
  if (opt.ls) c.letterSpacing = opt.ls + 'px';
  c.lineJoin = 'round';
  c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowOffsetY = size * .06; c.shadowBlur = size * .05;
  c.strokeStyle = opt.stroke || '#2b1a0c'; c.lineWidth = opt.sw ?? size * .14; c.strokeText(s, x, y);
  c.shadowColor = 'transparent';
  if (opt.grad !== false) { const g = c.createLinearGradient(0, y - size / 2, 0, y + size / 2); g.addColorStop(0, opt.top || '#fff6dc'); g.addColorStop(1, opt.bot || '#e8c98a'); c.fillStyle = g; } else c.fillStyle = opt.fill;
  c.fillText(s, x, y);
  c.restore();
};
G.shieldPath = (c, cx, cy, s) => { c.beginPath(); c.moveTo(cx - s, cy - s * .9); c.lineTo(cx + s, cy - s * .9); c.lineTo(cx + s, cy + s * .1); c.quadraticCurveTo(cx + s * .9, cy + s * .8, cx, cy + s * 1.2); c.quadraticCurveTo(cx - s * .9, cy + s * .8, cx - s, cy + s * .1); c.closePath(); };
G.shield = (c, cx, cy, s, glyph) => {
  c.save(); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 14; c.shadowOffsetY = 6;
  G.shieldPath(c, cx, cy, s * 1.12); c.fillStyle = '#3a2410'; c.fill(); c.shadowColor = 'transparent';
  G.shieldPath(c, cx, cy, s * 1.04); const gg = c.createLinearGradient(0, cy - s, 0, cy + s); gg.addColorStop(0, '#ffe08a'); gg.addColorStop(1, '#b8801f'); c.fillStyle = gg; c.fill();
  G.shieldPath(c, cx, cy, s * .84); const bg = c.createLinearGradient(0, cy - s, 0, cy + s); bg.addColorStop(0, '#3569c9'); bg.addColorStop(1, '#16357a'); c.fillStyle = bg; c.fill();
  c.restore();
  G.glyph(c, glyph, cx, cy + s * .05, s * .5);
};
G.gold = (c, cy, s) => { const g = c.createLinearGradient(0, cy - s, 0, cy + s); g.addColorStop(0, '#fff0b0'); g.addColorStop(1, '#d99a1e'); return g; };
G.glyph = (c, k, cx, cy, s) => {
  c.save(); c.fillStyle = G.gold(c, cy, s); c.strokeStyle = '#3a2410'; c.lineWidth = Math.max(2, s * .12); c.lineJoin = 'round';
  c.beginPath();
  if (k === 'crown') { c.moveTo(cx - s, cy + s * .6); c.lineTo(cx - s, cy - s * .5); c.lineTo(cx - s * .5, cy); c.lineTo(cx, cy - s * .8); c.lineTo(cx + s * .5, cy); c.lineTo(cx + s, cy - s * .5); c.lineTo(cx + s, cy + s * .6); c.closePath(); }
  else if (k === 'star') { for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? s * .45 : s; c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } c.closePath(); }
  else if (k === 'tower') { const w = s * .75; c.moveTo(cx - w, cy + s); c.lineTo(cx - w, cy - s * .9); for (let i = 0; i < 5; i++) { const x0 = cx - w + i * (2 * w / 5); c.lineTo(x0, cy - s * (i % 2 ? .6 : .9)); c.lineTo(x0 + 2 * w / 5, cy - s * (i % 2 ? .6 : .9)); } c.lineTo(cx + w, cy + s); c.lineTo(cx + s * .25, cy + s); c.lineTo(cx + s * .25, cy + s * .35); c.arc(cx, cy + s * .35, s * .25, 0, Math.PI, true); c.lineTo(cx - s * .25, cy + s); c.closePath(); }
  else if (k === 'swords') { for (const d of [1, -1]) { c.save(); c.translate(cx, cy); c.rotate(d * Math.PI / 4); c.beginPath(); c.rect(-s * .09, -s * 1.05, s * .18, s * 1.45); c.rect(-s * .38, s * .38, s * .76, s * .14); c.rect(-s * .08, s * .52, s * .16, s * .38); c.fill(); c.stroke(); c.restore(); } c.restore(); return; }
  else if (k === 'scroll') { c.rect(cx - s * .75, cy - s * .8, s * 1.5, s * 1.6); c.fill(); c.stroke(); c.beginPath(); for (let i = 0; i < 4; i++) { c.moveTo(cx - s * .45, cy - s * .4 + i * s * .3); c.lineTo(cx + s * .45, cy - s * .4 + i * s * .3); } c.stroke(); c.restore(); return; }
  else if (k === 'target') { for (const r of [1, .66, .33]) { c.beginPath(); c.arc(cx, cy, s * r, 0, 7); c.fillStyle = r === .66 ? '#c0392b' : G.gold(c, cy, s); c.fill(); c.stroke(); } c.restore(); return; }
  else if (k === 'chest') { c.rect(cx - s, cy - s * .2, s * 2, s * .95); c.fill(); c.stroke(); c.beginPath(); c.moveTo(cx - s, cy - s * .2); c.quadraticCurveTo(cx, cy - s * 1.1, cx + s, cy - s * .2); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.rect(cx - s * .18, cy - s * .35, s * .36, s * .45); c.fillStyle = '#3a2410'; c.fill(); c.restore(); return; }
  else if (k === 'flag') { c.rect(cx - s * .7, cy - s, s * .16, s * 2); c.fill(); c.stroke(); c.beginPath(); c.moveTo(cx - s * .54, cy - s); c.lineTo(cx + s, cy - s * .55); c.lineTo(cx - s * .54, cy - s * .05); c.closePath(); c.fillStyle = '#d64533'; }
  else if (k === 'commit') { c.lineWidth = s * .3; c.strokeStyle = '#3a2410'; c.moveTo(cx - s, cy); c.lineTo(cx + s, cy); c.stroke(); c.lineWidth = s * .16; c.strokeStyle = G.gold(c, cy, s); c.stroke(); c.beginPath(); c.arc(cx, cy, s * .5, 0, 7); c.lineWidth = Math.max(2, s * .12); c.strokeStyle = '#3a2410'; }
  else if (k === 'medal') { c.moveTo(cx - s * .6, cy - s); c.lineTo(cx - s * .1, cy - s * .1); c.lineTo(cx + s * .1, cy - s * .1); c.lineTo(cx + s * .6, cy - s); c.closePath(); c.fillStyle = '#c0392b'; c.fill(); c.stroke(); c.beginPath(); c.arc(cx, cy + s * .35, s * .6, 0, 7); c.fillStyle = G.gold(c, cy, s); }
  c.fill(); c.stroke(); c.restore();
};
G.ribbon = (c, x, y, w, h) => {
  c.save(); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 16; c.shadowOffsetY = 6;
  c.beginPath(); c.moveTo(x, y); c.lineTo(x + w, y); c.lineTo(x + w - h * .35, y + h / 2); c.lineTo(x + w, y + h); c.lineTo(x, y + h); c.closePath();
  c.fillStyle = '#e0b64a'; c.fill(); c.shadowColor = 'transparent';
  c.beginPath(); c.moveTo(x, y + 6); c.lineTo(x + w - 12, y + 6); c.lineTo(x + w - h * .35 - 10, y + h / 2); c.lineTo(x + w - 12, y + h - 6); c.lineTo(x, y + h - 6); c.closePath();
  const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#2f63c2'); g.addColorStop(1, '#173a7a'); c.fillStyle = g; c.fill();
  c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(x, y + 8, w - 30, h * .18);
  c.restore();
};
G.stone = (c, x, y, w, h) => {
  c.save(); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 20; c.shadowOffsetY = 10;
  G.rr(c, x, y, w, h, 14); c.fillStyle = '#26221e'; c.fill(); c.shadowColor = 'transparent';
  G.rr(c, x + 8, y + 8, w - 16, h - 16, 10); const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#6d6862'); g.addColorStop(1, '#45413c'); c.fillStyle = g; c.fill(); c.clip();
  c.strokeStyle = 'rgba(20,18,15,.45)'; c.lineWidth = 3; const bh = 46;
  for (let r = 0; r * bh < h; r++) { const yy = y + 8 + r * bh; c.beginPath(); c.moveTo(x, yy); c.lineTo(x + w, yy); c.stroke(); for (let xx = x + (r % 2 ? 40 : 90); xx < x + w; xx += 110) { c.beginPath(); c.moveTo(xx, yy); c.lineTo(xx, yy + bh); c.stroke(); } }
  G.rr(c, x + 26, y + 26, w - 52, h - 52, 8); c.fillStyle = 'rgba(28,25,22,.72)'; c.fill();
  c.restore();
  for (const [cx, cy] of [[x + 8, y + 8], [x + w - 8, y + 8], [x + 8, y + h - 8], [x + w - 8, y + h - 8]]) { c.save(); c.translate(cx, cy); c.rotate(Math.PI / 4); c.fillStyle = G.gold(c, 0, 12); c.fillRect(-12, -12, 24, 24); c.strokeStyle = '#3a2410'; c.lineWidth = 3; c.strokeRect(-12, -12, 24, 24); c.restore(); }
};
G.frame = (c, w, h, t = 10) => {
  c.save(); c.lineWidth = t; c.strokeStyle = '#4a2e14'; G.rr(c, t / 2, t / 2, w - t, h - t, 14); c.stroke();
  c.lineWidth = 3; c.strokeStyle = '#d9a93f'; G.rr(c, t + 2, t + 2, w - 2 * t - 4, h - 2 * t - 4, 10); c.stroke(); c.restore();
};
G.roundClip = (c, w, h) => { G.rr(c, 0, 0, w, h, 18); c.clip(); };
G.jpg = async (path, cv, q = .86) => { const b = cv.toBlob ? await new Promise(r => cv.toBlob(r, 'image/jpeg', q)) : await cv.convertToBlob({ type: 'image/jpeg', quality: q }); await saveFile(path, b); };
