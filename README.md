# Punjab Cash & Carry – Landing Page

Single-page marketing site for the Punjab Cash & Carry grocery app. Built with **React** (CDN) and **vanilla CSS** – no Vite, no Tailwind.

## Run locally

Open `index.html` in a browser, or serve the folder (some browsers require a server for ES modules/imports; this project uses script tags so opening the file may work):

```bash
# From the landing folder – e.g. with npx serve
npx serve -l 3000
```

Then open http://localhost:3000

## Structure

- `index.html` – Entry; loads React, ReactDOM, Babel standalone, and `js/app.jsx`
- `css/style.css` – All styles (variables, layout, animations)
- `js/app.jsx` – Single React app: hero, animated phone mockup, features, CTA, footer

## Features on the page

- **Hero** with headline and animated phone mockup
- **Phone** cycles through 4 “app screens” (Home, Shop, Cart, Recipes) with a simple slide animation
- **Features grid**: smart lists, deals, recipes, voice add, cart/COD, nutrition
- **CTA** and **footer** with store location and link to main website

Update the Play Store link in `js/app.jsx` if your app’s package ID or store URL changes.
