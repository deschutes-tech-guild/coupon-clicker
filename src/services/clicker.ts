// Converted to TS from: https://gist.github.com/ctsstc/73a74ae0f0c315262bf07cea9fdc7aa2#file-safeway-just-for-u-clicker-js

import { simulateTrustedClickOnElement } from './debug-clicker'
import { debugLog } from './logger'

const debugging = true;

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
          this.clickElement(el);

          const isLast = index == all.length - 1;
          if (isLast) {
            resolve();
          }
        }, index * this.delay + this.getRandomWait())
      );
    });
  }

  private clickElement(element: Element): boolean {
    debugLog("Click", { debugging }, element);

    if (debugging) return false;

    simulateTrustedClickOnElement(element);
    return true;
  }

  private getRandomWait(): number {
    return Math.floor(Math.random() * this.randomWaitMax);
  }

  private findAll(): NodeListOf<Element> {
    return this.document.querySelectorAll(this.selector);
  }
}
