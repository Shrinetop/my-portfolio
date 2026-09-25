/**
 * Regenerates the accessible resume PDFs from resume.html.
 *
 * The standard PDF (assets/resume/Krishal_Maharjan_Resume.pdf) is the original
 * export and is not touched. Edit resume.html, then run:
 *
 *   cd tools
 *   npm install
 *   npx playwright install chromium   # first time only
 *   RESUME_PHONE="(555) 555-5555" npm run build:resumes
 *
 * The phone number is kept off the website on purpose, so it isn't stored in
 * resume.html or in this repo. It is passed in at build time and only ends up
 * in the PDFs.
 *
 * Output PDFs are tagged (headings, lists and reading order for screen readers)
 * and include a document outline, so they stay accessible after export.
 */
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'resume');
const PHONE = (process.env.RESUME_PHONE || '').trim();

const VARIANTS = [
  { file: 'Krishal_Maharjan_Resume_Dyslexia_Friendly.pdf', query: 'variant=dyslexia' },
  { file: 'Krishal_Maharjan_Resume_High_Contrast.pdf', query: 'variant=contrast' },
];

if (!PHONE) {
  console.error('Set RESUME_PHONE to the phone number to print on the PDFs, e.g.');
  console.error('  RESUME_PHONE="(555) 555-5555" npm run build:resumes');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ colorScheme: 'light' });
  const source = pathToFileURL(path.join(ROOT, 'resume.html')).href;

  for (const variant of VARIANTS) {
    await page.goto(`${source}?${variant.query}`, { waitUntil: 'load' });

    // Insert the phone number after the location, matching the standard PDF.
    await page.evaluate((phone) => {
      const list = document.querySelector('[data-contact-list]');
      const digits = phone.replace(/\D/g, '');
      const link = document.createElement('a');
      link.href = 'tel:+' + (digits.length === 10 ? '1' + digits : digits);
      link.textContent = phone;
      const item = document.createElement('li');
      item.append(link);
      list.firstElementChild.after(item);
    }, PHONE);

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
