# Seal Prince & the Roof Rats — CLAUDE.md

Read this file at the start of every session. Update it at the end of every session if anything changes.

---

## Project overview

A band website for Seal Prince & the Roof Rats, built in Astro and deployed to Netlify.
The site is managed by Lachie Chomley (non-technical) via Decap CMS at `/admin`.
Tom Allen (allen-tom-c on GitHub) handles structural changes using Claude Code.

**Live URL:** https://sealprince.com (domain registered at WordPress.com; nameservers point to Netlify)
**Netlify site:** [to be added after first deploy]
**GitHub repo:** [to be added after first push]
**Contact:** sealprinceandtheroofrats@gmail.com

---

## Tech stack

- **Framework:** Astro 4 (static output)
- **Hosting:** Netlify (free tier)
- **CMS:** Decap CMS (git-backed, accessed at /admin)
- **Auth:** Netlify Identity (email/password for Lachie — no GitHub account needed)
- **Domain:** sealprince.com (WordPress.com registrar, Netlify nameservers)

Why Netlify instead of Tom's usual Vercel: Netlify Identity integrates natively with Decap CMS for email/password auth.

---

## Site structure

| Route    | Page              | File                          |
|----------|-------------------|-------------------------------|
| /        | Home              | src/pages/index.astro         |
| /shows   | Shows             | src/pages/shows.astro         |
| /media   | Media             | src/pages/media.astro         |
| /videos  | → redirect /media | src/pages/videos.astro        |
| /admin   | CMS (Decap)       | public/admin/index.html       |

---

## Design system

### Colours
```
blue:      #74C3E1   — Bandcamp sky blue; hero sections, country text
blueDark:  #1B3040   — footer background
cream:     #FAF7F2   — main background
warmWhite: #F2EBE0   — testimonials section
charcoal:  #2A2420   — primary text
mid:       #6B5D54   — secondary text
soft:      #9E8F85   — muted text, past shows
border:    #D4C9BE   — dividers
pink:      #C73B72   — accents, ticket links, nav active indicator
white:     #FFFFFF
```

### Typography
- **Headings:** Neuton (serif) — page titles, section headings
- **Body:** Lora (serif) — body text, nav links, show details
- **Accents:** Caveat (handwritten) — dates, country names, Rule dividers, Acknowledgement heading

### Layout
- Max content width: 860px, centred, padding: 0 40px (20px mobile)
- Nav: sticky, 72px tall, cream background
- Sections alternate: blue (#74C3E1), cream (#FAF7F2), warm white (#F2EBE0)
- Footer: dark blue (#1B3040)

### Design rules (do not break these)
- No emojis or unicode decorative symbols (the ✦ Rule divider is the sole exception, already in place)
- No unattributed quotes, no symmetrical value prop grids
- Use `[Lachie to write: ...]` for any missing content — never invent band copy
- Em dashes for lists, not checkmarks
- Past shows at 50% opacity
- Country/nation names in Caveat blue throughout gig listings — this is a design principle, not just decoration

---

## Content architecture

### Managed via Decap CMS (/admin)

| Content           | File(s)                       | CMS collection              |
|-------------------|-------------------------------|-----------------------------|
| Shows             | src/content/shows/*.md        | Folder: Shows               |
| Videos            | src/content/videos/*.md       | Folder: Videos              |
| Bio text          | src/data/bio.json             | File: Bio & About           |
| Testimonials      | src/data/testimonials.json    | File: Testimonials          |
| Photo reel        | src/data/photos.json          | File: Photo Reel (Homepage) |
| Media page photos | src/data/media-photos.json    | File: Media Page — Photos   |
| Releases          | src/data/releases.json        | File: Music / Releases      |

### Show frontmatter fields
```yaml
dateDisplay: "Wed 2 Apr 2026"   # display string (flexible for multi-day events)
sortDate: "2026-04-02"          # ISO date for sorting
venue: "Beav's Bar"
city: "Geelong, VIC"
country: "Wadawurrung Country"  # traditional custodians
note: "Single Launch"           # optional
ticketUrl: "https://..."        # optional
past: false                     # true = moves to Past Shows at 50% opacity
```

### Video frontmatter fields
```yaml
title: "Barwon River Song — Live at Nannup"
youtubeUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
order: 1   # lower = appears first
```

### Release item fields (releases.json)
```json
{
  "title": "Barwon River Songs EP",
  "bandcampUrl": "https://sealprince.bandcamp.com/album/...",
  "artwork": "/images/uploads/barwon-river-songs.jpg",
  "year": "2024"
}
```

---

## File structure

```
astro-site/
├── public/
│   ├── admin/
│   │   ├── index.html          # Decap CMS UI
│   │   └── config.yml          # CMS field definitions
│   ├── images/
│   │   ├── logo-white.png      # Michaela's lino-cut logo (white version)
│   │   ├── logo-black.png      # Michaela's lino-cut logo (black version)
│   │   ├── photos/             # Photo reel images
│   │   └── uploads/            # CMS-uploaded images land here
│   └── hero.mp4                # Compressed hero video (6MB, 1280px wide)
├── src/
│   ├── content/
│   │   ├── config.ts           # Astro content collection schemas
│   │   ├── shows/              # One .md file per show
│   │   └── videos/             # One .md file per video
│   ├── data/
│   │   ├── bio.json            # Bio paragraphs + acknowledgement
│   │   ├── testimonials.json   # Testimonials/reviews list
│   │   ├── photos.json         # Photo reel list (homepage only)
│   │   ├── media-photos.json   # Media page photo gallery
│   │   └── releases.json       # Album/EP releases (artwork + Bandcamp links)
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML, fonts, global styles
│   ├── components/
│   │   ├── Nav.astro           # Sticky nav with active state
│   │   ├── Footer.astro        # Dark blue footer
│   │   ├── Rule.astro          # Decorative divider (props: onBlue)
│   │   ├── ShowRow.astro       # Single gig row
│   │   ├── PhotoReel.astro     # Horizontal scroll photo strip
│   │   ├── Carousel.astro      # Testimonials carousel (vanilla JS)
│   │   └── VideoEmbed.astro    # YouTube embed with ID extraction
│   └── pages/
│       ├── index.astro         # Home (hero, photo reel, releases, bio, shows preview, testimonials)
│       ├── shows.astro         # Full shows list (upcoming + past)
│       ├── media.astro         # Media page (videos first, then photos)
│       ├── videos.astro        # Redirect → /media
│       └── font-demo.astro     # TEMP: font comparison page — delete after font is chosen
├── astro.config.mjs
├── netlify.toml
├── package.json
├── compress-images.mjs         # Batch JPG/PNG → WebP converter (run: npm run compress)
└── CLAUDE.md                   # This file
```

---

## Terminal commands

```bash
# Navigate to project
cd "Seal Prince and the Roof Rats/astro-site"

# Install dependencies (first time only)
npm install

# Local dev server → http://localhost:4321
npm run dev

# Production build (check for errors)
npm run build

# Preview production build locally
npm run preview

# Compress new images to WebP
npm run compress
```

---

## Netlify setup (one-time, done via Netlify dashboard)

1. Connect GitHub repo to Netlify (Add new project → Import from GitHub)
2. Build command: `npm run build` | Publish directory: `dist`
3. Enable **Netlify Identity** (Identity in left sidebar)
4. Under Identity → Registration: set to **Invite only**
5. Under Identity → Services: enable **Git Gateway** — THIS IS CRITICAL. Without Git Gateway, Decap CMS cannot authenticate or write to GitHub. It is a separate step from enabling Identity.
6. Invite users via email (Identity → Invite users)
7. Add custom domain `sealprince.com` (Domain management)
8. Use **Set up Netlify DNS** option — Netlify takes over DNS entirely, simpler than adding individual records
9. In WordPress.com domain dashboard, point nameservers to the four Netlify DNS nameservers provided

## Netlify Identity — how the invite/login flow works

**IMPORTANT:** The Netlify Identity widget on the main site does NOT reliably handle invite or recovery tokens. The correct flow is:

- Invite/recovery emails link to `sealprince.com/#invite_token=xxx`
- The Layout.astro script detects this token and **redirects to `/admin/#invite_token=xxx`**
- Decap CMS handles the token natively at `/admin` and shows the password setup dialog
- This redirect is the reliable approach — do not try to open the identity widget popup on the main site

The Layout.astro script handles this:
```js
if (hash && /invite_token|recovery_token|confirmation_token/.test(hash)) {
  window.location.replace('/admin/' + hash);
  return;
}
```

**Astro script tag note:** Identity-related scripts must use `is:inline` in Astro. Without it, Astro bundles scripts as deferred modules, causing timing issues where the Netlify Identity `init` event fires before the handler is attached.

## DNS propagation notes

- After switching nameservers, propagation can take up to 48 hours
- dnschecker.org shows per-region propagation status
- SSL certificate provisioning happens automatically once DNS resolves to Netlify
- Local browser/machine DNS cache can persist even after global propagation — test on mobile data to confirm the live state
- Chrome on a managed-profile Mac may have locked DNS settings; use Safari for testing in this case
- Mac DNS flush command: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`

---

## Working with Lachie (CMS user)

Lachie logs in at https://sealprince.com/admin with email/password.
Every save commits to GitHub and triggers a Netlify rebuild (~60-90 seconds).

Things Lachie can do without Tom:
- Add/edit/delete shows (mark as past when done)
- Add/remove YouTube videos
- Edit bio text and acknowledgement
- Upload photos to the reel
- Add/edit testimonials

Things that require Tom + Claude Code:
- Layout or design changes
- New pages or sections
- Updating fonts, colours, or component structure

---

## Session protocol

At the end of every Claude Code session, update this file to reflect:
- Any new files created or deleted
- Any design decisions made
- Any Netlify/DNS changes applied
- Current deployment status
