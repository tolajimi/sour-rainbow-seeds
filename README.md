# Sour Rainbow Seed Co.

Vibrant static e-commerce demo for **Sour Rainbow** cannabis seeds (novelty / collectible / souvenir purposes only).

Rainbow Belts × SourD bx2 genetics • Mostly indica • ~63-day flower • Feminized packs

## Features

- Responsive dark + rainbow candy theme
- Product catalog with filters
- Client-side shopping cart (localStorage)
- Strain info, About, Contact sections
- Strong legal disclaimers
- Ready for continuous deployment via **Netlify** (or GitHub Pages)

---

## Deploy on Netlify (recommended – continuous from GitHub)

This repo is already configured with a `netlify.toml` for a pure static site.

### One-time setup (takes ~2 minutes)

1. Go to **[https://app.netlify.com](https://app.netlify.com)** and sign in (or create a free account).
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub** and authorize Netlify if prompted.
4. Select the repository: **`tolajimi/sour-rainbow-seeds`**.
5. Netlify will auto-detect the settings from `netlify.toml`:
   - **Build command**: (empty – none needed)
   - **Publish directory**: `.` (root)
6. Click **Deploy site**.

That’s it. Netlify will:
- Build & publish the site
- Give you a free `*.netlify.app` URL
- Automatically redeploy every time you (or anyone) pushes to the `main` branch

### After the first deploy

- Rename the site under **Site settings → General → Site details** (e.g. `sour-rainbow-seeds` → becomes `sour-rainbow-seeds.netlify.app`).
- Optionally add a custom domain under **Domain management**.
- Every future `git push` to `main` triggers a new production deploy automatically.

---

## Alternative: GitHub Pages

You can also enable GitHub Pages if you prefer:

1. Repo → **Settings → Pages**
2. Source: **Deploy from a branch** → `main` / `/ (root)`
3. Save

Live URL will be: `https://tolajimi.github.io/sour-rainbow-seeds/`

---

## Local development

```bash
# just open the file
open index.html

# or serve it
npx serve .
# or
python -m http.server 8000
```

## Project structure

```
├── index.html      # Main site
├── styles.css      # Theme & layout
├── script.js       # Cart, filters, navigation
├── netlify.toml    # Netlify continuous deployment config
└── README.md
```

## Legal

Seeds are sold **strictly as novelty, souvenir, and collectible items**.  
Germination may be illegal in many jurisdictions. The buyer is solely responsible for complying with all applicable laws. We do not encourage or condone illegal activity.

---

Built as a vibe-coded demo. Ready for further customization (Stripe, real inventory, age gates, etc.).
