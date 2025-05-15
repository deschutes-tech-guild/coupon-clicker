// Converted to TS from: https://gist.github.com/ctsstc/73a74ae0f0c315262bf07cea9fdc7aa2#file-safeway-just-for-u-clicker-js

import { debugLog } from './logger'

export class Clicker {
  private readonly delay: number;
  private readonly randomWaitMax: number;

  constructor(
    private readonly document: Document,
    private readonly selector: string,
    { delay = 1000, randomWaitMax = 0 } = {}
  ) {
    this.delay = delay;
    this.randomWaitMax = randomWaitMax;
  }

  hasMore(): boolean {
    return this.findAll().length > 0;
  }

  clickAll(): Promise<void> {
    return new Promise((resolve) => {
      const all = this.findAll();

      all.forEach((el, index) =>
        setTimeout(() => {
          const isLast = index == all.length - 1;

          // TODO: Use a real clicker; from debug-clicker
          // simulateTrustedClickOnElement(el);
          debugLog("CLICKED", el);

          if (isLast) {
            resolve();
          }
        }, index * this.delay + this.getRandomWait())
      );
    });
  }

  private getRandomWait(): number {
    return Math.floor(Math.random() * this.randomWaitMax);
  }

  private findAll(): NodeListOf<Element> {
    return this.document.querySelectorAll(this.selector);
  }
}
