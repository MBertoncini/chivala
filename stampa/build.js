// Genera i PDF da stampare con Chromium:
//   fototrappola.html → fototrappola.pdf (4 pagine A4)
//   stand-a3.html     → stand-a3.pdf     (2 manifesti A3)
// Uso: node build.js            (tutti e due)
//      node build.js stand-a3   (solo uno)
const { chromium } = require('playwright');
const path = require('path');

const tutti = ['fototrappola', 'stand-a3'];
const scelti = process.argv[2] ? [process.argv[2].replace(/\.html$/, '')] : tutti;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const nome of scelti) {
    await page.goto('file://' + path.join(__dirname, nome + '.html'), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: path.join(__dirname, nome + '.pdf'), printBackground: true, preferCSSPageSize: true });
  }
  await browser.close();
})();
