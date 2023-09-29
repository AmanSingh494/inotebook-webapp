import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
  const { note, updateNote, showAlert } = props

  const context = useContext(NoteContext)
  const { deleteNote } = context

  return (
    <div className='col-md-4 my-4'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title '>{note.title}</h5>
            <span className='badge text-bg-success rounded-pill'>
              {note.tag === '' ? 'general' : note.tag}
            </span>
          </div>
          <p className='card-text'>{note.description}</p>

          <i
            className='fa-solid fa-pen-to-square me-4'
            onClick={() => {
              updateNote(note)
            }}
          ></i>
          <i
            className='fa-solid fa-trash'
            onClick={() => {
              deleteNote(note._id)
              showAlert('Deleted note successfully', 'success')
            }}
          ></i>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
