import { Clicker } from './clicker';
import { debugLog } from './logger';

export class Runner {
  private readonly coupons: Clicker;
  private readonly loadButton: Clicker;
  private running = false;

  constructor(coupons: Clicker, loadButton: Clicker) {
    this.coupons = coupons;
    this.loadButton = loadButton;
  }

  public async run(): Promise<void> {
    this.running = true;

    return this.process();
  }

  public stop() {
    this.running = false;
  }

  private async process(): Promise<void> {
    if (!this.running) {
      return;
    }

    // State 1
    //  Has coupon buttons -> Click all buttons
    if (this.coupons.hasMore()) {
      // Note: console.log has been removed
      debugLog("GOTTA CLICK'EM ALL!!!");
      await this.coupons.clickAll();
      return this.process();
    }
    // State 2
    //  Has load more -> Click load more
    else if (this.loadButton.hasMore()) {
      debugLog("LOAD MOARRR!!!");
      await this.loadButton.clickAll();
      return this.process();
    }
    // State 3
    //  Has neither -> Finish
    else {
      debugLog("LE FINI! 🚀");
    }
  }
}
