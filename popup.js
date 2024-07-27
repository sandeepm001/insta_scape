document.getElementById('scrape').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const instagramLink = document.getElementById('instagramLink').value;

  if (instagramLink) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: (link) => {
        chrome.runtime.sendMessage({ action: "startScraping", link });
      },
      args: [instagramLink]
    });
  } else {
    alert('Please enter a valid Instagram link');
  }
});