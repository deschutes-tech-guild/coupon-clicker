export function waitForElements(
  document: Document,
  selector: string,
  { timeout = 10000, interval = 100 } = {}
): Promise<boolean> {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (document.querySelectorAll(selector).length > 0) {
        clearInterval(intervalId);
        resolve(true);
      }
    }, interval);

    setTimeout(() => {
      clearInterval(intervalId);
      resolve(false);
    }, timeout);
  });
}