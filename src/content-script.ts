import { Clicker } from './services/clicker'

console.log("🔥🔥🔥 👋🌐 HELLO WORLD!!!", new Date().getTime());

window.addEventListener("load", () => {
  console.log("🔥🔥🔥 PAGE LOADED");

  // Copied from: https://gist.github.com/ctsstc/73a74ae0f0c315262bf07cea9fdc7aa2#file-safeway-just-for-u-clicker-js
  let coupons = new Clicker(window.document, "[id^=couponAddBtn]");
  let loadButton = new Clicker(window.document, ".btn.load-more", {
    delay: 2000,
    randomWaitMax: 500,
  });

  // Anonymous singleton
  new (class {
    readonly #coupons: Clicker;
    readonly #loadButton: Clicker;

    constructor(coupons: Clicker, loadButton: Clicker) {
      this.#coupons = coupons;
      this.#loadButton = loadButton;
    }

    async run() {
      // State 1
      //  Has coupon buttons -> Click all buttons
      if (this.#coupons.hasMore()) {
        // Note: console.log has been removed
        console.warn("GOTTA CLICK'EM ALL!!!");
        await this.#coupons.clickAll();
        this.run();
      }
      // State 2
      //  Has load more -> Click load more
      else if (this.#loadButton.hasMore()) {
        console.warn("LOAD MOARRR!!!");
        await this.#loadButton.clickAll();
        this.run();
      }
      // State 3
      //  Has neither -> Finish
      else {
        console.warn("LE FINI! 🚀");
      }
    }
  })(coupons, loadButton).run();
});
