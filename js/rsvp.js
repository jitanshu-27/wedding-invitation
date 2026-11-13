(() => {
  const C = WEDDING.rsvp || {}, $ = id => document.getElementById(id), form = $('rsvpForm'), att = $('attendance');
  const choices = [...document.querySelectorAll('.choice')], only = [...document.querySelectorAll('.attend-only')];
  let sent = false;
  function setAnswer(v) {
    att.value = v; const yes = v === 'Joyfully accept';
    choices.forEach(b => { const on = b.dataset.answer === v; b.classList.toggle('selected', on); b.setAttribute('aria-pressed', on); });
    only.forEach(e => e.hidden = !yes); $('submitBtn').textContent = yes ? 'Send RSVP ♡' : 'Send reply ♡';
  }
  choices.forEach(b => b.addEventListener('click', () => setAnswer(b.dataset.answer))); setAnswer(att.value);
  form.addEventListener('submit', async e => {
    e.preventDefault(); if (sent) return;
    const err = $('formError'), btn = $('submitBtn'), name = $('guestName').value.trim(), yes = att.value === 'Joyfully accept';
    err.hidden = true;
    if (!name) { err.textContent = 'Please enter your name so we know who is replying.'; err.hidden = false; $('guestName').focus(); return; }
    const d = {
      name, attendance: att.value, partySize: yes ? $('party').value : '-',
      events: yes ? ([...form.querySelectorAll('input[name=events]:checked')].map(x => x.value).join(', ') || 'Not specified') : '-',
      advice: $('advice').value.trim() || 'Not shared'
    };
    sent = true; btn.disabled = true; btn.textContent = 'Sending…';
    if (C.sheetEndpoint) {
      try { await fetch(C.sheetEndpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ ...d, time: new Date().toISOString() }) }); }
      catch (x) { sent = false; btn.disabled = false; btn.textContent = yes ? 'Send RSVP ♡' : 'Send reply ♡'; err.textContent = 'Could not send. Please check your internet and try again.'; err.hidden = false; return; }
    }
    $('tyTitle').textContent = yes ? 'Thank You!' : 'Thank you for letting us know';
    $('tyText').innerHTML = yes ? 'Your RSVP means so much to us.<br>We can’t wait to celebrate this beautiful beginning with you.' : 'We will miss you on the day,<br>but you will be in our hearts.';
    $('success').style.display = 'block'; $('success').textContent = 'Your reply has been sent. ♡';
    $('thankyouPanel').classList.add('show'); btn.textContent = 'Sent ✓';
    form.querySelectorAll('input,select,textarea,button').forEach(x => x.disabled = true);
    setTimeout(() => $('thankyouPanel').scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
  });
})();
