# How to update your portfolio

A plain-English guide for Krishal. No coding experience needed: every change below is either a copy-and-paste prompt for Claude, or a small, careful edit you can make yourself on GitHub.com.

**Contents**

1. [How your site works](#1-how-your-site-works)
2. [Two ways to make a change](#2-two-ways-to-make-a-change)
3. [Five rules before you edit](#3-five-rules-before-you-edit)
4. [Recipes](#4-recipes)
   - [Update your resume](#41-update-your-resume)
   - [Change text on the homepage](#42-change-text-on-the-homepage)
   - [Add or edit a job](#43-add-or-edit-a-job-experience)
   - [Add or edit a project](#44-add-or-edit-a-project-case-studies)
   - [Skills and coursework](#45-skills-and-coursework)
   - [Education, certifications and badges](#46-education-certifications-and-badges)
   - [Your photo and company logos](#47-your-photo-and-company-logos)
   - [Contact details](#48-contact-details)
   - [Change the colour scheme](#49-change-the-colour-scheme)
   - [Link previews](#410-link-previews-what-shows-when-you-share-the-link)
5. [Check your work](#5-check-your-work)
6. [If something goes wrong](#6-if-something-goes-wrong)
7. [Glossary](#7-glossary)

---

## 1. How your site works

Your website is a folder of files stored on GitHub, in the repository **`Shrinetop/my-portfolio`**.

- The **`main`** branch is the live version. Whenever `main` changes, GitHub Pages rebuilds your site automatically, usually within **1 to 2 minutes**.
- Your site's address is **<https://shrinetop.github.io/my-portfolio/>**.
- Nothing needs to be installed or "built" for the website. You edit a file, save it, and the site updates.

### Which file do I open?

| To change… | Open this file |
| --- | --- |
| Any text, job, project, skill or link on the homepage | `index.html` |
| The web version of your resume | `resume.html` |
| Your resume PDFs | the `assets/resume/` folder |
| Your photo, company logos, IFC badge, link-preview image | the `assets/img/` folder |
| Colours, spacing and fonts | `styles.css` |
| How buttons and settings behave | `script.js` (you shouldn't need to touch this) |
| The "page not found" page | `404.html` |

Everything else (`README.md`, `tools/`, `wrangler.jsonc`, `.assetsignore`, `_headers`) is setup and tooling. You can leave it alone.

---

## 2. Two ways to make a change

### Option A: Ask Claude (easiest, recommended)

1. Go to **<https://claude.ai/code>** and start a session with the **`Shrinetop/my-portfolio`** repository.
2. Describe what you want in plain English. Attach files (a new resume PDF, a photo, a logo) with the paperclip.
3. Claude makes the change, checks it, and opens a **pull request** (a proposed change) on GitHub.
4. On GitHub, open the pull request, read the summary, and click **Merge pull request** → **Confirm merge**. Your site updates a minute or two later.

**Prompts you can copy:**

- *"Here's my updated resume. Replace the standard PDF, update the web version and the accessible versions, and update anything on the homepage that changed."*
- *"Add a new job to the Experience section: [job title] at [company], [city], [start month year] to [end month year or Present]. Here's what I did: … Here's the company logo."*
- *"Add a new project to Case studies. Problem: … Action: … Result: …"*
- *"Add these skills: … Remove: …"*
- *"Change the colour scheme to the Sunset palette from GUIDE.md."*
- *"Replace my profile photo with this one. Strip the location data."*
- *"My headline should now say: …"*
- *"Undo the last change I made to the site."*

### Option B: Edit it yourself on GitHub.com

Good for quick text fixes like a typo, a date or a new skill.

**Edit a file**

1. Go to <https://github.com/Shrinetop/my-portfolio> and click the file (for example, `index.html`).
2. Click the **pencil icon** (✏️, "Edit this file") at the top right of the file.
3. Press **Ctrl+F** (Windows) or **Cmd+F** (Mac) to find the text you want to change. The search box inside GitHub's editor works best: click into the code first, then press the shortcut.
4. Make your change, only between the tags (see the rules below).
5. Click **Commit changes…** (green button). Write a short note like "Update headline", keep **Commit directly to the `main` branch** selected, and click **Commit changes**.

**Upload or replace a file**

1. Open the folder (for example, `assets/resume`).
2. Click **Add file** → **Upload files**, and drag your file in.
3. To *replace* a file, give yours **exactly the same name** as the old one. GitHub swaps it in.
4. Click **Commit changes**.

---

## 3. Five rules before you edit

**1. Only change the words between the tags.** HTML wraps text in pairs of tags like `<p>Your text</p>` or `<li>Your skill</li>`. Change the words in the middle, and leave the `<…>` parts, quotes `"` and slashes `/` exactly as they are.

```html
<li>Data entry</li>                    ← change "Data entry"
<p class="role__org">Copper Branch</p> ← change "Copper Branch", not class="role__org"
```

**2. Write a few characters as codes.** HTML reserves some characters:

| You want | Type this |
| --- | --- |
| & | `&amp;` |
| – (dash between dates or numbers) | `&ndash;` |
| · (middle dot separator) | `&middot;` |
| < or > | `&lt;` or `&gt;` |

Normal apostrophes (') and accented letters (é) are fine to type as-is.

**3. File names must match exactly.** `Profile.webp` and `profile.webp` are different files on the web. Avoid spaces in new file names; use dashes, like `logo-new-company.webp`.

**4. Remove location data from photos before uploading.** Phone photos can contain GPS coordinates of where they were taken. On iPhone, tap **Options** at the top of the share sheet and switch off **Location** before sharing or saving the photo. Or give the photo to Claude and ask it to strip the metadata.

**5. Keep images small.** Under about 300 KB each. A photo straight off a phone (3–5 MB) slows the site. Claude can resize it for you.

---

## 4. Recipes

### 4.1 Update your resume

Your resume exists in four versions, and they should always match:

| Version | File | How it's made |
| --- | --- | --- |
| Standard | `assets/resume/Krishal_Maharjan_Resume.pdf` | You export it from Word or LibreOffice |
| Web | `resume.html` | Edited by hand |
| Dyslexia-friendly | `assets/resume/Krishal_Maharjan_Resume_Dyslexia_Friendly.pdf` | Generated from `resume.html` |
| High contrast | `assets/resume/Krishal_Maharjan_Resume_High_Contrast.pdf` | Generated from `resume.html` |

**Easiest:** give Claude your new PDF with the first prompt in [Option A](#option-a-ask-claude-easiest-recommended). It updates all four versions, and anything on the homepage that changed.

**Doing it yourself:**

1. **Standard PDF:** export your resume as a PDF, rename it to exactly `Krishal_Maharjan_Resume.pdf`, and upload it into `assets/resume/` to replace the old one.
2. **Web version:** open `resume.html` and edit the text to match. It's laid out in the same order as your PDF: Profile, Skills, Experience, Education & certifications. A bullet point looks like this:
   ```html
   <li><strong>Cash handling:</strong> Processed and reconciled <strong>$1,500&ndash;$2,500</strong> in daily …</li>
   ```
   `<strong>…</strong>` makes text **bold**. Your phone number is deliberately *not* in this file, so it never appears on the website.
3. **Accessible PDFs:** these are generated by a tool, so ask Claude: *"I updated resume.html. Please rebuild the accessible resume PDFs. Use the phone number from my standard PDF."* (The technical steps are in `README.md` if you're ever curious.)
4. **Page counts:** if a PDF's page count changes, update the small "PDF · 1 page" / "PDF · 2 pages" labels in `index.html`. Search for `PDF &middot;`.
5. **Homepage:** if you added a job, a skill or a certification, update `index.html` too (recipes below).

### 4.2 Change text on the homepage

Open `index.html` and search for a few words of the text you want to change:

| What | Search for |
| --- | --- |
| Green "open to" badge at the top | `Open to roles in` |
| Headline under your name | `class="hero__role"` (the text is on the same line) |
| Intro paragraph | `class="hero__lead"` (the text is on the lines below) |
| Profile card (degree, IFC, co-op, availability) | `class="credential"` |
| About heading | `From physics and maths` |
| About paragraphs | `class="about__bio` |
| Experience heading | `What I did, and what it changed` |
| Projects heading | `Case studies` |
| Contact text | `I&rsquo;m looking for roles` |

The page is split into clearly labelled sections. Search for these markers to jump around:
`= Hero =`, `= About =`, `= Experience =`, `= Projects =`, `= Contact`.

Tip: searching for a `class="…"` name, like `class="hero__role"`, always lands on the one right spot. Searching for a phrase can also match hidden text at the top of the file (used for search engines and link previews).

### 4.3 Add or edit a job (Experience)

Each job is one block starting with a comment like `<!-- Copper Branch -->`. Jobs are listed newest first. To **edit** a job, find its block and change the text. To **add** a job, copy this template and paste it **above** the newest job, just after `<ol class="roles">`:

```html
          <!-- New Company -->
          <li class="role glass reveal">
            <header class="role__head">
              <span class="role__badge" aria-hidden="true"><img src="assets/img/logo-new-company.webp" width="160" height="160" alt="" loading="lazy" decoding="async"></span>
              <div class="role__heading">
                <h3 class="role__title">Job Title</h3>
                <p class="role__org">Company Name &middot; City, Province</p>
              </div>
              <p class="role__date"><time datetime="2026-10">Oct 2026</time> &ndash; Present</p>
            </header>

            <ul class="impact-grid impact-grid--two">
              <li class="impact">
                <p class="impact__label caps">Area of work</p>
                <p class="impact__metric"><strong>25%</strong> faster processing</p>
                <p class="impact__text">
                  One or two sentences on what you did and how.
                </p>
              </li>
              <li class="impact">
                <p class="impact__label caps">Another area</p>
                <p class="impact__text">
                  A tile without a number: just leave out the impact__metric line.
                </p>
              </li>
            </ul>
          </li>
```

What each part means:

- **`<time datetime="2026-10">`**: the date in `year-month` form, for search engines and screen readers. The text after it is what visitors see.
- **Impact tiles** (`<li class="impact">…</li>`): one per achievement. Copy a whole tile to add another.
  - The **`impact__metric`** line is optional. Use it when you have a number, and keep the context in the text below it.
  - Match the grid to your number of tiles: 3 or more → `impact-grid`; 2 → `impact-grid impact-grid--two`; 1 → `impact-grid impact-grid--one`.
- **Logo:** upload a square image to `assets/img/` and put its exact file name in `src="…"`. No logo? Ask Claude to make a tile, or delete the `<span class="role__badge"…>…</span>` line.
- **"Read the case study" link** (optional): add `<a class="impact__link" href="#project-id">Read the case study</a>` inside a tile, where `project-id` matches a project's `id` (see below).

### 4.4 Add or edit a project (Case studies)

Each project is an `<article class="project …">` block in the Projects section. To add one, copy this template and paste it after the last `</article>` in that section:

```html
          <article class="project glass glass--interactive reveal" id="project-short-name" aria-labelledby="project-short-name-title">
            <div class="project__head">
              <span class="project__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/></svg>
              </span>
              <p class="project__meta caps">Company &middot; Tools you used</p>
            </div>
            <h3 class="project__title" id="project-short-name-title">Project title</h3>
            <dl class="par">
              <div class="par__row">
                <dt>Problem</dt>
                <dd>What needed fixing.</dd>
              </div>
              <div class="par__row">
                <dt>Action</dt>
                <dd>What you did.</dd>
              </div>
              <div class="par__row">
                <dt>Result</dt>
                <dd>What changed because of it.</dd>
              </div>
            </dl>
          </article>
```

- Replace **`project-short-name`** in all three places with something unique, like `project-budget-tracker`. No spaces.
- The **Result** row is optional: delete that whole `<div class="par__row">…</div>` if there isn't one yet.
- The **icon** is a small drawing (`<svg>…</svg>`). The template uses a check mark; you can copy the icon from another project, or ask Claude for a fitting one.
- If you **delete or rename** a project, search for its old `id` (e.g. `#project-signage`) in the Experience section and update or remove any "Read the case study" link pointing to it.

### 4.5 Skills and coursework

In `index.html`, skills are grouped under headings like `Microsoft Office` and `Operations`. Each skill is one line:

```html
<li>Data entry</li>
```

- **Add a skill:** copy a line and change the words.
- **Remove one:** delete its whole line.
- **Add a group:** copy one whole `<div class="skill-group glass reveal">…</div>` block and change the heading and the skills.
- **Coursework** chips work the same way. Search for `Relevant coursework`.

Also update the Skills section of `resume.html` so your resume matches.

### 4.6 Education, certifications and badges

In `index.html`, search for `Education &amp; certifications`.

- The **IFC badge** block is the `<div class="cert-badge">` section. To add another certification with a badge, copy that whole block, upload the badge image to `assets/img/`, and change the image name, link, date, title and issuer.
- **Degrees** are in the `<ol class="timeline">` list below it. Copy a `<li class="timeline__item">…</li>` to add another.
- The profile card at the top of the page also lists your degree and IFC. Search for `class="credential"`.

### 4.7 Your photo and company logos

**Easiest:** give Claude the image and say what it's for. It will crop it, resize it and strip location data.

Doing it yourself:

- **Profile photo:** the site uses `assets/img/profile-176.webp` and `assets/img/profile-264.webp`. These are square photos, 176×176 and 264×264 pixels. Replace both with the same names. Crop to head and shoulders first.
- **Company logo:** a square image, ideally with a white or transparent background, around 160×160 pixels, saved in `assets/img/`. Then use its file name in the job's `<img src="…">`.
- **Remember** [rule 4](#3-five-rules-before-you-edit): remove location data before uploading any photo.

### 4.8 Contact details

Your LinkedIn and email each appear in several places. Use Ctrl+F and change **every** match:

| Detail | Search for | Where |
| --- | --- | --- |
| LinkedIn | `linkedin.com/in/krishal-maharjan` | 3 places in `index.html`, 2 in `resume.html` (the link and its visible text) |
| Email | `kmaharjan1212@gmail.com` | 2 places in `index.html` (the link and the text on the button), 2 in `resume.html` (the link and its visible text) |

Your phone number is intentionally **not** on the website. It only appears inside the PDFs.

### 4.9 Change the colour scheme

All the colours live at the top of **`styles.css`**, under the comment `1. Palette: default vibrant`:

```css
  --p-accent-l: #0062d1;    /* main accent, light mode (links, headings, buttons) */
  --p-accent-d: #6cb8ff;    /* main accent, dark mode */
  --p-accent2-l: #8a35d6;   /* 2nd accent, light mode (gradients, button blend) */
  --p-accent2-d: #c79bff;   /* 2nd accent, dark mode */
  --p-accent3-l: #cc1f5a;   /* 3rd accent, light mode (end of your name's gradient) */
  --p-accent3-d: #ff86a6;   /* 3rd accent, dark mode */
  --p-blob-1: #0a84ff;      /* the 5 soft colour glows in the background */
  --p-blob-2: #bf5af2;
  --p-blob-3: #ff375f;
  --p-blob-4: #ff9f0a;
  --p-blob-5: #30d5c8;
```

Colours are written as **hex codes** (`#` plus 6 characters). A colour picker like <https://htmlcolorcodes.com> gives you these.

**The one rule: text must stay readable.**
- `-l` colours are used on light backgrounds, so they must be dark enough.
- `-d` colours are used on dark backgrounds, so they must be light enough.
- Check each one at <https://webaim.org/resources/contrastchecker/>: put the accent as the foreground and `#FFFFFF` (for `-l`) or `#07080F` (for `-d`) as the background, and aim for **4.5:1 or higher**.
- The background glows (`--p-blob-*`) are decoration, so any colours work there.

**Ready-made palettes** (already contrast-checked). Replace the lines above with one of these:

<details>
<summary><strong>Ocean &amp; mint</strong>: blues and greens</summary>

```css
  --p-accent-l: #006a8e;
  --p-accent-d: #4fd1f5;
  --p-accent2-l: #00786b;
  --p-accent2-d: #5fe0c3;
  --p-accent3-l: #1a63bd;
  --p-accent3-d: #8cc2ff;
  --p-blob-1: #00c7be;
  --p-blob-2: #30d158;
  --p-blob-3: #0a84ff;
  --p-blob-4: #64d2ff;
  --p-blob-5: #5e5ce6;
```
</details>

<details>
<summary><strong>Sunset</strong>: orange, rose and purple</summary>

```css
  --p-accent-l: #c2410c;
  --p-accent-d: #fb923c;
  --p-accent2-l: #be123c;
  --p-accent2-d: #fb7185;
  --p-accent3-l: #7e22ce;
  --p-accent3-d: #c084fc;
  --p-blob-1: #ff9f0a;
  --p-blob-2: #ff375f;
  --p-blob-3: #bf5af2;
  --p-blob-4: #ffd60a;
  --p-blob-5: #ff6482;
```
</details>

Good to know:

- The **colour-blind modes** in the accessibility panel have their own palettes further down in `styles.css` (`data-vision=…`). They keep working whatever you choose here, so leave them alone.
- The small **tab icon** (favicon) and the **link-preview image** have their own colours baked in. Ask Claude to update them to match a new palette.

### 4.10 Link previews (what shows when you share the link)

When you paste your link into LinkedIn, iMessage or Slack, they show `assets/img/og-card.jpg`: your photo, name and headline. If your headline changes, ask Claude to regenerate it.

- Link previews need your site's full address, which is written in `index.html` and `resume.html` (search for `shrinetop.github.io`). If you ever move the site, for example to Cloudflare, ask Claude to update those.
- LinkedIn remembers old previews for about a week. To refresh it straight away, paste your link into <https://www.linkedin.com/post-inspector/>.

---

## 5. Check your work

After a change reaches `main`:

1. **Wait 1 to 2 minutes**, then open your site.
2. **Force a fresh copy:** press **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac), or open it in a private/incognito window.
3. **Check on your phone**, and in **dark mode** (the moon/sun button in the header).
4. Open the **accessibility panel** (the person icon in the header). Try dyslexia-friendly text and a colour-vision mode to make sure everything still reads well.
5. If you changed the resume, download each version from the "Download my resume" section and open it.

---

## 6. If something goes wrong

**The site didn't update.**
Go to the repo's **Actions** tab and look for **pages build and deployment**. A yellow dot means it's still working; a red ✗ means it failed. Click it, copy the error, and ask Claude about it.

**The layout looks broken after an edit.**
Usually a tag got damaged: a missing `>`, `</li>` or `"`. You can:
- ask Claude: *"My last edit to index.html broke the layout. Please find and fix it."*; or
- open the file on GitHub, click **History**, open the last good version, click **⋯** → **View file** → the copy icon, then paste it back over the broken file and commit.

**An image doesn't show.**
Check that the file name in the code matches the uploaded file **exactly**, including capital letters and the extension (`.webp` vs `.png`).

**A merged pull request needs undoing.**
Open the pull request on GitHub and click **Revert**. This creates a new pull request that undoes it; merge that one.

---

## 7. Glossary

| Word | Meaning |
| --- | --- |
| **Repository (repo)** | The folder on GitHub that holds all your site's files and their history. |
| **Commit** | A saved change, with a short note describing it. |
| **Branch** | A separate copy for working on changes. `main` is the live one. |
| **Pull request (PR)** | A proposed set of changes from a branch. Merging it copies the changes into `main`. |
| **Merge** | Accepting a pull request, which updates the live site. |
| **HTML** | The page's content and structure (`index.html`, `resume.html`). |
| **CSS** | The look: colours, spacing, fonts (`styles.css`). |
| **JavaScript (JS)** | The behaviour: menus, settings, animations (`script.js`). |
| **Tag** | An HTML marker like `<p>` … `</p>` that wraps content. |
| **Hex code** | A colour written as `#` plus 6 characters, e.g. `#0062d1`. |
| **GitHub Pages** | GitHub's free hosting, which publishes your `main` branch. |
