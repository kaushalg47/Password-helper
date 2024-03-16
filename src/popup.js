// popup.js

document.getElementById("hashButton").addEventListener("click", () => {
  console.log("Hash button clicked");

  // Send message to background script
  chrome.runtime.sendMessage({ action: "hashPasswords" });
});
