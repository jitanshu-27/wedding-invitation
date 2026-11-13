// ===== Sirf yahi file edit karni hai =====
window.WEDDING = {
  // Shaadi ka exact muhurat time daalo, jaise '2026-11-25T19:30:00+05:30', aur timeKnown ko true karo.
  dateTime: '2026-11-25T19:00:00+05:30',
  timeKnown: true,
  venue: {
    name: 'Anandee Homes Banquet',
    address: 'C-4, Opposite Kendriya Vihar, Sector 51, Noida',
    parkingNote: '' // e.g. 'Free parking available inside the banquet.'
  },
  // Schedule: time khali ho to "Time to be announced" dikhega
  schedule: [
    { name: 'Haldi Ceremony',     date: '23 November 2026', time: 'Morning 12:00 AM'},
    { name: 'Mehndi Ceremony',    date: '24 November 2026', time: 'Evening 5:00 PM'},
    { name: 'Wedding Ceremony',   date: '25 November 2026', time: 'Evening 7:00 PM'},

  ],
  // Help ke liye contact: { name: 'Manish', phone: '+919876543210' }
  contacts: [
              { name: 'Krishan Pal', phone: '+919958928461' },
              { name: 'Toni', phone: '+918802778777' },
              { name: 'Jonny', phone: '+919015106697'}
            ],
  rsvp: {
    sheetEndpoint: 'https://script.google.com/macros/s/AKfycbwFYVJWypZczdC95UoKum48Ee4DcLHDw3QEKkUWGf7yVfOXcBB6N0PqfhIPLsi0vGEmEg/exec'   // Google Apps Script URL (README dekho)
  },
  // assets/audio/ me mp3 daalo, warna music button apne aap chhup jayega
  music: { src: 'assets/audio/Wedding%20Bells%20%28Kalyanam%29.mp3' }
};
