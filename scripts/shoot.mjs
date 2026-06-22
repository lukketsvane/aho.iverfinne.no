// Render PNG-skjermbilete av dei ti UI-skissene frå den køyrande appen.
// Bruk: node scripts/shoot.mjs  (krev at appen køyrer på BASE)
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/opt/node22/lib/node_modules/playwright'));
}

const BASE = process.env.BASE || 'http://localhost:4321';
const OUT = 'design/sketches';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1500, height: 2200 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

// vent på at serveren svarar
let up = false;
for (let i = 0; i < 40 && !up; i++) {
  try {
    await page.goto(`${BASE}/skisser`, { waitUntil: 'networkidle', timeout: 4000 });
    up = true;
  } catch {
    await new Promise((r) => setTimeout(r, 1000));
  }
}
if (!up) {
  console.error('Serveren svara ikkje på', BASE);
  process.exit(1);
}

// fontane og whileInView-animasjonar treng eit lite augneblink
await page.waitForTimeout(1200);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(800);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);

const ids = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
for (const n of ids) {
  const el = await page.$(`#shot-${n}`);
  if (!el) {
    console.error('fann ikkje #shot-' + n);
    continue;
  }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await el.screenshot({ path: `${OUT}/sketch-${n}.png` });
  console.log('✓ sketch-' + n + '.png');
}

// heile galleriet som eitt oversiktsbilete
await page.screenshot({ path: `${OUT}/_galleri.png`, fullPage: true });
console.log('✓ _galleri.png');

await browser.close();
