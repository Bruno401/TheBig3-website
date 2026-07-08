import { chromium } from "playwright"
import { mkdirSync } from "node:fs"

const BASE_URL = process.env.HERO_URL ?? "http://localhost:3000"
const OUT_DIR = "./hero-audit"

const DEVICES = [
  // Laptops
  { name: "laptop-1366", width: 1366, height: 768 },
  { name: "macbook-air", width: 1440, height: 900 },
  { name: "macbook-14", width: 1512, height: 982 },
  { name: "macbook-16", width: 1728, height: 1117 },
  { name: "fullhd", width: 1920, height: 1080 },
  { name: "ultrawide", width: 2560, height: 1440 },
  // Tablets
  { name: "ipad-mini", width: 768, height: 1024 },
  { name: "ipad-air", width: 820, height: 1180 },
  { name: "ipad-pro11", width: 834, height: 1194 },
  { name: "ipad-pro129", width: 1024, height: 1366 },
  { name: "ipad-land", width: 1180, height: 820 },
]

mkdirSync(OUT_DIR, { recursive: true })

const browser = await chromium.launch()

for (const device of DEVICES) {
  const page = await browser.newPage({
    viewport: { width: device.width, height: device.height },
  })
  await page.goto(BASE_URL, { waitUntil: "networkidle" })
  // let video, fonts, and entrance animations settle
  await page.waitForTimeout(1500)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)

  // capture exactly one viewport — what the user sees without scrolling
  await page.screenshot({
    path: `${OUT_DIR}/${device.name}.png`,
    clip: { x: 0, y: 0, width: device.width, height: device.height },
  })

  // diagnostics: horizontal overflow + hero section height
  const info = await page.evaluate(() => {
    const hero = document.querySelector("#home")
    const rect = hero?.getBoundingClientRect()
    return {
      hasHScroll:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      heroHeight: rect ? Math.round(rect.height) : null,
    }
  })
  console.log(
    `${device.name.padEnd(12)} ${String(device.width).padStart(4)}x${String(device.height).padEnd(5)} hero=${info.heroHeight}px viewport=${device.height}px hScroll=${info.hasHScroll ? `YES (${info.scrollWidth}>${info.clientWidth})` : "no"}`,
  )
  await page.close()
}

await browser.close()
console.log(`\nScreenshots written to ${OUT_DIR}/`)
