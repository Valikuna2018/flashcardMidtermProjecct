export {};
interface Flashcard {
    id: number;
    question: string;
    answer: string;
    difficulty: string | null;
  }
  
  let flashcards: Flashcard[] = [];
  let currentIndex = 0;
  
 
  const flashcardDisplay = document.getElementById('flashcard')! as HTMLDivElement;
  const revealBtn       = document.getElementById('revealBtn')! as HTMLButtonElement;
  const ratingBtns: Record<string, HTMLButtonElement> = {
    easy:       document.getElementById('easy')! as HTMLButtonElement,
    hard:       document.getElementById('hard')! as HTMLButtonElement,
    impossible: document.getElementById('impossible')! as HTMLButtonElement,
  };
  
  // Load all flashcards,
  chrome.storage.local.get('flashcards', data => {
    flashcards = data.flashcards || [];
    if (flashcards.length === 0) {
      flashcardDisplay.textContent = 'No flashcards saved.';
      revealBtn.style.display = 'none';
      return;
    }
    showCard();
  });
  
  // Show only question + Reveal
  function showCard() {
    const card = flashcards[currentIndex];
    flashcardDisplay.textContent = card.question;
    revealBtn.style.display = 'inline-block';
    Object.values(ratingBtns).forEach(b => b.style.display = 'none');
  }
  
  // Reveal answer 
  revealBtn.addEventListener('click', () => {
    flashcardDisplay.textContent = flashcards[currentIndex].answer;
    revealBtn.style.display = 'none';
    Object.values(ratingBtns).forEach(b => b.style.display = 'inline-block');
  });
  
  // Rating click  store & next
  Object.entries(ratingBtns).forEach(([level, btn]) => {
    btn.addEventListener('click', async () => {
      flashcards[currentIndex].difficulty = level;
      await chrome.storage.local.set({ flashcards });
  
      currentIndex++;
      if (currentIndex < flashcards.length) {
        showCard();
      } else {
        flashcardDisplay.textContent = 'Quiz complete!';
        Object.values(ratingBtns).forEach(b => b.remove());
      }
    });
  });
  