import { chromium } from "playwright";
import path from "path";

const OUTPUT_DIR = "d:/PrimaryProject/portofilo/public/images/projects/traweh";

const screenshots = [
  {
    name: "traweh-hero.png",
    url: "https://traweh.org",
    viewport: { width: 1440, height: 900 },
  },
  {
    name: "traweh-mobile.png",
    url: "https://traweh.org",
    viewport: { width: 390, height: 844 },
  },
  {
    name: "traweh-map.png",
    url: "https://traweh.org/map",
    viewport: { width: 1440, height: 900 },
  },
  {
    name: "traweh-haram.png",
    url: "https://traweh.org/haram/makkah",
    viewport: { width: 1440, height: 900 },
  },
];

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const shot of screenshots) {
    console.log(`Capturing: ${shot.name} (${shot.url}) @ ${shot.viewport.width}x${shot.viewport.height}`);

    const context = await browser.newContext({
      viewport: shot.viewport,
      locale: "ar-SA",
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();

    try {
      await page.goto(shot.url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(3000);

      const outputPath = path.join(OUTPUT_DIR, shot.name);
      await page.screenshot({ path: outputPath, type: "png" });
      console.log(`  Saved: ${outputPath}`);
    } catch (err) {
      console.error(`  ERROR capturing ${shot.name}: ${err.message}`);
    }

    await context.close();
  }

  await browser.close();
  console.log("\nDone.");
}

main();
