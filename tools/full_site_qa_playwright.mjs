import { createRequire } from "node:module";

const require = createRequire("/Users/ddm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/");
const { chromium } = require("playwright");

const url = process.argv[2] || "http://127.0.0.1:4177/";

const browser = await chromium.launch({ headless: true });
const consoleErrors = [];

async function desktopQa() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1200);
  return page.evaluate(async () => {
    const visible = (element) => Boolean(element) && !element.hidden && getComputedStyle(element).display !== "none" && getComputedStyle(element).visibility !== "hidden";
    const text = (selector) => document.querySelector(selector)?.textContent?.trim() || "";
    const adminSections = [...document.querySelectorAll("#admin-data,#cvent,#missing-files,#report-inbox,#slack,#data-health,#duplicate-review,#site-audit")]
      .map((element) => ({ id: element.id, hidden: element.hidden, display: getComputedStyle(element).display }));
    const clickAndCheck = async (href) => {
      document.querySelector(`a[href='${href}']`)?.click();
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        href,
        hash: location.hash,
        activeGroup: document.body.dataset.activeGroup,
        targetHidden: document.querySelector(href)?.hidden || false
      };
    };
    const navChecks = [];
    for (const href of ["#who-do-i-call", "#locations", "#menus", "#guests", "#report-inbox"]) {
      navChecks.push(await clickAndCheck(href));
    }
    const input = document.querySelector("[data-home-personal-input]");
    input.value = "Samuel Price";
    document.querySelector("[data-home-search-submit]")?.click();
    await new Promise((resolve) => setTimeout(resolve, 350));
    const searchCards = [...document.querySelectorAll("[data-search-results] .mobile-result-card")]
      .slice(0, 5)
      .map((card) => card.textContent.trim().replace(/\s+/g, " ").slice(0, 220));
    document.querySelector("[data-ask-open]")?.click();
    await new Promise((resolve) => setTimeout(resolve, 250));
    const askOpen = document.querySelector("[data-ask-drawer]")?.classList.contains("is-open") || !document.querySelector("[data-ask-drawer]")?.hidden;
    document.querySelector("[data-ask-chip='report issue']")?.click();
    await new Promise((resolve) => setTimeout(resolve, 250));
    const reportModalOpen = !document.querySelector("[data-report-modal]")?.hidden;
    return {
      timeText: text("[data-ibiza-time]"),
      fallbackVisible: visible(document.querySelector("[data-countdown-fallback]")),
      footerUpdated: text("[data-footer-updated]"),
      adminSections,
      navChecks,
      searchCards,
      askOpen,
      reportModalOpen,
      activeGroup: document.body.dataset.activeGroup,
      bodyWidth: document.body.scrollWidth,
      viewportWidth: innerWidth
    };
  });
}

async function mobileQa() {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1200);
  return page.evaluate(async () => {
    const input = document.querySelector("[data-home-personal-input]");
    input.value = "Samuel Hosier";
    document.querySelector("[data-home-search-submit]")?.click();
    await new Promise((resolve) => setTimeout(resolve, 350));
    const firstCard = document.querySelector("[data-search-results] .mobile-result-card");
    const cardRect = firstCard?.getBoundingClientRect();
    const askRect = document.querySelector("[data-ask-open]")?.getBoundingClientRect();
    const bottomNavRect = document.querySelector(".section-jump")?.getBoundingClientRect();
    return {
      bodyWidth: document.body.scrollWidth,
      viewportWidth: innerWidth,
      overflow: document.body.scrollWidth > innerWidth + 2,
      timeText: document.querySelector("[data-ibiza-time]")?.textContent?.trim() || "",
      fallbackHidden: document.querySelector("[data-countdown-fallback]")?.hidden,
      firstCardText: firstCard?.textContent?.trim().replace(/\s+/g, " ").slice(0, 220) || "",
      firstCardWidth: cardRect?.width || 0,
      askOverlapsFirstCard: Boolean(askRect && cardRect && !(askRect.right < cardRect.left || askRect.left > cardRect.right || askRect.bottom < cardRect.top || askRect.top > cardRect.bottom)),
      bottomNavTop: bottomNavRect?.top || 0
    };
  });
}

try {
  const result = {
    desktop: await desktopQa(),
    mobile: await mobileQa(),
    consoleErrors
  };
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
