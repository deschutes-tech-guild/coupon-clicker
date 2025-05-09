import { Clicker } from './clicker';
import { debugLog } from './logger';

export class Runner {
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
      debugLog("GOTTA CLICK'EM ALL!!!");
      await this.#coupons.clickAll();
      this.run();
    }
    // State 2
    //  Has load more -> Click load more
    else if (this.#loadButton.hasMore()) {
      debugLog("LOAD MOARRR!!!");
      await this.#loadButton.clickAll();
      this.run();
    }
    // State 3
    //  Has neither -> Finish
    else {
      debugLog("LE FINI! 🚀");
    }
  }
}