//Elements for the Note list
let NoteListContainer = document.querySelector('.notes-list-container')
let Notes = document.querySelector('.notes-list-item')

//Elements for the Editor
let editor = document.querySelector('.editor')
let EditorTitle = document.querySelector('.editor-note-title')
let EditorDueDate = document.querySelector('.editor-due-date')
let EditorContent = document.querySelector('.editor-text-area')

//Elements for the input boxes
let content = document.querySelector('.note-content')
let title = document.querySelector('.note-title')
let dueDate = document.querySelector('.note-due-date')

//Button elements
let submitbutton = document.querySelector('.submit-note-button')
let savebutton = document.querySelector('.editor-save-button')

let SelectionArray = []

let NoteID = 0


//Loads older notes when the window is loaded
window.onload =  () =>{
    for(let i=0; i < localStorage.length +1; i++) {
        let Note = JSON.parse(localStorage.getItem('Note' + i))
            //Creating local variables for older notes
            let NoteContainer = document.createElement('li')
            let NoteTitle = document.createElement('h1')
            let NoteDueDate = document.createElement('p')
            let NoteContent = document.createElement('p')


            //Since its an array again, we can just use OldNote
            //To store those old array items, and append them
            //To match the note structure.
            NoteContainer.className = 'notes-list-item' // Creates a class to select all notes
            NoteTitle.append(Note[1])
            NoteDueDate.append(Note[2])
            NoteContent.append(Note[3])
            NoteContainer.id = Note[0]

            //This appends the newly created elements to the container and then
            //Appends the container to its div "note-list-container"
            NoteContainer.append(NoteTitle, NoteDueDate,NoteContent)
            NoteListContainer.append(NoteContainer)

            //This takes our NoteID, which is a global variable.
            //Makes it equal to Note[0] which is NoteID in the
            //Storage array
            NoteID = Note[0] + 1
        
        if(Note[1] == null) {
            console.log("Note" + i +" Does not have a date")
        }
    }
}

//****** SAVE FUNCTION ******//
function SaveNote(id) {
    let note = document.getElementById(id)
    console.log(id)
    if(id == undefined) {
        let note = document.getElementById(SelectionArray[1])
        if(SelectionArray[1] == null) {
            console.log("No older note to save..")
        }
        else if(SelectionArray != null) {
            console.log("Saving Note" + SelectionArray[1] + "... ")
            let StorageArray = [
                SelectionArray[1],
                note.childNodes[0].innerHTML,
                note.childNodes[1].innerHTML,
                note.childNodes[2].innerHTML
            ]
            localStorage.setItem('Note' + SelectionArray[1], JSON.stringify(StorageArray))
        }
    }
    else {
        let StorageArray = [
            id,
            note.childNodes[0].innerHTML,
            note.childNodes[1].innerHTML,
            note.childNodes[2].innerHTML
        ]
        localStorage.setItem('Note' + id, JSON.stringify(StorageArray))
    }
}

//****** EDITOR ******//
NoteListContainer.addEventListener('click', (a) => {
        if(a.target.parentNode.className == 'notes-list-item') {
            AddToEditor(a.target.parentNode.id)
            UpdateList(a.target.parentNode.id)
            SaveNote()
        }  
        else if(a.target.className == 'notes-list-item') {
            AddToEditor(a.target.id)
            UpdateList(a.target.id)
            SaveNote()
        }
})

//Adds the clicked list item to the editor
function AddToEditor(currentid) {
    let SelectedNote = document.getElementById(currentid)

    let selectedTitle = SelectedNote.childNodes[0].innerHTML
    let selectedDueDate = SelectedNote.childNodes[1].innerHTML
    let selectedContent = SelectedNote.childNodes[2].textContent

    EditorTitle.value = selectedTitle
    EditorDueDate.value = selectedDueDate
    EditorContent.value = selectedContent

    UpdateSelectionArray(currentid)
}

function UpdateList(id) {
    if(SelectionArray[1] != null) {
        let InEditor = document.getElementById(id)
        let NotInEditor = document.getElementById(SelectionArray[1])
        InEditor.classList.add('in-editor')
        NotInEditor.classList.remove('in-editor')
    }
    else {
        let InEditor = document.getElementById(id)
        InEditor.classList.add('in-editor')
    }
}

function UpdateSelectionArray(currentid) {
    SelectionArray.unshift(currentid)
    if(SelectionArray.length > 2) {
        SelectionArray.pop()
    }
}


//Listens for changes in the editor and updates the note list while its hidden
EditorTitle.addEventListener('keyup', () => {
    document.getElementById(SelectionArray[0]).childNodes[0].innerHTML = EditorTitle.value
})
EditorDueDate.addEventListener('change', () => {
    document.getElementById(SelectionArray[0]).childNodes[1].innerHTML = EditorDueDate.value

})
EditorContent.addEventListener('keyup', () => {
    document.getElementById(SelectionArray[0]).childNodes[2].innerHTML = EditorContent.value
})


//****** SUBMIT BUTTON ******//
submitbutton.addEventListener('click', () => {
    //Creating local variables for new notes
    let NewNoteContainer = document.createElement('li')
    let NewNoteTitle = document.createElement('h1')
    let NewNoteDueDate = document.createElement('p')
    let NewNoteContent = document.createElement('p')
    let Form = document.querySelector('.submit-note')

    //Adds values of the input boxes to the newley created Elements
    NewNoteContainer.id = NoteID
    NewNoteContainer.className = 'notes-list-item'
    NewNoteTitle.innerHTML = title.value
    NewNoteDueDate.innerHTML = dueDate.value
    NewNoteContent.innerHTML = content.value

    //This appends the newly created elements to the container and then
    //Appends the container to its div "note-list-container"
    NewNoteContainer.append(NewNoteTitle, NewNoteDueDate,NewNoteContent)
    NoteListContainer.append(NewNoteContainer)
    SaveNote(NoteID)

    NoteID += 1
    //Resets the text boxes on button press
    Form.reset()
})

//****** SAVE BUTTON ******/
savebutton.addEventListener('click', () => {
    let id = SelectionArray[0]
    SaveNote(id)
})