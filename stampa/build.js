// Genera fototrappola.pdf (A4) da fototrappola.html con Chromium.
// Uso: node build.js   [png]  → con "png" salva anche le anteprime delle pagine
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'fototrappola.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(__dirname, 'fototrappola.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  if (process.argv[2] === 'png') {
    await page.setViewportSize({ width: 794, height: 1123 });
    const n = await page.locator('.page').count();
    for (let i = 0; i < n; i++)
      await page.locator('.page').nth(i).screenshot({ path: path.join(process.argv[3] || __dirname, `pagina-${i + 1}.png`), scale: 'device' });
  }
  await browser.close();
})();
