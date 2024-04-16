// Function to check if a URL is a login page
function isLoginPage(url) {
  // Add conditions to check if the URL is a login page
  // For example, check if the page contains login form elements
  return document.querySelector('input[type="password"]');
}

// Function to check if a URL is saved
function isUrlSaved(url, callback) {
  chrome.storage.sync.get('savedUrls', function(data) {
      const savedUrls = data.savedUrls || [];
      callback(savedUrls.includes(url));
  });
}

// Check if the current page is a login page and if the URL is not saved
function checkLoginPage() {
  if (isLoginPage(window.location.href)) {
      isUrlSaved(window.location.href, function(isSaved) {
          if (!isSaved) {
              chrome.runtime.sendMessage({ action: "showPopup" });
          }
      });
  }
}

// Check every 1 second
setInterval(checkLoginPage, 1000);
