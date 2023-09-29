import React, { useContext, useEffect, useRef, useState } from 'react'

import NoteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const context = useContext(NoteContext)
  const { notes, fetchNotes, editNote } = context
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchNotes()
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({
    id: '',
    eTitle: '',
    eDescription: '',
    eTag: ''
  })
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({
      id: currentNote._id,
      eTitle: currentNote.title,
      eDescription: currentNote.description,
      eTag: currentNote.tag
    })
  }
  const handleClick = () => {
    editNote(note.id, note.eTitle, note.eDescription, note.eTag)
    props.showAlert('Note updated successfully', 'success')
    refClose.current.click()
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <div className='my-3'>
        <button
          type='button'
          className='btn btn-primary d-none'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
          ref={ref}
        >
          Launch demo modal
        </button>
        <div
          className='modal fade'
          id='exampleModal'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  Edit Note
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                {/* modal form */}
                <form>
                  <div className='mb-3'>
                    <label htmlFor='eTitle' className='form-label'>
                      Title
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='eTitle'
                      name='eTitle'
                      aria-describedby='emailHelp'
                      onChange={onChange}
                      value={note.eTitle}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='eDescription' className='form-label'>
                      Description
                    </label>
                    <input
                      className='form-control'
                      id='eDescription'
                      name='eDescription'
                      onChange={onChange}
                      value={note.eDescription}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='eTag' className='form-label'>
                      Tag
                    </label>
                    <input
                      className='form-control'
                      id='eTag'
                      name='eTag'
                      onChange={onChange}
                      value={note.eTag}
                    />
                  </div>
                </form>
                {/* form end */}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={handleClick}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-4'>
        <h1>Your Notes</h1>
        <div className='my-4 '>
          {notes.length === 0 && <h3>No notes to Display</h3>}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem
              showAlert={props.showAlert}
              key={note._id}
              updateNote={updateNote}
              note={note}
            />
          )
        })}
      </div>
    </>
  )
}

export default Notes
