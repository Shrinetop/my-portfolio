# my-portfolio

Personal portfolio for Krishal Maharjan, built with plain HTML, CSS and vanilla JavaScript. The design uses a "liquid glass" style: frosted, translucent panels over a drifting, vibrant colour backdrop. The site itself has no build step.

## Structure

```
.
├── index.html              # Portfolio: Hero, About, Experience, Projects, Contact + resume downloads
├── styles.css              # Design tokens, glass material, themes, accessibility modes
├── script.js               # Accessibility panel, theme, adaptive resume links, nav, animations
├── resume.html             # Web version of the resume, and the source for the accessible PDFs
├── 404.html                # "Page not found" page
├── assets/
│   ├── resume/             # Standard PDF + generated dyslexia-friendly and high-contrast PDFs
│   ├── fonts/              # Self-hosted Lexend and Atkinson Hyperlegible (+ OFL licences)
│   └── img/                # Profile photo, employer logos, IFC badge, link-preview card
├── wrangler.jsonc          # Cloudflare hosting config
├── .assetsignore           # Repo files Cloudflare should not publish (README, tools, config)
├── _headers                # Caching and security headers on Cloudflare
└── tools/                  # Resume PDF build (not published)
```

## Run locally

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Accessibility

The accessibility button in the header (and "Accessibility" in the footer) opens a settings panel. Choices are saved in the browser and also apply to `resume.html`.

- **Colour vision**: palettes for red–green (protanopia, deuteranopia) and blue–yellow (tritanopia) colour blindness, plus monochrome. Accents keep at least 4.5:1 contrast, and nothing relies on colour alone.
- **Dyslexia-friendly text**: the Lexend typeface, larger text, wider letter, word and line spacing, no italics or all-caps, and calmer cream backgrounds. This follows the British Dyslexia Association style guide and WCAG 1.4.12. Lexend was chosen over OpenDyslexic, which studies have found doesn't improve reading speed or accuracy.
- **Reduce transparency** and **reduce motion**. Both also switch on automatically when the device asks for them.

The site's download buttons pick the resume version that matches these settings.

## Resume versions

| File | For |
| --- | --- |
| `Krishal_Maharjan_Resume.pdf` | Standard one-page original (black on white, colour-blind safe) |
| `Krishal_Maharjan_Resume_Dyslexia_Friendly.pdf` | Lexend 12pt, 1.5 spacing, cream background |
| `Krishal_Maharjan_Resume_High_Contrast.pdf` | Atkinson Hyperlegible 14pt, pure black on white |
| `resume.html` | Web version for screen readers, zoom and custom fonts |

The generated PDFs are tagged (headings, lists and reading order) and include a document outline.

The phone number appears in the PDFs only, not on the website. It isn't stored in `resume.html` or anywhere else in the repo; the build adds it to the generated PDFs.

**Updating the resume:** replace the standard PDF, make the same edits in `resume.html`, then rebuild the others with your phone number:

```sh
cd tools
npm install
npx playwright install chromium   # first time only
RESUME_PHONE="(555) 555-5555" npm run build:resumes
```

## Images

- `profile-176.webp` / `profile-264.webp`: profile photo in the hero card. These copies have all metadata removed; the original iPhone photo contained GPS coordinates, so don't upload originals straight to `assets/`.
- `logo-*.webp`: employer logos, trimmed and squared for the white tiles in Experience.
- `og-card.jpg`: the 1200×630 image link previews show when the site is shared.
- `ifc-badge.png`: IFC badge, linked to the CSI credential page.

Link previews need absolute URLs, so `og:url`, `og:image` and the canonical link in `index.html` and `resume.html` include the site's address. Update them if the address changes.

## Hosting

The site is live on GitHub Pages at <https://shrinetop.github.io/my-portfolio/>. It deploys from `main` (**Settings → Pages → Deploy from a branch → `main`, `/ (root)`**), so merging to `main` publishes changes.

### Optional: Cloudflare

The repo is also ready to host on Cloudflare Workers (free), using `wrangler.jsonc`, `.assetsignore` and `_headers`. Compared with GitHub Pages, it adds caching and security headers, a preview URL for every branch, and free privacy-friendly analytics.

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Import a repository** and choose `Shrinetop/my-portfolio`.
2. Keep the project name `my-portfolio` (it must match `name` in `wrangler.jsonc`). Leave the build command empty; the deploy command is `npx wrangler deploy`.
3. The site goes live at the free address `my-portfolio.<your-subdomain>.workers.dev`. Every push to `main` redeploys it.
4. If you switch over, replace `https://shrinetop.github.io/my-portfolio` with the new address in `index.html` and `resume.html` (canonical, `og:url`, `og:image`). Then turn off GitHub Pages so there's only one copy of the site.
