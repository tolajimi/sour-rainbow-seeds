# Sour Rainbow Seed Co.

Vibrant static e-commerce demo for **Sour Rainbow** cannabis seeds (novelty / collectible / souvenir purposes only).

Rainbow Belts × SourD bx2 genetics • Mostly indica • ~63-day flower • Feminized packs

## Live Demo

Once GitHub Pages is enabled (see below):

**https://tolajimi.github.io/sour-rainbow-seeds/**

## Features

- Responsive dark + rainbow candy theme
- Product catalog with filters
- Client-side shopping cart (localStorage)
- Strain info, About, Contact sections
- Strong legal disclaimers

## Auto-Deploy with GitHub Pages

This is a pure static site (HTML + CSS + JS). Every push to `main` can automatically publish the site.

### Enable Pages (one-time)

1. Go to the repository: https://github.com/tolajimi/sour-rainbow-seeds
2. **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Branch: `main` / folder: `/ (root)`
5. Click **Save**

GitHub will build and host the site at  
`https://tolajimi.github.io/sour-rainbow-seeds/`

Future pushes to `main` will automatically update the live site (usually within 1–2 minutes).

### Optional: GitHub Actions (more control)

You can also add a simple workflow for explicit deploys, custom domains, or caching, but the built-in Pages source is sufficient for this project.

## Local development

Just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

## Legal

Seeds are sold **strictly as novelty, souvenir, and collectible items**.  
Germination may be illegal in many jurisdictions. The buyer is solely responsible for complying with all applicable laws. We do not encourage or condone illegal activity.

---

Built as a vibe-coded demo. Ready for further customization (Stripe, real inventory, age gates, etc.).
