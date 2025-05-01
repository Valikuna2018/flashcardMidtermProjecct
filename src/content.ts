chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getSelection") {
      const selectedText = window.getSelection()?.toString().trim();
      sendResponse({ text: selectedText });
      return true; 
    }
  });
  