import { Clicker } from './services/clicker'
import { debugLog } from './services/logger'
import { Runner } from './services/runner'

debugLog("👋🌐 HELLO WORLD!!!", new Date().getTime());

window.addEventListener("load", () => {
  debugLog("PAGE LOADED");

  // Copied from: https://gist.github.com/ctsstc/73a74ae0f0c315262bf07cea9fdc7aa2#file-safeway-just-for-u-clicker-js
  let couponClicker = new Clicker(window.document, "[id^=couponAddBtn]");
  let loadButtonClicker = new Clicker(window.document, ".btn.load-more", {
    delay: 2000,
    randomWaitMax: 500,
  });

  new Runner(couponClicker, loadButtonClicker).run();
});
