// Usage: node render.mjs scene-1.html out/scene-1.mp4 [fps]
// Steps the page's master clock frame by frame (window.seek) and pipes PNGs to ffmpeg. Silent video.
import { createRequire } from 'module';
import { spawn } from 'child_process';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
const { chromium } = createRequire(import.meta.url)('playwright');
const [,, src = 'scene-1.html', out = 'out/scene-1.mp4', fpsArg = '30'] = process.argv;
const fps = Number(fpsArg);
mkdirSync(dirname(out), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('file://' + resolve(src) + '?t=0');
await page.waitForFunction(() => window.__ready);
const T = await page.evaluate(() => window.T_END);
const frames = Math.round(T * fps);
const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'medium', '-movflags', '+faststart', out],
  { stdio: ['pipe', 'inherit', 'inherit'] });
for (let i = 0; i < frames; i++) {
  await page.evaluate(t => window.seek(t), i / fps);
  const png = await page.screenshot({ type: 'png' });
  if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));
await browser.close();
console.log(`wrote ${out}: ${frames} frames @ ${fps}fps (${T}s)`);
