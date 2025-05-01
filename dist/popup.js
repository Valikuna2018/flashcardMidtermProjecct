"use strict";
(() => {
  // src/popup.ts
  var saveBtn = document.getElementById("saveBtn");
  var viewBtn = document.getElementById("viewBtn");
  var clearAllBtn = document.getElementById("clearAllBtn");
  var startQuizBtn = document.getElementById("startQuizBtn");
  var flashcardsList = document.getElementById("flashcardsList");
  var flashcards = [];
  chrome.storage.local.get("flashcards", (data) => {
    flashcards = data.flashcards || [];
  });
  saveBtn.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection()?.toString().trim() || ""
    });
    const highlighted = results[0].result.trim();
    if (!highlighted) {
      alert("Please select some text on the page first.");
      return;
    }
    const question = prompt("Enter a title/question for this flashcard:")?.trim();
    if (!question) return;
    const card = {
      id: Date.now(),
      question,
      answer: highlighted,
      difficulty: null
    };
    flashcards.push(card);
    await chrome.storage.local.set({ flashcards });
    alert("Flashcard saved!");
  });
  viewBtn.addEventListener("click", renderList);
  function renderList() {
    flashcardsList.innerHTML = "";
    if (flashcards.length === 0) {
      flashcardsList.textContent = "No flashcards yet.";
      return;
    }
    flashcards.forEach((card) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
      <span>${card.question}</span>
      <button class="delete-btn">\xD7</button>
    `;
      const delBtn = div.querySelector(".delete-btn");
      delBtn.addEventListener("click", async () => {
        flashcards = flashcards.filter((c) => c.id !== card.id);
        await chrome.storage.local.set({ flashcards });
        renderList();
      });
      flashcardsList.appendChild(div);
    });
  }
  clearAllBtn.addEventListener("click", async () => {
    if (!confirm("Are you sure you want to delete all flashcards?")) return;
    flashcards = [];
    await chrome.storage.local.set({ flashcards });
    renderList();
  });
  startQuizBtn.addEventListener("click", () => {
    const width = 400;
    const height = 600;
    const left = Math.round((screen.availWidth - width) / 2);
    const top = Math.round((screen.availHeight - height) / 2);
    chrome.windows.create({
      url: chrome.runtime.getURL("quiz.html"),
      type: "popup",
      width,
      height,
      left,
      top
    });
  });
})();
