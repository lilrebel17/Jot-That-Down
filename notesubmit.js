let NoteID = 0

let submitbutton = document.querySelector('.submit-note-button')
let NoteListContainer = document.querySelector('.notes-list-container')

let content = document.querySelector('.note-content')
let title = document.querySelector('.note-title')
let dueDate = document.querySelector('.note-due-date')

window.onload = () =>{
    for(let i=0; i < localStorage.length; i++) {
        let NewNoteContainer = document.createElement('li')
        let NewNoteTitle = document.createElement('h1')
        let NewNoteDueDate = document.createElement('p')
        let NewNoteContent = document.createElement('p')

        NewNoteContainer.id = localStorage.getItem('JTD NoteID' + i)
        NewNoteTitle.innerHTML = localStorage.getItem('JTD NoteTitle' + i)
        NewNoteDueDate.innerHTML = localStorage.getItem('JTD NoteDueDate' + i)
        NewNoteContent.innerHTML = localStorage.getItem('JTD NoteContent' + i)

        NewNoteContainer.append(NewNoteTitle, NewNoteDueDate,NewNoteContent)
        NoteListContainer.append(NewNoteContainer)
        

        console.log(NoteID)
        if(localStorage.getItem = null) {
        }
    }
}

submitbutton.addEventListener('click', () => { 
    let NewNoteContainer = document.createElement('li')
    let NewNoteTitle = document.createElement('h1')
    let NewNoteDueDate = document.createElement('p')
    let NewNoteContent = document.createElement('p')

    NewNoteContainer.id = NoteID
    NewNoteTitle.innerHTML = title.value
    NewNoteDueDate.innerHTML = dueDate.value
    NewNoteContent.innerHTML = content.value

    NewNoteContainer.append(NewNoteTitle, NewNoteDueDate,NewNoteContent)
    NoteListContainer.append(NewNoteContainer)

    localStorage.setItem("JTD NoteID" + NoteID, NoteID)
    localStorage.setItem('JTD NoteTitle' + NoteID, title.value)
    localStorage.setItem('JTD NoteDueDate' + NoteID, dueDate.value)
    localStorage.setItem('JTD NoteContent' + NoteID, content.value)

    NoteID += 1
})
