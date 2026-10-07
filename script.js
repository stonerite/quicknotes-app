const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');

const MAX_LENGTH = 200;
const STORAGE_KEY = 'quicknotes-notes';

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function getCountMessage(total) {
  if (total === 0) return 'You have no notes yet.';
  if (total === 1) return 'You have 1 note.';
  return 'You have ' + total + ' notes.';
}

function validate(text) {
  if (text.length === 0) return 'Please type a note first.';
  if (text.length > MAX_LENGTH) return 'Notes must be 200 characters or fewer.';
  return '';
}

function getVisibleNotes() {
  const words = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);
  return notes.filter((note) => {
    const text = note.text.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

function render() {
  notesList.textContent = '';
  noteCount.textContent = getCountMessage(notes.length);

  const visible = getVisibleNotes();

  if (visible.length === 0 && searchInput.value.trim() !== '') {
    const empty = document.createElement('li');
    empty.className = 'empty-message';
    empty.textContent = 'No notes match your search.';
    notesList.append(empty);
    return;
  }

  visible.forEach((note) => {
    const li = document.createElement('li');
    li.className = 'note-card category-' + note.category.toLowerCase();

    const text = document.createElement('p');
    text.className = 'note-text';
    text.textContent = note.text;

    const meta = document.createElement('div');
    meta.className = 'note-meta';

    const label = document.createElement('span');
    label.className = 'category-label';
    label.textContent = note.category;

    const date = document.createElement('span');
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(note.id));

    meta.append(label, date, deleteBtn);
    li.append(text, meta);
    notesList.append(li);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const error = validate(text);

  if (error) {
    errorMessage.textContent = error;
    return;
  }

  errorMessage.textContent = '';
  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
  });
  saveNotes();
  noteInput.value = '';
  render();
});

searchInput.addEventListener('input', render);

render();
