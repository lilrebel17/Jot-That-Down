//Static HTML Elements for the editor & Note List
let EditorTitle = document.querySelector('.editor-note-title')
let EditorDueDate = document.querySelector('.editor-due-date')
let EditorContent = document.querySelector('.editor-text-area')
let NoteListContainer = document.querySelector('.notes-list-container')
let SelectionArray = []

NoteListContainer.addEventListener('click', (a) => {
        if(a.target.parentNode.className == 'notes-list-item') {
            AddToEditor(a.target.parentNode.id)
            UpdateList(a.target.parentNode.id)
        }  
        else if(a.target.className == 'notes-list-item') {
            AddToEditor(a.target.id)
            UpdateList(a.target.id)
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
