import { Clicker } from './services/clicker'
import { debugLog } from './services/logger'
import { Runner } from './services/runner'
import { waitForElements } from './services/wait-for-elements'

debugLog("👋🌐 Hello World!!!", new Date().toLocaleString());

window.addEventListener("load", () => {
  debugLog("Page Loaded");

  waitForElements(window.document, ".section-heading", { interval: 500 }).then((hasElements) => {
    if (!hasElements) {
      debugLog("Coupon Header UI not Found");
      return;
    }

    initialize();
  });
});

function initialize() {
  debugLog("Initializing");

  const couponClicker = new Clicker(window.document, "[id^=couponAddBtn]", {
    delay: 2000,
    randomWaitMax: 10000,
  });
  const loadButtonClicker = new Clicker(window.document, ".btn.load-more", {
    delay: 3000,
    randomWaitMax: 3000,
  });

  new Runner(couponClicker, loadButtonClicker).run();
}