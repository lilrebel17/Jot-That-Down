# Let Me Jot That Down

 Take notes online with some editor functionality

 All files are saved to localstorage in browser.
 Please use the same browser & device for now as your notes will not transfer over.

## __Tech Stack__

 No Frameworks were used, all vanilla

 1. Javascript
 1. HTML
 1. CSS

## ___Documentation___

- __Structure__
  - All divs are named with my shorthand, some examples below.
    - ``lft-sd-cntnr`` = left-side-container
    - ``edt-cntnr`` = editor-container
    - ``tp-edt-cntnr`` = top-editor-container
  - Notes are created and updated dynamically
  - All are assigned the class ``notesli``
  - Every note is assigned an ID based on when it was loaded from the array

- __Storage__
  - Everything is stored in one key in local storage
    - the key is called 'Notes'
    - Its an array, and every note is its own sub array
    - Stringify the notes key before you put it in local storage

- __Selecting Notes__
  - ```SelectionArray```
    - This is a global variable used to keep up with which note you select
    - [0] is always the currently selected note
    - [1] is always the previously selected note
  - ``NoteListContainer.addEventListener('click', (a) =>`` _--line 149--_
    - Listens for your click. ``a`` is converted into the ID of the element you selected in the notes list on the left side of the screen
    - Within this function ``UpdateNotesList(id)`` & ``AddToEditor(currentid)`` is ran, with the param being ``a``
    - Upon clicking we then save the previous note by running ``SaveNote()``
  - ```function UpdateSelectionArray(currentid)``` _--line 200--_
    - Takes param currentid, which is whatever noteID is currently selected
    - It then pushed currentID to the back of ``SelectionArray`` so its ``SelectionArray[0]``
    - Finally it checks to make sure ``SelectionArray`` isnt longer than two elements, if so it pops the 3rd element

- __Writing Notes to Editor__
  - ``AddToEditor(currentid)`` _--line 173 --_
    - Takes currentid as a param, which is given from ``NoteListContainer.addEventListener('click', (a) =>``
    - Then writes the selection to the editor based on the current children nodes of the element with the currentid. 
    - Finally updates ``SelectionArray[]`` to make sure it stays correct

- __Writing to Notes List__
  - ``UpdateNotesList(id)``_--line 189--_
    - Adds ``hidden`` class to current selection, to _'remove'_ the note from the list
    - Removes ``hidden`` class from previous selection to _'restore'_ the previous note to the list

- __Onload__
  - ```window.onload``` _--line 37--_
    - Checks for our storage key ```Notes``` In localstorage
      - If it finds it, it parses the key so it converts back to an array
      - Then a for loop iterates through the length of the array, and writes everything to the screen

- __Saving Notes__
  - ```function SaveNotes(NoteArray)``` _--line 76--_
    - Everytime a note saves in anyway its ran through this function
    - Syntax: ___[Title,DueDate,Content]___
    - The parameter must be an array, with the syntax listed above to save and read properly

- __Deleting Notes__
  - ```function DeleteNote(currentid)``` _--line 137--_
    - Completley deletes the selection from both localstorage & the screen
  - ```function ShiftElementIDs(oldid)``` _--line 299--_
    - oldid is given from your current selection
    - Checks to make sure the oldid isnt the last child of the notes list
    - a for loop iterates through the notes list and reorders the IDS once so it stays matched up with localstorage
