(() => {
  const w = new Date(WEDDING.dateTime).getTime(), note = document.getElementById('countdownNote');
  const els = ['days', 'hours', 'mins', 'secs'].map(id => document.getElementById(id));
  function tick() {
    const t = w - Date.now();
    if (t <= 0) {
      els.forEach(e => e.textContent = '00'); note.hidden = false;
      note.textContent = -t < 864e5 ? 'Today is the day! 🎉' : 'Thank you for celebrating with us ♡'; return;
    }
    [t / 864e5, t % 864e5 / 36e5, t % 36e5 / 6e4, t % 6e4 / 1e3].forEach((v, i) => els[i].textContent = String(Math.floor(v)).padStart(2, '0'));
  }
  tick(); setInterval(tick, 1000);
})();
