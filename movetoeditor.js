let EditorNoteTitle = document.querySelector('.editor-note-title')
let NoteListContainer = document.querySelector('.notes-list-container')
let SelectedArray = []

NoteListContainer.addEventListener('click', (a) => {
    CheckForPreviousSelection()
        if(a.target.parentNode.className == 'notes-list-item') {
            SelectedArray.unshift(a.target.parentNode.id)
        }  
        else if(a.target.className == 'notes-list-item') {
            SelectedArray.unshift(a.target.id)
        }
    AddToEditor()
    console.log("Note List Click")
})

function CheckForPreviousSelection() {
    if(SelectedArray.length == 2) {
        SelectedArray.pop()
    }
    console.log(SelectedArray)
}

function AddToEditor(currentid) {
    let EditorTitle = document.querySelector('.editor-note-title')
    let EditorDueDate = document.querySelector('.editor-due-date')
    let EditorContent = document.querySelector('.editor-text-area')

    currentid = SelectedArray[0]
    let Selection = document.getElementById(currentid)

    let selectedTitle = Selection.childNodes[0]
    let selectedDueDate = Selection.childNodes[1]
    let selectedContent = Selection.childNodes[2].textContent

    if(EditorTitle.childNodes.length > 1) {
        let StorageArray = [SelectedArray[1],Selection.childNodes[0],Selection.childNodes[1],Selection.childNodes[2].textContent]
        
    }
    else {
        EditorDueDate.append(selectedDueDate)
        EditorTitle.append(selectedTitle)
        EditorContent.value = selectedContent
        Selection.style.display = 'none'
    }