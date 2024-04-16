document.addEventListener("DOMContentLoaded", function() {
  const saveButton = document.getElementById("save");
  const urlTextarea = document.getElementById("urls");
  const urlTableBody = document.querySelector("#urlTable tbody");

  saveButton.addEventListener("click", function() {
    const urls = urlTextarea.value.split(",").map(url => url.trim());
    chrome.storage.sync.set({ "savedUrls": urls });
    updateUrlTable(urls);
  });

  function updateUrlTable(urls) {
    urlTableBody.innerHTML = "";
    urls.forEach(url => {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.textContent = url;
      row.appendChild(cell);
      urlTableBody.appendChild(row);
    });
  }

  chrome.storage.sync.get("savedUrls", (data) => {
    const savedUrls = data.savedUrls || [];
    updateUrlTable(savedUrls);
  });
});
