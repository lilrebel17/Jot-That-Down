//Variables for the Containers & HTML elements we are manipulating
let submitbutton = document.querySelector('.submit-note-button')
let editor = document.querySelector('.editor')
let NoteListContainer = document.querySelector('.notes-list-container')

//NoteID helps being able to get and pull specific notes from local storage
let NoteID = 0

let CurrentNote = 0
//Loads older notes when the window is loaded
window.onload =  () =>{
    for(let i=0; i < localStorage.length; i++) {
        //Creating local variables for older notes
        let NoteContainer = document.createElement('li')
        let NoteTitle = document.createElement('h1')
        let NoteDueDate = document.createElement('p')
        let NoteContent = document.createElement('p')

        let Note = JSON.parse(localStorage.getItem('Note' + i))

        //Since its an array again, we can just use OldNote
        //To store those old array items, and append them
        //To match the note structure.
        NoteContainer.id = Note[0]
        NoteContainer.className = 'notes-list-item' // Creates a class to select all notes
        NoteTitle.append(Note[1])
        NoteDueDate.append(Note[2])
        NoteContent.append(Note[3])

        //This appends the newly created elements to the container and then
        //Appends the container to its div "note-list-container"
        NoteContainer.append(NoteTitle, NoteDueDate,NoteContent)
        NoteListContainer.append(NoteContainer)

        //This takes our NoteID, which is a global variable.
        //Makes it equal to OldNote[0] which is OldNotes NoteID
        //Then Adds 1, to go 1 above the previous NoteID
        NoteID = Note[0] + 1
    }
}
// //Creates Note and stores the data in LocalStorage when submit button is pressed
// submitbutton.addEventListener('click', () => {
//         //Creating local variables for new notes
//         let NewNoteContainer = document.createElement('li')
//         let NewNoteTitle = document.createElement('h1')
//         let NewNoteDueDate = document.createElement('p')
//         let NewNoteContent = document.createElement('p')
//         let Form = document.querySelector('.submit-note')

//         //Adds values of the input boxes to the newley created Elements
//         NewNoteContainer.id = NoteID
//         NewNoteContainer.className = 'notes-list-item'
//         NewNoteTitle.innerHTML = title.value
//         NewNoteDueDate.innerHTML = dueDate.value
//         NewNoteContent.innerHTML = content.value

//         //This appends the newly created elements to the container and then
//         //Appends the container to its div "note-list-container"
//         NewNoteContainer.append(NewNoteTitle, NewNoteDueDate,NewNoteContent)
//         NoteListContainer.append(NewNoteContainer)

//         //Creates an array, makes it a JSON string. Then stores it in localStorage
//         let StorageArray = [NoteID,title.value,dueDate.value,content.value]
//         localStorage.setItem('Note' + NoteID, JSON.stringify(StorageArray))

//         NoteID += 1

//         //Resets the text boxes on button press
//         Form.reset()
// })

// //Variables for the input boxes
// let content = document.querySelector('.note-content')
// let title = document.querySelector('.note-title')
// let dueDate = document.querySelector('.note-due-date')