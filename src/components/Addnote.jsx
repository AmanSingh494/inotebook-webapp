import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

const Addnote = (props) => {
  const context = useContext(NoteContext)
  const { addNote } = context
  const [note, setNote] = useState({ title: '', description: '', tag: '' })

  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    props.showAlert('Added note successfully', 'success')
    setNote({ title: '', description: '', tag: '' })
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <h1 className='my-4'>Add a Note</h1>
      <form>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='email'
            className='form-control'
            id='title'
            name='title'
            aria-describedby='emailHelp'
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input
            className='form-control'
            id='description'
            name='description'
            onChange={onChange}
            value={note.description}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='tag' className='form-label'>
            Tag
          </label>
          <input
            className='form-control'
            id='tag'
            name='tag'
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button
          type='submit'
          disabled={
            note.title.length === 0 || note.description.length === 0
              ? true
              : false
          }
          className='btn btn-primary'
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  )
}

export default Addnote
