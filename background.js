chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.active) {
    chrome.storage.sync.get("savedUrls", (data) => {
      const savedUrls = data.savedUrls || [];
      const currentUrl = new URL(changeInfo.url).href;
      const iconPath = savedUrls.includes(currentUrl) ? "logo.png" : "kolo.png";
      chrome.action.setIcon({ path: iconPath });
    });
  }
});
