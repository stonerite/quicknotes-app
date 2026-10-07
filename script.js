const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');

let notes = [];

function render() {
  notesList.textContent = '';

  notes.forEach((note) => {
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

    meta.append(label, date, deleteBtn);
    li.append(text, meta);
    notesList.append(li);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value.trim(),
    category: categorySelect.value,
    createdAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
  };

  notes.push(note);
  noteInput.value = '';
  render();
});

render();
