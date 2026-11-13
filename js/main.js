// Petals + real scratch cards
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = ['#c77b83', '#d7ad58', '#e4b5a8', '#a94b59', '#e0c18a'], box = document.getElementById('petals');
  if (!still) for (let i = 0; i < 24; i++) {
    const e = document.createElement('i'); e.className = 'petal';
    e.style.left = Math.random() * 100 + 'vw'; e.style.background = colors[i % colors.length];
    e.style.animationDuration = 8 + Math.random() * 12 + 's'; e.style.animationDelay = -Math.random() * 18 + 's';
    box.appendChild(e);
  }
  document.querySelectorAll('.scratch-card').forEach(card => {
    card.querySelector('button')?.remove();
    const c = document.createElement('canvas'), ctx = c.getContext('2d');
    c.className = 'scratch-canvas'; c.tabIndex = 0; c.setAttribute('role', 'button');
    c.setAttribute('aria-label', 'Scratch to reveal, or press Enter'); card.appendChild(c);
    let down = false, done = false, lastX = 0, lastY = 0, lastW = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const cover = () => {
      const r = card.getBoundingClientRect(); lastW = r.width;
      c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr); ctx.scale(dpr, dpr);
      const g = ctx.createLinearGradient(0, 0, r.width, r.height); g.addColorStop(0, '#b93650'); g.addColorStop(1, '#8b2036');
      ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
      ctx.fillStyle = '#f8e9d6'; ctx.textAlign = 'center'; ctx.font = '500 12px "DM Sans",sans-serif';
      ctx.fillText('✧ SCRATCH ✧', r.width / 2, r.height / 2 + 4);
    };
    const reveal = () => { done = true; card.classList.add('revealed'); c.classList.add('gone'); };
    const scratch = (e, first) => {
      const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      ctx.globalCompositeOperation = 'destination-out'; ctx.lineCap = 'round'; ctx.lineWidth = 40;
      ctx.beginPath(); ctx.moveTo(first ? x : lastX, first ? y : lastY); ctx.lineTo(x + .01, y); ctx.stroke();
      lastX = x; lastY = y;
    };
    const cleared = () => {
      const d = ctx.getImageData(0, 0, c.width, c.height).data; let n = 0;
      for (let i = 3; i < d.length; i += 64) if (!d[i]) n++;
      return n / (d.length / 64) > 0.5;
    };
    const stop = () => { if (!down) return; down = false; if (!done && cleared()) reveal(); };
    c.addEventListener('pointerdown', e => { if (done) return; down = true; c.setPointerCapture(e.pointerId); scratch(e, true); });
    c.addEventListener('pointermove', e => { if (down && !done) scratch(e, false); });
    c.addEventListener('pointerup', stop); c.addEventListener('pointercancel', stop);
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(); } });
    // phones fire "resize" while scrolling (address bar); only redraw if the width really changed
    addEventListener('resize', () => { if (!done && Math.abs(card.getBoundingClientRect().width - lastW) > 1) cover(); });
    cover();
  });
})();
