# ON-SITE BIOS — PixelProTech Solutions

A field training and decision system for on-site computer technicians. Pure HTML/CSS/JavaScript, no framework, no build step, offline-first.

## What this actually does

- Walks a technician through a real job: identity → baseline → firmware record → diagnostic tree → actions log → certified-mode code → job close → job review.
- Everything technical is **technician-entered**. The firmware section is explicitly labelled `USER ENTERED` because a browser cannot read or write BIOS/UEFI, detect hardware, or reach a network on the technician's behalf — none of that is faked.
- The diagnostic tree teaches a method (what do you know / don't know / what can you test / what would it prove / what could it break) rather than handing out canned answers like "the SSD is dead."
- The Job Review screen computes **PIXEL OG STANDARD MET / NOT MET** from what was actually recorded during the job — it isn't a score, and it isn't shaming; it names exactly what's missing.
- Data is stored only in the browser's `localStorage` on the device it runs on. There is no cloud sync. A job can be exported to a `.json` file and re-imported later or on another device — that's the only "transfer" this build does.
- Payment status is a **record**, not a payment gateway. No payment processing is implemented.

## Files

- `index.html` — the whole application (markup, styles, logic).
- `manifest.json` — makes it installable as a PWA ("Add to Home Screen").
- `sw.js` — service worker that caches the app shell so it works fully offline after the first load.
- `icon.svg` — app icon.

## Running it

Any static file server works, e.g.:

```
npx serve .
```

or just open `index.html` directly in a browser (the service worker requires `https://` or `localhost` to register — file:// will still run the app, just without the installable/offline service-worker layer).

## Deploying for real field use

Host the four files together (same folder, same paths) on any static host — GitHub Pages, Netlify, an internal server, a local network share served over HTTP. Once a technician opens it once while online, "Add to Home Screen" installs it and it keeps working with no signal.

## Deliberately not built (yet)

Marked as future capability rather than faked:
- A native companion utility that could genuinely query firmware/hardware on the host machine.
- Any real payment gateway integration.
- Any real cloud sync between devices.

If any of these get built later, they should replace the relevant "USER ENTERED" labels with "AUTO-DETECTED" — never quietly blur the two.
