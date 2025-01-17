// Elemente ausgewählt um neuen Entry hinzuzufügen
const newEntryInput = document.querySelector('#newEntry');
const newEntryButton = document.querySelector('#newEntryBtn');
const listContainer = document.querySelector('#list');

// ADD-Knopf
newEntryButton.addEventListener('click', () => {
    const newEntry = newEntryInput.value.trim();
    // Warnung falls nichts übergeben wurde
    if (newEntry === '') {
        alert('Input an entry to add!');
    }
    // bei Button click wird das Entry ebenfalls in den Array hinzugefügt
    entries.push({ text: newEntry, checked: false });
    saveToLS();

    // neues Div wird erstellt
    const newEntryElem = document.createElement('div');
    // Füge Klasse zum Entry hinzu
    newEntryElem.classList.add('listEntry');
    // Setze den Text
    newEntryElem.innerHTML = newEntry;

    // Checkbox wird erstellt
    const newCheckbox = document.createElement('input');
    newCheckbox.setAttribute("type", "checkbox");
    // neuer Löschen-Knopf
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'X';
    deleteBtn.classList.add('deleteBtn');

    // Div wird an die Liste angehängt
    listContainer.appendChild(newEntryElem);
    // Löschen-Knopf wird and Listeneintrag gehängt
    newEntryElem.appendChild(deleteBtn);
    // Checkbox anhängen
    newEntryElem.appendChild(newCheckbox);

    // Input-Feld wird geleert
    newEntryInput.value = '';
});


// checked Entry
listContainer.addEventListener('click', (event) => {
    // todo: checked on checkbox clicked
    // && (event.target.containerType.contains('input'))
    if (event.target.classList.contains('listEntry')) {
        event.target.classList.toggle('checked');
    }
});

// Löschen
listContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteBtn')) {
        // Entry entfernen
        event.target.parentElement.remove();
    }
});


// LOCAL STORAGE

// leeres array initialisiert um alle entries im local storage zu speichern
let entries = [];
// funktion um array mit allen entries im local storage zu speichern
function saveToLS () {
    // wandelt array oder object in einen string um (JSON)
    localStorage.setItem('entries', JSON.stringify(entries));
}

function loadFromLS () {
    // Daten werden geholt
    const storedEntries = localStorage.getItem('entries')
    if (storedEntries) {
        // string wird zu einem array umgewandelt / wieder ausgelesen
        entries = JSON.parse(storedEntries);
        entries.forEach(entry => {
            // jeder Eintrag soll angezeigt werden
           addEntryToDOM(entry.text, entry.checked);
        });
    }
}

