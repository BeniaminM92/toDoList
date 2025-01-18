// Elemente ausgewählt um neuen Entry hinzuzufügen
const newEntryInput = document.querySelector('#newEntry');
const newEntryButton = document.querySelector('#newEntryBtn');
const listContainer = document.querySelector('#list');
const clearAllBtn = document.querySelector('#clearAllBtn');

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

    // in DOM-Liste einfügen
    addEntryToDOM(newEntry, false);

    // // neues Div wird erstellt
    // const newEntryElem = document.createElement('div');
    // // Füge Klasse zum Entry hinzu
    // newEntryElem.classList.add('list-entry');
    // // Setze den Text
    // newEntryElem.innerHTML = newEntry;

    // // Checkbox wird erstellt
    // const newCheckbox = document.createElement('input');
    // newCheckbox.setAttribute("type", "checkbox");
    // // neuer Löschen-Knopf
    // const deleteBtn = document.createElement('button');
    // deleteBtn.innerHTML = 'X';
    // deleteBtn.classList.add('deleteBtn');
    //
    // // Div wird an die Liste angehängt
    // listContainer.appendChild(newEntryElem);
    // // Löschen-Knopf wird and Listeneintrag gehängt
    // newEntryElem.appendChild(deleteBtn);
    // // Checkbox anhängen
    // newEntryElem.appendChild(newCheckbox);

    // Input-Feld wird geleert
    newEntryInput.value = '';
});

// EventListener für Input-Feld, Enter keydown
newEntryInput.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') {
       const newEntry = newEntryInput.value.trim();
        if (newEntry === '') {
            alert('Input an entry to add!');
        }
       entries.push({ text: newEntry, checked: false });
       saveToLS();
       addEntryToDOM(newEntry, false);
       newEntryInput.value = '';
   }
});

// EventListener für die checkbox
listContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('entry-checkbox')) {
        const entryElem = event.target.parentElement;
        const entryText = entryElem.querySelector('span').innerHTML.trim();

        // Entry wird im array gesucht
        const entry = entries.find(t => t.text === entryText);
        if (entry) {
            entry.checked = event.target.checked; // Aktualisierung des entrys
            saveToLS();
        }
        // füge klasse 'checked' hinzu oder entferne sie
        if (event.target.checked) {
            entryElem.classList.add('checked');
        }
        else {
            entryElem.classList.remove('checked');
        }
    }
});

// EventListener für Löschen
listContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const entryElem = event.target.parentElement;
        const entryText = entryElem.innerHTML.replace('X', '').trim();

        // entferne Entry aus dem array
        entries = entries.filter(entry => entry.text !== entryText);
        // rufe speicher funktion für local storage auf
        saveToLS();

        // Entry aus DOM-Liste entfernen
        entryElem.remove();
    }
});

// funktion um HTML-Elemente(Objekte) zu erzeugen und anzuhängen
function addEntryToDOM (text, checked) {
    // neues div-element erstellen
    const newEntryElem = document.createElement('div');
    newEntryElem.classList.add('list-entry');

    // checkbox-element erstellen
    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.classList.add('entry-checkbox');
    newCheckbox.checked = checked; // setze den status der checkbox auf checked

    //
    if (checked) {
        newEntryElem.classList.add('checked');
    }

    // Textknoten
    const entryText = document.createElement('span');
    entryText.innerHTML = text;

    // Löschen-Knopf erstellen
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'X';
    deleteBtn.classList.add('delete-btn');

    // neu erzeugte elemente anbinden and DOM-Baum
    newEntryElem.appendChild(newCheckbox);
    newEntryElem.appendChild(entryText);
    newEntryElem.appendChild(deleteBtn);

    listContainer.appendChild(newEntryElem);
}

// EventListener für Knopf der LocalStorage und alle Entries leert
clearAllBtn.addEventListener('click', () => {
   // Nutzer nach Bestätigung fragen
   const confirmClear = confirm('Are you sure you want to delete all entries?');
   if (!confirmClear) return;
    // local storage wird geleert
   localStorage.clear();
    // array wird geleert
   entries = [];
    // DOM entrys werden entfernt
    listContainer.innerHTML = '';

    alert('All entries have been cleared!');
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

// Lade Entries aus dem Local Storage
loadFromLS();