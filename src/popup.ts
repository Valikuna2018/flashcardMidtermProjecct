document.getElementById("saveBtn")?.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id!,
        { type: "GET_HIGHLIGHTED_TEXT" },
        (response) => {
          if (response?.text) {
            console.log("Flashcard saved:", response.text);
            // You can store this in localStorage or chrome.storage
          } else {
            console.log("No text selected");
          }
        }
      );
    });
  });
  