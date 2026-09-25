# my-portfolio

Personal portfolio site for Krishal Maharjan, built with plain HTML, CSS, and vanilla JavaScript. No build step and no dependencies.

## Structure

```
.
├── index.html   # Page markup: Hero, About, Projects, Contact
├── styles.css   # Design tokens, layout, light/dark themes, responsive rules
└── script.js    # Theme toggle, mobile menu, active nav link, scroll reveal
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing content

All content lives in `index.html`, one clearly commented block per section:

- **Hero**: name, role, intro, and the "At a glance" stats card
- **About**: bio, experience and education timeline, skills
- **Projects**: one `<article class="project-card">` per project; add `project-card--featured` to make a card span two columns
- **Contact**: LinkedIn and email links (the LinkedIn URL also appears in the hero and footer)

Colours, spacing, and fonts are CSS custom properties at the top of `styles.css`. The dark theme overrides the same tokens.

## Features

- Responsive from 320px phones to wide desktops
- Light and dark themes that follow the system setting, with a toggle that remembers your choice
- Sticky header with an accessible mobile menu (Escape and outside-click close it)
- Current section highlighted in the nav while scrolling
- Subtle scroll-reveal animations, turned off for users who prefer reduced motion
- Semantic landmarks, skip link, and visible focus styles

## Deploying

The site is fully static, so GitHub Pages works as-is: **Settings → Pages → Deploy from a branch**, pick the branch, and set the folder to `/ (root)`.
