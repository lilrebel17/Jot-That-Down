let submitbutton = document.querySelector('.submit-note-button')

submitbutton.addEventListener('click', () => {
    let content = document.querySelector('.note-content')
    let title = document.querySelector('.note-title')
    let dueDate = document.querySelector('.note-due-date')

    console.log(content.value)
    console.log(title.value)
    console.log(dueDate)
})