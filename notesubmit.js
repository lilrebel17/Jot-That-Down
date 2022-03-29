let submitbutton = document.querySelector('.submit-note-button')
let NoteListContainer = document.querySelector('.notes-list-container')

let content = document.querySelector('.note-content')
let title = document.querySelector('.note-title')
let dueDate = document.querySelector('.note-due-date')
let NoteID = 0

window.onload = () =>{
    for(let i=0; i < localStorage.length; i++) {
        let NewNoteContainer = document.createElement('li')
        let NewNoteTitle = document.createElement('h1')
        let NewNoteDueDate = document.createElement('p')
        let NewNoteContent = document.createElement('p')
        let OldNote = JSON.parse(localStorage.getItem('Note' + i))

        NewNoteContainer.id = OldNote[0]
        NewNoteTitle.append(OldNote[1])
        NewNoteDueDate.append(OldNote[2])
        NewNoteContent.append(OldNote[3])

        NewNoteContainer.append(NewNoteTitle, NewNoteDueDate,NewNoteContent)
        NoteListContainer.append(NewNoteContainer)

        NoteID = OldNote[0] + 1
        console.log(OldNote)
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

    let StorageArray = [NoteID,title.value,dueDate.value,content.value]
    localStorage.setItem('Note' + NoteID, JSON.stringify(StorageArray))

    NoteID += 1
})
