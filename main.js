//Elements for the Note list
let NoteListContainer = document.querySelector('.notes-ul-cntnr')
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
let savebutton = document.querySelector('.edt-save-btn')
let deletenotebutton = document.querySelector('.edt-del-btn')
let EditorCreateButton = document.querySelector('.create-btn')

//Elements for Banner Alerts
let deleteAlert = document.querySelector('.del-alrt')

//Elemets for Banner Alert buttons
let deleteYesButton = document.querySelector('.del-yes-btn')
let deleteNoButton = document.querySelector('.del-no-btn')

//Global Variable to keep track of your selection
//SelectionArray[1] is the previously selected note
//SelectionArray[0] is the currently selected not
let SelectionArray = []


//All notes are stored as an array, then parsed into localstorage under the same local storage item "Notes"
//This onload function just checks for local storage items, and writes them to the left side of the screen if found
window.onload =  () => {
    //StoredNotes is used a local variable name a lot to help readability, if you see it in any function
    //Its always parsing my local storage function, to be writen to or read
    let StoredNotes = JSON.parse(localStorage.getItem('Notes'))
    //The loop is to be able to iterate through the StoredNotes array
    //This way we dont miss one.
    for(i=0;i < StoredNotes.length; i++) {
    //Creating local variables for older notes
    let NoteContainer = document.createElement('li')
    let NoteTitle = document.createElement('h1')
    let NoteDueDate = document.createElement('p')
    let NoteContent = document.createElement('p')

    //Updating the notes container with the correct class name, ID and & note contents
    NoteContainer.className = 'notes-li'
    NoteContainer.id = i
    //Notes are always accessed this way, with the local variable StoredNotes
    //[i] just refers whichever step of the loop its on
    NoteTitle.append(StoredNotes[i][0])//[0] is always note name
    NoteDueDate.append(StoredNotes[i][1])//[1] is always note date
    NoteContent.append(StoredNotes[i][2])//[2] is always note content

    //This appends the newly created elements to the container and then
    //Appends the container to its div "note-list-container"
    NoteContainer.append(NoteTitle, NoteDueDate,NoteContent)
    NoteContent.style.display = 'none'
    NoteListContainer.append(NoteContainer)
        if(StoredNotes[i][1] == 'undefined' || StoredNotes[i][1] == 'null') {
            let Blank = NoteDueDate.innerHTML = ' '
            StoredNotes[i][1] = ' '
            localStorage.setItem('Notes', JSON.stringify(StoredNotes))
        }
    }
}

//****** SAVE FUNCTION ******//
//No matter where the function is called from always pass NoteArray as a param
//NoteArray is always an array with the following syntax:
//[Title,DueDate,Content]
function SaveNote(NoteArray) {
    //Check to make sure our localstorage item exists, creates it if not.
    if(localStorage.getItem('Notes') == undefined) {
        //The item we use for everything is 'Notes'
        //Its just an array, with every note as its own subarray
        let NotesStorageArray = []
        console.log("Nothing in local storage, creating new array")
        console.log(' ')
        NotesStorageArray.push(NoteArray)
        localStorage.setItem('Notes',JSON.stringify(NotesStorageArray))
    }
    //Pushes a new note to local storage if nothing is selected
    else if(SelectionArray[0] == undefined) {
        let Storage = JSON.parse(localStorage.getItem('Notes'))
        console.log("Creating a new note")
        console.log(" ")
        Storage.push(NoteArray)
        localStorage.setItem('Notes',JSON.stringify(Storage))
    }
    //Saves previously selected note, as long as there is one.
    //Checks for a previously selected note
    //And makes sure the previous selection & current selection arent the same
    else if(document.getElementById(SelectionArray[1]) != null && SelectionArray[0] != SelectionArray[1]) {
        let Storage = JSON.parse(localStorage.getItem('Notes'))
        let PreviousSelection = document.getElementById(SelectionArray[1])
        console.log("Saving Previous Note")
        console.log(" ")
        Storage[SelectionArray[1]] = [
            PreviousSelection.childNodes[0].innerHTML,
            PreviousSelection.childNodes[1].innerHTML,
            PreviousSelection.childNodes[2].innerHTML
        ]
        localStorage.setItem('Notes',JSON.stringify(Storage))
    }
    //Saves currently selected note, as long as there is one
    //Checks for a current selection, and makes sure we passed a param
    else if(SelectionArray[0] != undefined && NoteArray != undefined) {
        let Storage = JSON.parse(localStorage.getItem('Notes'))
        let CurrentSelection = document.getElementById(SelectionArray[0])
        console.log("Current Note Saved")
        Storage[SelectionArray[0]] = [
            CurrentSelection.childNodes[0].innerHTML,
            CurrentSelection.childNodes[1].innerHTML,
            CurrentSelection.childNodes[2].innerHTML,
        ]
        localStorage.setItem('Notes',JSON.stringify(Storage))
    }
    //This shows & Hides the "Note Saved" banner up top
    let SaveBanner = document.querySelector('.save-alrt')
    SaveBanner.classList.remove('hidden')
    setTimeout(() => {
        SaveBanner.classList.add('hidden')
    },2000)
}

//***** DELETE FUNCTION  *****/
//Really simple, if we have a note selected(SelectionArray[0] != undefined)
//Then we parse our storage array
//We take our current selection, which is an ID based on its position in
//Our local storage array. We then splice out that ID
//And set the item again, stringify'ing the array so it moves to a JSON item
function DeleteNote() {
    if(SelectionArray[0] != undefined){
        let Storage = JSON.parse(localStorage.getItem('Notes'))
        Storage.splice(SelectionArray[0],1)
        console.log("Note " + SelectionArray[0] + " has been deleted")
        console.log(' ')
        localStorage.setItem('Notes',JSON.stringify(Storage))
        }
    }


//****** EDITOR ******//
NoteListContainer.addEventListener('click', (a) => {
    //If you click on NoteListContainer or its parent,
    //It is added to the editor & the note list is updated
    //Also updates SelectionArray
        if(a.target.parentNode.className == 'notes-li') {
            AddToEditor(a.target.parentNode.id)
            UpdateNoteList(a.target.parentNode.id)
            console.log("Parent Node ID: " + a.target.parentNode.id)
            console.log(" ")
            if(SelectionArray[1] != undefined) {
                SaveNote()
            }  
        } 
        else if(a.target.className == 'notes-li'){
            AddToEditor(a.target.id)
            UpdateNoteList(a.target.id)
            console.log("Node ID: " + a.target.id)
            console.log(" ")
            if(SelectionArray[1] != undefined) {
                SaveNote()
            }  
        }
})

function AddToEditor(currentid) {
    //Takes selected note, gets all its values then updates it to the editor
    //Also updates the selection array to help with keeping what selection is current
    let SelectedNote = document.getElementById(currentid)

    let selectedTitle = SelectedNote.childNodes[0].innerHTML
    let selectedDueDate = SelectedNote.childNodes[1].innerHTML
    let selectedContent = SelectedNote.childNodes[2].textContent

    EditorTitle.value = selectedTitle
    EditorDueDate.value = selectedDueDate
    EditorContent.value = selectedContent

    UpdateSelectionArray(currentid)
}

function UpdateNoteList(id) {
    //Only happens when you click on a note in the corner(See lines 127-148)
    //InEditor gets its value from whatever you clicked on in the notes list(See line 132-141)
    let InEditor = document.getElementById(id)
    let NotInEditor = document.getElementById(SelectionArray[1])
    InEditor.classList.add('hidden')
    if(NotInEditor != undefined) {
        NotInEditor.classList.remove('hidden')
    }
}

function UpdateSelectionArray(currentid) {
    //We unshift the currentid(which is whatever just got selected) so it stays
    //At position 0
    //If the Array is over 2 elements in length. We pop the array, so its never
    //more than two elemets, a currentid and previousid
    SelectionArray.unshift(currentid)
    if(SelectionArray.length > 2) {
        SelectionArray.pop()
    }
}


//Listens for changes in the editor and updates the note list while its hidden
EditorTitle.addEventListener('keyup', () => {
    if(SelectionArray[0] != null) {
        document.getElementById(SelectionArray[0]).childNodes[0].innerHTML = EditorTitle.value
    }
})
EditorDueDate.addEventListener('change', () => {
    if(SelectionArray[0] != null) {
        document.getElementById(SelectionArray[0]).childNodes[1].innerHTML = EditorDueDate.value
    }
})
EditorContent.addEventListener('keyup', () => {
    if(SelectionArray[0] != null) {
        document.getElementById(SelectionArray[0]).childNodes[2].innerHTML = EditorContent.value
    }
})

//****** SAVE BUTTON ******/
savebutton.addEventListener('click', () => {
    let editor = document.querySelector('.edt-form')
    if(SelectionArray[0] == undefined) {
       //No selected note, creates a new note, sends data to Savenote()
            let NoteContainer = document.createElement('li')
            let NoteTitle = document.createElement('h1')
            let NoteDueDate = document.createElement('p')
            let NoteContent = document.createElement('p')

            NoteTitle.innerHTML = EditorTitle.value
            NoteDueDate.innerHTML = EditorDueDate.value
            NoteContent.innerHTML = EditorContent.value

            let NewNoteStorageArray = [
                NoteTitle.innerHTML,
                NoteDueDate.innerHTML,
                NoteContent.innerHTML,
            ]

            NoteContainer.className = 'notes-li'
            NoteContent.className = 'hidden'
            NoteContainer.id = NoteListContainer.childElementCount
            NoteContainer.append(NoteTitle,NoteDueDate,NoteContent)
            NoteListContainer.append(NoteContainer)

            SaveNote(NewNoteStorageArray)
            editor.reset()
    }
    else { 
        //Note selected, sends the data to be saved in SaveNote()
        let CurrentID = SelectionArray[0]
        let CurrentSelection = document.getElementById(CurrentID)
        let NoteStorageArray = [
            CurrentSelection.childNodes[0].innerHTML,
            CurrentSelection.childNodes[1].innerHTML,
            CurrentSelection.childNodes[2].innerHTML
        ]
        editor.reset()
        CurrentSelection.classList.remove('hidden')
        SaveNote(NoteStorageArray)
        SelectionArray[0] = undefined
    }
})

deleteYesButton.addEventListener('click', () => {
    //1.) Take CurrentNote, which is stored as SelectionArray[0](a global variable)
    //and just removes its with 
    //2.) We then have to shift all element IDs to makeup for the removed ID so
    //we dont have any gaps. We do this with ShiftElementIds()
    //3.) The editor needs to be reset so its blank
    //4.) Then delete the note from storage with DeleteNote()
    //5.) Finally set the current selection to undefined so we can go from a delete
    //state to creating a new note
    let CurrentNote = document.getElementById(SelectionArray[0])
    let editor = document.querySelector('.edt-form')

    deleteAlert.classList.add('hidden')//Hides the alert
    ShiftElementIDs(SelectionArray[0])//Shifts all noteIDS to make up for deleted ID
    CurrentNote.remove()//Removes the notes
    editor.reset()//Resets the editors so its no longer in editor
    DeleteNote()//Deletes note from storage array
    SelectionArray[0] = undefined//Set current selection to undefined
})

deleteNoButton.addEventListener('click',() => {
    deleteAlert.classList.add('hidden')
})

//Only called when you hit yes after hitting the delete button
function ShiftElementIDs(oldid) {
    //oldid is SelectionArray[0] or the selection that just got deleted
    oldid = parseInt(oldid) //Its a string when we pass it, so we parseInt so its an int
    //We check to make sure oldid, doesnt equal the same number of child elements
    //childElementCount is the same as children.length
    //Check for this because we dont have to shift all IDs if its the last one
    if(oldid != NoteListContainer.childElementCount){
        for(let i=oldid;i < NoteListContainer.childElementCount; i++) {
            let div = document.getElementById(i)
            console.log(div.id)
            div.removeAttribute('id')
            div.id = i-1
            
        }
    }
}

//Reveals the "Yes" and "No" banner for deletion
deletenotebutton.addEventListener('click', () => {
    if(SelectionArray[0] != null) {
        deleteAlert.classList.remove('hidden')
    }
})

//If you have something selected, clears the editor & removes whatever you had 
//selected from the selection array
EditorCreateButton.addEventListener('click', () => {
    if(SelectionArray[0] != undefined) {
        SelectionArray.splice(0,SelectionArray.length)
        let editor = document.querySelector('.edt-form')
        editor.reset() 
    }
})