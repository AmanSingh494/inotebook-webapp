import React from 'react'

const Noteitem = (props) => {
  const { note } = props
  return (
    <div className='col-md-4 my-4'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{note.title}</h5>
          <p className='card-text'>{note.description}</p>
          <i className='fa-solid fa-pen-to-square me-4'></i>
          <i className='fa-solid fa-trash'></i>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
