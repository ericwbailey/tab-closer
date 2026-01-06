// Domains to watch
const targets = [
  "https://github.zoom.us/j/",
  "https://www.figma.com/design/",
  "https://www.figma.com/board/"
];

// Tracks pending timeouts per tab to avoid duplicate timers
const timers = new Map();

function scheduleClose(tabId, url) {
  // Clear any existing timer for this tab
  clearTimeout(timers.get(tabId));
  timers.delete(tabId);

  // Set a 2-second timer to close the tab
  const timerId = setTimeout(() => {
    chrome.tabs.remove(tabId, () => {
      // Ignore errors (e.g., tab already closed)
      timers.delete(tabId);
    });
  }, 2500);

  timers.set(tabId, timerId);
}

function shouldClose(url) {
  return targets.some((prefix) => url.startsWith(prefix));
}

// Listen for newly created tabs
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.id !== undefined && tab.url && shouldClose(tab.url)) {
    scheduleClose(tab.id, tab.url);
  }
});

// Listen for URL changes and finished loads
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Trigger only when we have a final URL (after redirect) and it's fully loaded
  if (changeInfo.status === "complete" && tab.url && shouldClose(tab.url)) {
    scheduleClose(tabId, tab.url);
  }
});

// Cleanup when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  clearTimeout(timers.get(tabId));
  timers.delete(tabId);
});
