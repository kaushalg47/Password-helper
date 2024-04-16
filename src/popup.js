// popup.js

document.getElementById("hashButton").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;
    chrome.storage.sync.get("savedUrls", function (data) {
      const savedUrls = data.savedUrls || [];
      if (savedUrls.includes(currentUrl)) {
        console.log("Hash button clicked for URL:", currentUrl);
        // Send message to background script
        chrome.runtime.sendMessage({ action: "hashPasswords" });
      } else {
        console.log("URL not found in saved list:", currentUrl);
        // Optionally, provide feedback to the user that the action cannot be performed
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("save");
  const urlTableBody = document.querySelector("#urlTable tbody");

  saveButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url;
      chrome.storage.sync.get("savedUrls", function (data) {
        const savedUrls = data.savedUrls || [];
        // Check if the current URL already exists in the savedUrls array
        if (!savedUrls.includes(currentUrl)) {
          // If it does not exist, add it to the array and update storage
          savedUrls.push(currentUrl);
          chrome.storage.sync.set({ savedUrls: savedUrls });
          updateUrlTable(savedUrls);
        } else {
          // If it already exists, notify the user or handle as needed
          console.log("URL already saved:", currentUrl);
        }
      });
    });
  });

  // Event listener for remove buttons
  urlTableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("removeButton")) {
      const removedUrl = event.target.dataset.url;
      chrome.storage.sync.get("savedUrls", function (data) {
        const savedUrls = data.savedUrls || [];
        const updatedUrls = savedUrls.filter((url) => url !== removedUrl);
        chrome.storage.sync.set({ savedUrls: updatedUrls });
        updateUrlTable(updatedUrls);
      });
    }
  });

  // Function to update the URL table
  function updateUrlTable(urls) {
    urlTableBody.innerHTML = "";
    urls.forEach((url) => {
      const row = document.createElement("tr");
      const urlCell = document.createElement("td");
      const actionCell = document.createElement("td");
      const removeButton = document.createElement("button");

      urlCell.textContent = url;
      removeButton.textContent = "X";
      removeButton.className = "removeButton";
      removeButton.dataset.url = url;

      row.appendChild(urlCell);
      actionCell.appendChild(removeButton);
      row.appendChild(actionCell);

      urlTableBody.appendChild(row);
    });
  }

  // Initial update of the URL table
  chrome.storage.sync.get("savedUrls", function (data) {
    const savedUrls = data.savedUrls || [];
    updateUrlTable(savedUrls);
  });
});
