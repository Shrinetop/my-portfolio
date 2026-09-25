# my-portfolio

Personal portfolio for Krishal Maharjan, built with plain HTML, CSS and vanilla JavaScript. The design uses a "liquid glass" style: frosted, translucent panels over a drifting, vibrant colour backdrop. The site itself has no build step.

## Structure

```
.
├── index.html              # Portfolio: Hero, About, Experience, Projects, Contact + resume downloads
├── styles.css              # Design tokens, glass material, themes, accessibility modes
├── script.js               # Accessibility panel, theme, adaptive resume links, nav, animations
├── resume.html             # Web version of the resume, and the source for the accessible PDFs
├── assets/
│   ├── resume/             # Standard PDF + generated dyslexia-friendly and high-contrast PDFs
│   ├── fonts/              # Self-hosted Lexend and Atkinson Hyperlegible (+ OFL licences)
│   └── img/                # ifc-badge.png, the IFC credential badge
├── tools/build-resumes.cjs # Regenerates the accessible PDFs from resume.html
└── package.json            # Only used for the PDF build
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
npm install
npx playwright install chromium   # first time only
RESUME_PHONE="(555) 555-5555" npm run build:resumes
```

## IFC badge

The About section shows the IFC badge (`assets/img/ifc-badge.png`), linked to the CSI credential page. If the image is ever missing, a styled placeholder tile is shown instead.

## Deploying

The site is fully static, so GitHub Pages works as-is. Go to **Settings → Pages → Deploy from a branch**, pick the branch, and set the folder to `/ (root)`.
