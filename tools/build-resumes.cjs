/**
 * Regenerates the accessible resume PDFs from resume.html.
 *
 * The standard PDF (assets/resume/Krishal_Maharjan_Resume.pdf) is the original
 * export and is not touched. Edit resume.html, then run:
 *
 *   npm install
 *   npx playwright install chromium   # first time only
 *   npm run build:resumes
 *
 * Output PDFs are tagged (headings, lists and reading order for screen readers)
 * and include a document outline, so they stay accessible after export.
 */
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'resume');

const VARIANTS = [
  { file: 'Krishal_Maharjan_Resume_Dyslexia_Friendly.pdf', query: 'variant=dyslexia' },
  { file: 'Krishal_Maharjan_Resume_OpenDyslexic.pdf', query: 'variant=dyslexia&font=opendyslexic' },
  { file: 'Krishal_Maharjan_Resume_High_Contrast.pdf', query: 'variant=contrast' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ colorScheme: 'light' });
  const source = pathToFileURL(path.join(ROOT, 'resume.html')).href;

  for (const variant of VARIANTS) {
    await page.goto(`${source}?${variant.query}`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);

    const output = path.join(OUT_DIR, variant.file);
    await page.pdf({
      path: output,
      format: 'Letter',
      printBackground: true,
      preferCSSPageSize: true,
      tagged: true,
      outline: true,
    });
    console.log(`Wrote ${path.relative(ROOT, output)}`);
  }

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
