/**
 * Verifies date-picker backdrop does not block taps when closed (mobile viewport).
 */
import { chromium, devices } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:5000";

const iphone = devices["iPhone 13"];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ ...iphone });
const page = await context.newPage();

await page.goto(BASE, { waitUntil: "networkidle" });

const backdrop = page.locator("#tourDateBackdrop");
const heroBtn = page.locator(".hero__button");

const backdropState = await backdrop.evaluate((el) => {
  const s = getComputedStyle(el);
  return {
    hidden: el.hidden,
    display: s.display,
    pointerEvents: s.pointerEvents,
    position: s.position,
    zIndex: s.zIndex,
  };
});

const btnBox = await heroBtn.boundingBox();
if (!btnBox) throw new Error("Hero button not visible");

const centerX = btnBox.x + btnBox.width / 2;
const centerY = btnBox.y + btnBox.height / 2;

const topEl = await page.evaluate(
  ({ x, y }) => {
    const el = document.elementFromPoint(x, y);
    return el
      ? { tag: el.tagName, id: el.id, className: el.className }
      : null;
  },
  { x: centerX, y: centerY }
);

let navigated = false;
page.on("framenavigated", () => {
  navigated = true;
});

await page.mouse.click(centerX, centerY);
await page.waitForTimeout(400);

const hash = await page.evaluate(() => window.location.hash);

await browser.close();

const pass =
  backdropState.hidden === true &&
  backdropState.display === "none" &&
  (topEl?.className?.includes("hero__button") ||
    topEl?.tag === "A") &&
  hash === "#tours";

console.log(JSON.stringify({ backdropState, topEl, hash, pass }, null, 2));
process.exit(pass ? 0 : 1);
