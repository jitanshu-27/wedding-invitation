# Soni & Manish — Wedding Invitation

```
wedding-invitation/
├── index.html            # page structure
├── css/style.css         # original design
├── css/enhancements.css  # schedule, map, music button, scratch, accessibility
├── js/config.js          # ✏️ SAB SETTINGS YAHAN (time, schedule, contacts, RSVP)
├── js/main.js            # petals + scratch cards
├── js/countdown.js
├── js/details.js         # schedule, add-to-calendar, contacts
├── js/music.js           # optional background music
├── js/rsvp.js            # RSVP form
├── assets/images/        # couple.webp, couple-story.webp, og-cover.jpg
├── assets/audio/         # background.mp3 yahan daalo (optional)
└── vercel.json
```

## Deploy se pehle zaroor karo
1. `js/config.js`: muhurat time (`dateTime`, `timeKnown: true`), schedule timings, contact numbers, RSVP Google Sheet URL (`sheetEndpoint`).
2. `index.html` ke `og:image` aur `og:url` me `YOUR-SITE` ko apne asli Vercel URL se badlo (link preview ke liye).
3. Music chahiye to royalty-free `background.mp3` ko `assets/audio/` me rakho.

## RSVPs Google Sheet me save karna (optional)
Sheet → Extensions → Apps Script me ye paste karo, phir Deploy → Web app (Anyone) → URL ko `rsvp.sheetEndpoint` me daalo:
```js
function doPost(e){const d=JSON.parse(e.postData.contents);
SpreadsheetApp.getActiveSheet().appendRow([new Date(),d.name,d.attendance,d.partySize,d.events,d.advice]);
return ContentService.createTextOutput('ok')}
```

## Deploy
`vercel` (ya GitHub repo connect karke Vercel pe import). Build command ki zaroorat nahi, ye static site hai.
