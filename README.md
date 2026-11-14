# THE CONFESSION

A private-feeling, mobile-first romantic confession website — a cinematic sequence of
three questions and a thoughtful ending, made by **Morgan** for **Euralia**.

Built to *The Confession · Website Build Brief*: dreamy pearl-pink editorial look,
slow deliberate motion, equal and honest answers, and privacy by default.

---

## Quick start

```bash
bun install        # or: npm install
bun run dev       # or: npm run dev    → http://localhost:3000
```

Production:

```bash
bun run build     # or: npm run build
bun run start
```

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · assets as local WebP.

---

## The experience

1. **Opening** — "A little something, just for you." → *Open my letter*
2. **Locket interstitial** — the locket glows open (auto-advances)
3. **Q1** — "I have something I've been wanting to ask you... Are you ready to hear it?"
   The **No** button playfully dodges the pointer — after the very first dodge an
   accessible fallback appears and stays; **Yes** never moves.
4. **Q2** — "Do you love me too?" Same gentle gag, same accessible fallback.
5. **Q3** — "Would you want us to start planning a family together next year?"
   **Yes** and **No** are equal, still, final, and genuinely respected.
   No dodging, no relabeling, no retry.
6. **Endings** — *Yes*: a love letter, an optional memory gallery and a restrained
   petal-and-pearl-light celebration. *No*: a kind, quiet thank-you — no confetti,
   no pressure, no retry.

Music is optional: a visible toggle starts a soft piano piece only after a tap,
and it can be muted at any time. Nothing autoplays.

---

## Personalize it (Morgan's to-do)

All editable copy lives in **`src/lib/content.ts`**, clearly marked:

- `letter.body` — the love letter (placeholder copy is provided; make it yours)
- `noEnding.body` — the kind No ending
- `gallery` — set `enabled: false` to hide, or replace the three clearly-marked
  placeholder frames:
  1. Drop real photos into `public/assets/` (e.g. `gallery-01.webp`);
  2. Update `gallery.items` in `src/lib/content.ts` (set `placeholder: false`,
     add captions **you** approve);
  3. Remove the `gallery.note` line.
- `romantic-piano.mp3` — replace with any track you have the rights to use
  (`public/assets/romantic-piano.mp3`).

Do not invent shared memories, dates or promises — write only what is true.

---

## Privacy

This site is intentionally **unlisted**, but an unlisted URL is **not password
protection** — anyone who obtains the link can open it. The build therefore:

- ships `noindex` metadata and `public/robots.txt` (disallow all);
- contains **no analytics, no third-party trackers, no public feed, comments,
  profiles or user directory**;
- keeps every answer **in memory in the browser only** — nothing is written to the
  URL, storage, or any server;
- loads all fonts and assets locally (self-hosted via `next/font` and
  `public/assets/`).

If stronger privacy is needed, put the deployment behind a passcode gate —
e.g. Vercel password protection, Cloudflare Access, or basic auth on any static
host — or add an auth gate before sharing the link.

---

## Deployment

**Option A — GitHub Pages (static, free):**

```bash
bun run build:pages    # exports ./out with basePath /WEBSITE-TRIAL-3
# publish the contents of ./out (e.g. to a gh-pages branch or Pages Actions)
```

The `build:pages` script sets `NEXT_PUBLIC_BASE_PATH=/WEBSITE-TRIAL-3`, which
switches `next.config.ts` to a static export (`output: 'export'`, unoptimized
images, trailing slash). A tiny helper (`src/lib/assets.ts`) prefixes asset
URLs so the same code works in both modes. Keep the base path in sync with
the repo name, or set it to `""` for a user-site (`username.github.io`).

**Option B — any Node host (Vercel, Netlify, Railway, VPS):**

```bash
bun install && bun run build && bun run start   # normal server build
```

---

## Accessibility

- Full keyboard support: every control is a real `<button>`, visible focus rings,
  and focus moves into each new scene; scene changes are announced politely.
- The playful No is **never a trap**: it stays focusable, and an accessible
  fallback appears after the first dodge.
- Q3's Yes/No are equal in size, position and behavior.
- Decorative imagery (backgrounds, petals, letter still-life) is hidden from
  assistive tech; meaningful images carry alt text.
- `prefers-reduced-motion` disables all decorative animation.
- Touch targets ≥ 44–48 px; safe-area insets respected on notched phones.

---

## Assets & credits

- `public/assets/*.webp` — generated from the art direction prompts in the build
  brief (no lettering, logos or watermarks). `gallery-0*.webp` are **style
  references awaiting real photos**.
- `public/assets/romantic-piano.mp3` — an original, procedurally composed and
  synthesized felt-piano piece (~88 s, loops). No copyrighted material.
- `.jpg` fallbacks of every image sit in `public/assets/` as well.

---

## Known limitations

- The gallery ships with clearly-marked placeholder frames until Morgan adds
  real photos (see above).
- No passcode gate is implemented in this build — use your deployment
  platform's protection if you need one (see *Privacy*). On GitHub Pages the
  site is public at its URL (though unlisted and noindex); for a private
  deployment use Option B behind a passcode gate.
- Both the normal server build and the static Pages export
  (`bun run build:pages`) have been verified locally.

— Made with care. Morgan → Euralia.
