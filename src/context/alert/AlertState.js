import AlertContext from './alertContext'
import { useState } from 'react'

const AlertState = (props) => {
  // const [alert, setAlert] = useState(111)
  const alert = 'hello world'
  return (
    <AlertContext.Provider value={alert}>
      {props.children}
    </AlertContext.Provider>
  )
}
export default AlertState
