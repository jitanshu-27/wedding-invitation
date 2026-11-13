// Background music: tries to start as soon as the page opens.
// Browsers (especially phones) block sound until the visitor touches the page,
// so if autoplay is blocked the music starts on the first tap/touch/keypress.
(() => {
  const src = WEDDING.music && WEDDING.music.src, btn = document.getElementById('musicToggle'), a = document.getElementById('bgMusic');
  if (!src || !btn) return;
  a.preload = 'auto'; a.volume = .5; a.src = src; btn.hidden = false;
  a.addEventListener('error', () => btn.hidden = true);

  let userPaused = false, resumeOnShow = false;
  const events = ['pointerup', 'touchend', 'click', 'keydown'];
  const setOn = on => { btn.classList.toggle('on', on); btn.setAttribute('aria-label', on ? 'Pause background music' : 'Play background music'); };
  const stopListening = () => events.forEach(ev => removeEventListener(ev, onGesture));
  const start = () => a.play().then(() => { setOn(true); stopListening(); }).catch(() => {});
  function onGesture(e) {
    if (userPaused || (e.target.closest && e.target.closest('#musicToggle'))) return;
    start();
  }
  events.forEach(ev => addEventListener(ev, onGesture, { passive: true }));

  btn.addEventListener('click', () => {
    if (a.paused) { userPaused = false; start(); }
    else { userPaused = true; a.pause(); setOn(false); stopListening(); }
  });

  // pause when the visitor switches tab/app, resume when they come back
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { resumeOnShow = !a.paused; a.pause(); }
    else if (resumeOnShow && !userPaused) { resumeOnShow = false; a.play().catch(() => {}); }
  });

  start(); // try autoplay right away
})();
