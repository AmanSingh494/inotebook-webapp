import NoteContext from './noteContext'
import { useState } from 'react'
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: '64ff1182f92eeb0bc1dddf2511',
      user: '64fd8835e2a0b4bbbdefe03e',
      title: 'My first note',
      description: 'My second note',
      tag: 'general',
      date: '2023-09-11T13:09:22.637Z',
      __v: 0
    },
    {
      _id: '64ff118ff92eeb0bc1dddf2b4',
      user: '64fd8835e2a0b4bbbdefe03e',
      title: 'My third note',
      description: 'My second note',
      tag: 'general',
      date: '2023-09-11T13:09:35.516Z',
      __v: 0
    },
    {
      _id: '64ff1182f92eeb0bc1dddf254',
      user: '64fd8835e2a0b4bbbdefe03e',
      title: 'My first note',
      description: 'My second note',
      tag: 'general',
      date: '2023-09-11T13:09:22.637Z',
      __v: 0
    },
    {
      _id: '64ff118ff92eeb0bc1dddf2b3',
      user: '64fd8835e2a0b4bbbdefe03e',
      title: 'My third note',
      description: 'My second note',
      tag: 'general',
      date: '2023-09-11T13:09:35.516Z',
      __v: 0
    },
    {
      _id: '64ff1182f92eeb0bc1dddf252',
      user: '64fd8835e2a0b4bbbdefe03e',
      title: 'My first note',
      description: 'My second note',
      tag: 'general',
      date: '2023-09-11T13:09:22.637Z',
      __v: 0
    },
    {
      _id: '64ff118ff92eeb0bc1dddf2b1',
      user: '64fd8835e2a0b4bbbdefe03e',
      title: 'My third note',
      description: 'My second note',
      tag: 'general',
      date: '2023-09-11T13:09:35.516Z',
      __v: 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState
