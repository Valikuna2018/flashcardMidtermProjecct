chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SAVE_FLASHCARD") {
      chrome.storage.local.get(["flashcards"], (result) => {
        const flashcards: string[] = result.flashcards || [];
        flashcards.push(message.text);
        chrome.storage.local.set({ flashcards });
        console.log("Flashcard saved:", message.text);
      });
    }
  });
  