// Schedule, add-to-calendar, contacts and parking info (all driven by config.js)
(() => {
  const W = WEDDING, esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  document.getElementById('scheduleList').innerHTML = W.schedule.map(s =>
    `<li><div class="tl-when">${esc([s.date, s.time || 'Time to be announced'].filter(Boolean).join(' · '))}</div><div class="tl-name">${esc(s.name)}</div>${s.note ? `<div class="tl-note">${esc(s.note)}</div>` : ''}</li>`).join('');
  const x = document.getElementById('venueExtras');
  x.innerHTML = (W.venue.parkingNote ? `<p><b>Parking:</b> ${esc(W.venue.parkingNote)}</p>` : '') +
    (W.contacts.length ? `<p><b>Need help?</b><br>${W.contacts.map(c => `${esc(c.name)}: <a href="tel:${esc(c.phone)}">${esc(c.phone)}</a>`).join('<br>')}</p>` : '');
})();
