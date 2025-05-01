// popup.ts
export {};
interface Flashcard {
    id: number;
    question: string;
    answer: string;
    difficulty: string | null;
  }
  
  const saveBtn      = document.getElementById('saveBtn')      as HTMLButtonElement;
  const viewBtn      = document.getElementById('viewBtn')      as HTMLButtonElement;
  const clearAllBtn  = document.getElementById('clearAllBtn')  as HTMLButtonElement;
  const startQuizBtn = document.getElementById('startQuizBtn') as HTMLButtonElement;
  const flashcardsList = document.getElementById('flashcardsList')! as HTMLDivElement;
  
  let flashcards: Flashcard[] = [];
  
  // ─── Load saved flashcards on popup open ───────────────────────────
  chrome.storage.local.get('flashcards', data => {
    flashcards = data.flashcards || [];
  });
  
  // ─── Save a new flashcard (question + answer) ───────────────────────
  saveBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => window.getSelection()?.toString().trim() || ''
    });
    const highlighted = (result[0].result as string).trim();
    if (!highlighted) {
      alert('Please select some text on the page first.');
      return;
    }
  
    const question = prompt('Enter a title/question for this flashcard:')?.trim();
    if (!question) return;
  
    const card: Flashcard = {
      id: Date.now(),
      question,
      answer: highlighted,
      difficulty: null
    };
    flashcards.push(card);
    await chrome.storage.local.set({ flashcards });
    alert('Flashcard saved!');
  });
  
  // ─── View flashcards list ───────────────────────────────────────────
  viewBtn.addEventListener('click', () => {
    renderList();
  });
  
  function renderList() {
    flashcardsList.innerHTML = '';
    if (flashcards.length === 0) {
      flashcardsList.textContent = 'No flashcards yet.';
      return;
    }
  
    flashcards.forEach(card => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <span>${card.question}</span>
        <button class="delete-btn">×</button>
      `;
      const delBtn = div.querySelector('.delete-btn') as HTMLButtonElement;
      delBtn.addEventListener('click', async () => {
        flashcards = flashcards.filter(c => c.id !== card.id);
        await chrome.storage.local.set({ flashcards });
        renderList();
      });
      flashcardsList.appendChild(div);
    });
  }
  
  // ─── Clear all flashcards ───────────────────────────────────────────
  clearAllBtn.addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete all flashcards?')) return;
    flashcards = [];
    await chrome.storage.local.set({ flashcards });
    renderList();
  });
  
  // ─── Open centered quiz window ───────────────────────────────────────
  startQuizBtn.addEventListener('click', () => {
    const width  = 400;
    const height = 600;
    const left   = Math.round((screen.availWidth  - width)  / 2);
    const top    = Math.round((screen.availHeight - height) / 2);
  
    chrome.windows.create({
      url: chrome.runtime.getURL('quiz.html'),
      type: 'popup',
      width,
      height,
      left,
      top
    });
  });
  