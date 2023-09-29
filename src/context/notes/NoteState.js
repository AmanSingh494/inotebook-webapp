import NoteContext from './noteContext'
import { useState } from 'react'
const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  // adding a note
  const fetchNotes = async () => {
    // Making api call
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      })
      const json = await response.json()
      console.log(json)
      setNotes(json)
    } catch (err) {
      console.log(err)
    }
  }
  const addNote = async (title, description, tag) => {
    // Validating for duplicate notes
    let validation = true
    const setValidation = (boolean) => {
      validation = boolean
    }
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i]
      if (note.title === title) {
        setValidation(false)
        break
      }
    }
    if (validation === false) {
      alert('Two notes cannot have same title')
    } else {
      // Making api call
      console.log('adding new note')
      const response = await fetch(`${host}/api/notes/createnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      })
      const json = await response.json()
      console.log(json)
      setNotes(notes.concat(json))
    }
  }
  // deleting a note
  const deleteNote = async (id) => {
    console.log('deleteNote with id: ' + id)
    // Making api call
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const newNotes = notes.filter((note) => note._id !== id)
    setNotes(newNotes)
  }
  // updating a note
  const editNote = async (id, title, description, tag) => {
    // Making api call
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    // Logic for editing note
    const newNotes = JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newNotes.length; i++) {
      let element = newNotes[i]
      if (element._id === id) {
        newNotes[i] = { title, description, tag }
        break
      }
    }

    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState
