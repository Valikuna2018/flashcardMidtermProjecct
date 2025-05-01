var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let flashcards = [];
let currentIndex = 0;
const flashcardDisplay = document.getElementById('flashcard');
const revealBtn = document.getElementById('revealBtn');
const ratingBtns = {
    easy: document.getElementById('easy'),
    hard: document.getElementById('hard'),
    impossible: document.getElementById('impossible'),
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
    btn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        flashcards[currentIndex].difficulty = level;
        yield chrome.storage.local.set({ flashcards });
        currentIndex++;
        if (currentIndex < flashcards.length) {
            showCard();
        }
        else {
            flashcardDisplay.textContent = 'Quiz complete!';
            Object.values(ratingBtns).forEach(b => b.remove());
        }
    }));
});
export {};
