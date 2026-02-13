# Punjab Cash & Carry – Landing Page

Single-page marketing site for the Punjab Cash & Carry grocery app. Built with **React** (CDN) and **vanilla CSS**.

## Run locally

```bash
cd landing
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy (Railway)

Push to GitHub; Railway builds and deploys. The site serves static files and **`/app.apk`** for direct APK download.

## APK download

- **Add your APK:** Place your built APK in the **landing folder** and name it **`app.apk`**.
- All “Download App” / “Download APK” buttons link to **`/app.apk`**, so users get the file directly instead of the Play Store.
- After adding or replacing `app.apk`, commit and push so the live site serves the new file.

## App screens (screenshots)

The “App screens” section shows phone mockups. You can use **real app screenshots**:

1. Placeholder PNGs already exist in **`landing/assets/screens/`**: `home.png`, `shop.png`, `cart.png`, `recipes.png`, `deals.png`, `voice.png`.
2. Replace any file with your real app screenshot (same filename). If a file is missing, the section falls back to the styled mockup.
3. To regenerate placeholders: `node scripts/create-placeholders.js` from the `landing` folder.

## Structure

- `index.html` – Entry; loads React, Babel, `js/app.jsx`
- `css/style.css` – Styles (variables, layout, hero, banner, phone mockup)
- `js/app.jsx` – Hero, banner strip, animated phone with tab bar, screen sections, CTA, footer
- `app.apk` – Add your Android APK here for direct download
- `assets/logo.png` – Logo (required)
- `assets/screens/*.png` – Optional app screenshots

## Features

- Hero with gradient/pattern background and animated phone mockup (with bottom tab bar)
- Red banner strip (125+ products, COD, recipes, voice add)
- App screens section: optional screenshots or design-accurate mockups in phone frame
- CTA and footer with APK download link
