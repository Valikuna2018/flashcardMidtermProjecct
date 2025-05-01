var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const saveBtn = document.getElementById('saveBtn');
const viewBtn = document.getElementById('viewBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const startQuizBtn = document.getElementById('startQuizBtn');
const flashcardsList = document.getElementById('flashcardsList');
let flashcards = [];
// ─── Load saved flashcards on popup open ───────────────────────────
chrome.storage.local.get('flashcards', data => {
    flashcards = data.flashcards || [];
});
// ─── Save a new flashcard (question + answer) ───────────────────────
saveBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Grab selected text from active tab
    const [tab] = yield chrome.tabs.query({ active: true, currentWindow: true });
    const result = yield chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => { var _a; return ((_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString().trim()) || ''; }
    });
    const highlighted = result[0].result.trim();
    if (!highlighted) {
        alert('Please select some text on the page first.');
        return;
    }
    const question = (_a = prompt('Enter a title/question for this flashcard:')) === null || _a === void 0 ? void 0 : _a.trim();
    if (!question)
        return;
    const card = {
        id: Date.now(),
        question,
        answer: highlighted,
        difficulty: null
    };
    flashcards.push(card);
    yield chrome.storage.local.set({ flashcards });
    alert('Flashcard saved!');
}));
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
        const delBtn = div.querySelector('.delete-btn');
        delBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            flashcards = flashcards.filter(c => c.id !== card.id);
            yield chrome.storage.local.set({ flashcards });
            renderList();
        }));
        flashcardsList.appendChild(div);
    });
}
// ─── Clear all flashcards ───────────────────────────────────────────
clearAllBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    if (!confirm('Are you sure you want to delete all flashcards?'))
        return;
    flashcards = [];
    yield chrome.storage.local.set({ flashcards });
    renderList();
}));
// ─── Open centered quiz window ───────────────────────────────────────
startQuizBtn.addEventListener('click', () => {
    const width = 400;
    const height = 600;
    const left = Math.round((screen.availWidth - width) / 2);
    const top = Math.round((screen.availHeight - height) / 2);
    chrome.windows.create({
        url: chrome.runtime.getURL('quiz.html'),
        type: 'popup',
        width,
        height,
        left,
        top
    });
});
export {};
