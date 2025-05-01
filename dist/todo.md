# 📘 TODO – Flashcard Extension with Gesture Recognition

##  Setup & Initialization
- [x] Set up VSCode TypeScript project
- [x] Add manifest.json (Manifest V3)
- [x] Add Chrome extension permissions (storage, activeTab, scripting)
- [x] Set up popup UI (popup.html + popup.ts)
- [x] Set up content script to get selected text
- [x] Connect popup & content script via `chrome.runtime.sendMessage`
- [x] Store flashcard in chrome.storage.local

##  Flashcard Viewing & UI

###  UI Setup
- [x] Add "View Flashcards" button to popup.html
- [x] Create view-flashcards.html and link it from the popup
- [ ] Style view-flashcards.html with basic layout (title, card area, buttons)

###  Load Flashcards
- [ ] Fetch flashcards from `chrome.storage.local`
- [ ] Display the first flashcard on load
- [ ] Show message if no flashcards exist

###  Navigation Controls
- [ ] Add "Next" and "Previous" buttons
- [ ] Implement wrap-around navigation (loops at start/end)
- [ ] Display flashcard count (e.g., "Card 1 of 5")

###  Flashcard Management
- [ ] Add a "Delete All Flashcards" button
- [ ] Confirm user before deletion
- [ ] Refresh UI after deletion

###  Data Model (Optional)
- [ ] Create a simple Flashcard class with fields: id, text, dateAdded
- [ ] Use class methods to manage display-ready format


##  Gesture Recognition (TF.js)
- [ ] Add webcam access to popup
- [ ] Integrate TensorFlow.js Handpose/MediaPipe
- [ ] Detect thumbs up/down/flat hand
- [ ] Map gesture to flashcard response (Easy/Hard/Wrong)
- [ ] Add debounce so one gesture doesn't count multiple times

##  Engineering Design
- [ ] Write specs for core functions (e.g., saveFlashcard, detectGesture)
- [ ] Create Flashcard ADT with checkRep()
- [ ] Use clear variable names and comments (ETU)
- [ ] Use Git branching + commits
- [ ] Add README.md with how to use the extension
- [ ] Update this TODO.md as you complete tasks 

##  (Optional Features)
- [ ] Add PostgreSQL backend to sync cards
- [ ] Deploy on AWS (optional)
- [ ] Support flashcard exporting (e.g., JSON download)
- [ ] Add review reminders (browser notifications)

##  Progress Milestones
- [x] Can save highlighted text
- [ ] Can view & navigate flashcards
- [ ] Can recognize gestures from webcam
- [ ] Can rate flashcards with gestures
