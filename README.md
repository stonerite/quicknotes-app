# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, put each one in a category (Personal, Work or Study), search through them and delete the ones you no longer need. Everything is saved in your browser's localStorage, so your notes are still there after you refresh the page.

## Features

- Add notes with a category (Personal, Work, Study) and an automatic date and time
- Colour-coded note cards, one left-border colour per category
- Validation: empty notes and notes over 200 characters show an error message
- Delete any single note
- Live, case-insensitive search with a "No notes match your search." message
- Note count that reads correctly for zero, one and many notes
- Notes persist across page refreshes using localStorage
- Responsive layout: the form stacks vertically on screens 600px wide or narrower
- Bonus: "Clear all" button with a confirmation prompt

## How to run locally

1. Clone the repository: `git clone <your-repository-url>`
2. Open the `quicknotes-app` folder.
3. Open `index.html` in any modern web browser (double-click it, or use a tool such as the VS Code Live Server extension).

No build step or dependencies are needed.

## What I learned

- How to build a page from semantic HTML (`header`, `main`, `section`, `footer`) and link every `label` to its `input` with `for` and `id`.
- How to keep data in an array of objects and rebuild the page from it with a `render()` function, using `createElement` and `textContent` so user text is never inserted as HTML.
- How to save and load data with `localStorage`, using `JSON.stringify` and `JSON.parse`.
- How Flexbox and a `@media (max-width: 600px)` rule make a layout work on both desktop and phone screens.
- How to commit after each small task so the Git history tells the story of the project.
