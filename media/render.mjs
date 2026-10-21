// Renders the Zerith brand video and LinkedIn images with headless Chrome + ffmpeg.
// Usage: npm run render            (everything)
//        node render.mjs stills     (images only)
//        node render.mjs video      (videos only)
import puppeteer from 'puppeteer-core';
import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'out');
mkdirSync(out, { recursive: true });
const src = f => pathToFileURL(path.join(here, 'src', f)).href;
const what = process.argv[2] || 'all';

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--allow-file-access-from-files', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--use-angle=metal', '--hide-scrollbars']
});
const page = await browser.newPage();
page.on('pageerror', e => console.error('page error:', e.message));

async function still(query, w, h, file, dpr = 1) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
  await page.goto(src('social.html') + query + '&dpr=' + dpr, { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.ready);
  await page.screenshot({ path: path.join(out, file), clip: { x: 0, y: 0, width: w, height: h } });
  console.log('✓', file);
}

async function video(w, h, file, fps = 30, seconds = 12) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(src('video.html') + `?w=${w}&h=${h}&render=1`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.ready);
  const ff = spawn(ffmpegPath, [
    '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    path.join(out, file)
  ], { stdio: ['pipe', 'ignore', 'inherit'] });
  const total = fps * seconds;
  for (let f = 0; f < total; f++) {
    await page.evaluate(t => window.frame(t), f / fps);
    const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: w, height: h } });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 60 === 0) process.stdout.write(`  ${file}: ${Math.round(f / total * 100)}%\n`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  console.log('✓', file);
}

if (what === 'all' || what === 'stills') {
  await still('?type=personal', 1584, 396, 'linkedin-personal-cover-1584x396.png');
  await still('?type=personal', 1584, 396, 'linkedin-personal-cover-1584x396@2x.png', 2);
  await still('?type=company', 1128, 191, 'linkedin-company-cover-1128x191.png');
  await still('?type=company', 1128, 191, 'linkedin-company-cover-1128x191@2x.png', 2);
  await still('?type=logo&s=400', 400, 400, 'linkedin-logo-400x400.png');
  await still('?type=logo&s=400', 400, 400, 'linkedin-logo-1200x1200.png', 3);
}
if (what === 'all' || what === 'video') {
  await video(1920, 1080, 'zerith-reveal-1920x1080.mp4');
  await video(1080, 1080, 'zerith-reveal-1080x1080.mp4');
}
await browser.close();
