const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');
const searchNotes = document.getElementById('search-notes');

let notes = [];

const savedNotes = localStorage.getItem('notes');

if (savedNotes) {
    notes = JSON.parse(savedNotes);
}

displayNotes();

function displayNotes(notesToDisplay = notes) {
    notesContainer.innerHTML = '';

    notesToDisplay.forEach(function (note) {
        const noteElement = document.createElement('div');

        noteElement.dataset.id = note.id;

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        const editBtn = noteElement.querySelector('.edit-btn');
        const deleteBtn = noteElement.querySelector('.delete-btn');


        editBtn.addEventListener('click', function () {
            noteElement.innerHTML = `
                <input class="edit-title" value="${note.title}">
                <textarea class="edit-content">${note.content}</textarea>
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            `;

            const editTitle = noteElement.querySelector('.edit-title');
            const editContent = noteElement.querySelector('.edit-content');
            const saveBtn = noteElement.querySelector('.save-btn');
            const cancelBtn = noteElement.querySelector('.cancel-btn');

            saveBtn.addEventListener('click', function () {
                const newTitle = editTitle.value;
                const newContent = editContent.value;

                if (newTitle.trim() === '' || newContent.trim() === '') {
                    alert('Please enter a title and note.');
                    return;
                }

                note.title = newTitle;
                note.content = newContent;

                localStorage.setItem('notes', JSON.stringify(notes));

                displayNotes();
            });

            cancelBtn.addEventListener('click', function () {
                displayNotes();
            });
        });



        deleteBtn.addEventListener('click', function () {
            const noteId = Number(noteElement.dataset.id);

            notes = notes.filter(function (note) {
                return note.id !== noteId;
            });

            localStorage.setItem('notes', JSON.stringify(notes));

            displayNotes();
        });

        notesContainer.appendChild(noteElement);
    });
}

addNoteBtn.addEventListener('click', function () {
    const title = noteTitle.value;
    const content = noteContent.value;

    if (title.trim() === '' || content.trim() === '') {
        alert('Please enter a title and note.');
        return;
    }

    notes.push({
        id: Date.now(),
        title: title,
        content: content
    });

    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();

    noteTitle.value = '';
    noteContent.value = '';

});

searchNotes.addEventListener('input', function () {
    const searchTerm = searchNotes.value.toLowerCase();

    const filteredNotes = notes.filter(function (note) {
        return (note.title.toLowerCase().startsWith(searchTerm));
    });

    displayNotes(filteredNotes);
});