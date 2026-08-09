#!/usr/bin/env node
/**
 * Records Brain inject → gate → unlock for outreach (mp4 + gif).
 * Usage: BASE_URL=https://… node scripts/record-brain-demo.mjs
 */
import { chromium } from "@playwright/test";
import { mkdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const baseURL = process.env.BASE_URL || "https://dmf-personal-portfolio.netlify.app";
const outDir = process.env.OUT_DIR || "/opt/cursor/artifacts";
mkdirSync(outDir, { recursive: true });

const videoDir = resolve(outDir, "brain-demo-video-raw");
mkdirSync(videoDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: videoDir, size: { width: 1280, height: 800 } },
  // Keep motion on for outreach clips; smoke tests use reducedMotion separately.
  reducedMotion: "no-preference",
});
const page = await context.newPage();

await page.goto(baseURL.replace(/\/$/, "") + "/demos/brain/", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(800);

await page.locator('[data-channel="agent"] button', { hasText: "INJECT NEXT" }).click();
await page.getByRole("button", { name: "PROMOTE" }).waitFor({ state: "visible", timeout: 8000 });
await page.waitForTimeout(900);
await page.getByRole("button", { name: "PROMOTE" }).click();
await page.locator("#unlockList .row").first().waitFor({ state: "visible", timeout: 8000 });
await page.waitForTimeout(1800);

const video = page.video();
await context.close();
await browser.close();

const rawPath = video ? await video.path() : null;
if (!rawPath || !existsSync(rawPath)) {
  console.error("No video recorded");
  process.exit(1);
}

const mp4 = resolve(outDir, "brain-demo-inject-gate-unlock.mp4");
const gif = resolve(outDir, "brain-demo-inject-gate-unlock.gif");

const mp4Res = spawnSync(
  "ffmpeg",
  ["-y", "-i", rawPath, "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", mp4],
  { encoding: "utf8" },
);
if (mp4Res.status !== 0) {
  console.error(mp4Res.stderr);
  process.exit(mp4Res.status || 1);
}

const gifRes = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-i",
    mp4,
    "-vf",
    "fps=12,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=96[p];[s1][p]paletteuse",
    gif,
  ],
  { encoding: "utf8" },
);
if (gifRes.status !== 0) {
  console.error(gifRes.stderr);
  process.exit(gifRes.status || 1);
}

console.log("Wrote", mp4);
console.log("Wrote", gif);
