# Seal Prince & the Roof Rats — Website

Band website built with Astro + Decap CMS, deployed to Netlify.

---

## First-time setup

```bash
# 1. Clone the repo
git clone https://github.com/allen-tom-c/seal-prince-site.git
cd seal-prince-site

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → opens at http://localhost:4321
```

## Adding photos

1. Drop new photos into `public/images/photos/`
2. Run `npm run compress` to convert to WebP and resize
3. Update `src/data/photos.json` to include the new filenames (or manage via /admin)

## Deploying

Push to `main` — Netlify auto-builds and deploys.

```bash
git add .
git commit -m "Update content"
git push
```

## CMS

Lachie manages shows, videos, photos, and bio text at:
**https://sealprince.com/admin**

For full architecture details, see [CLAUDE.md](./CLAUDE.md).
