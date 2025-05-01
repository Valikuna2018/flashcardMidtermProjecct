# Flashcard Gesture Extension

A Chrome extension that lets you save highlighted text as flashcards, quiz yourself on them, and (planned) rate your recall via hand gestures.

## Features

- Save any selected text on a webpage as a flashcard with a custom title.
- View, delete, and clear all flashcards.
- Standalone quiz popup: reveal question, reveal answer, and rate using manual buttons (Easy / Hard / Impossible).
- Offscreen document setup for future gesture detection under Manifest V3 CSP.

## Installation

1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   cd extensione
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load into Chrome:
   - Navigate to `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked** and select the `dist/` folder

## Usage

1. On any webpage, **highlight** text and click **Save Flashcard** in the popup. Enter a title/question when prompted.
2. Use **View Flashcards** to see saved cards; delete individual cards or clear all.
3. Click **Start Quiz** to open the quiz popup:
   - Click **Reveal Answer** to see the saved text.
   - Click **Easy**, **Hard**, or **Impossible** to rate (manual for now).

## Developer API

These functions live in `src/core.ts`.

### `saveFlashcards(flashcards: Flashcard[]): Promise<void>`

Persists the given array of flashcards to Chrome’s local storage.

- **Parameters**
  - `flashcards`: `Flashcard[]` – Array of flashcard objects to save.

### `loadFlashcards(): Promise<Flashcard[]>`

Retrieves the stored flashcards from Chrome’s local storage.

- **Returns**
  - `Promise<Flashcard[]>` – Resolves to the array of saved flashcards.

### `recordAndNext(
    flashcards: Flashcard[],
    currentIndex: number,
    level: 'easy' | 'hard' | 'impossible'
  ): { flashcards: Flashcard[]; nextIndex: number }`

Sets the difficulty on the flashcard at `currentIndex` and returns the updated list and index for the next card.

- **Parameters**
  - `flashcards`: `Flashcard[]` – The current array of flashcards.
  - `currentIndex`: `number` – The index of the card being rated.
  - `level`: `'easy' | 'hard' | 'impossible'` – The rating to apply.

- **Returns**
  - `{ flashcards: Flashcard[]; nextIndex: number }`

## Testing

We use **Jest** with `jest-chrome` to unit test core functions.

1. Install dev dependencies:
   ```bash
   npm install --save-dev jest ts-jest @types/jest jest-chrome
   ```
2. Initialize Jest config:
   ```bash
   npx ts-jest config:init
   ```
3. Add test script to `package.json`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```
4. Write tests in `tests/core.test.ts` and run:
   ```bash
   npm test
   ```

## TODO

- [ ] Hand gesture detection integration (offscreen document)
- [ ] Offscreen environment testing under MV3
- [ ] Relay gesture messages reliably to quiz page
- [ ] View-flashcards navigation controls (Next/Previous, count)
- [ ] Styling enhancements for view page
- [ ] Unit tests for core functions
- [ ] JSDoc/comments throughout code
- [ ] Expand README with usage examples and screenshots

---
Built with ❤️ using TypeScript, Chrome Extension Manifest V3, and MediaPipe.

