// Save button logic
document.getElementById('saveBtn')?.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "getSelection" },
          (response) => {
            const selectedText = response?.text;
  
            if (selectedText) {
              chrome.storage.local.get('flashcards', (result) => {
                const flashcards = result.flashcards || [];
                flashcards.push(selectedText);
                chrome.storage.local.set({ flashcards }, () => {
                  alert("Flashcard saved!");
                });
              });
            } else {
              alert("No text selected!");
            }
          }
        );
      }
    });
  });
  
  // View button logic
  document.getElementById('viewBtn')?.addEventListener('click', () => {
    chrome.storage.local.get('flashcards', (result) => {
      const flashcards = result.flashcards || [];
      const container = document.getElementById('flashcardsList');
      if (container) {
        container.innerHTML = "";
        flashcards.forEach((card: string, index: number) => {
          const div = document.createElement('div');
          div.textContent = `${index + 1}. ${card}`;
          container.appendChild(div);
        });
      }
    });
  });
  