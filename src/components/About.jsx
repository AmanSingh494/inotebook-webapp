import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
const About = () => {
  const a = useContext(noteContext)
  // useEffect(() => {
  //   a.update()
  //   // eslint-disable-next-line
  // }, [])
  return (
    <div>
      Hello {a.name} Your age is {a.Age}
    </div>
  )
}

export default About
