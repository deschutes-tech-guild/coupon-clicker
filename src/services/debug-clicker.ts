// Copied from: https://stackoverflow.com/a/79249791/349659

export function simulateTrustedClickOnElement(
  element: Element,
  button = "left"
) {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  return simulateTrustedClickOnPosition(x, y, button);
}

function simulateTrustedClickOnPosition(x: number, y: number, button = "left") {
  const requiredVersion = "1.2";
  const mouseEventCommand = "Input.dispatchMouseEvent";
  enum MouseEventType {
    MouseMoved = "mouseMoved",
    MousePressed = "mousePressed",
    MouseReleased = "mouseReleased",
  }

  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    const target = { tabId: tabs[0].id };

    chrome.debugger.attach(target, requiredVersion, function () {
      chrome.debugger.sendCommand(target, mouseEventCommand, {
        type: MouseEventType.MouseMoved,
        x,
        y,
      });
      chrome.debugger.sendCommand(target, mouseEventCommand, {
        type: MouseEventType.MousePressed,
        button,
        x,
        y,
        clickCount: 1,
      });
      chrome.debugger.sendCommand(target, mouseEventCommand, {
        type: MouseEventType.MouseReleased,
        button,
        x,
        y,
        clickCount: 1,
      });
    });
  });
}
