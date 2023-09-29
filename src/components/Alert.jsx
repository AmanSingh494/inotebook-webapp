import React from 'react'
// import AlertContext from '../context/alert/alertContext'

const Alert = (props) => {
  return (
    <div
      style={{
        height: '50px'
      }}
    >
      {props.alert && (
        <div
          // ref={alertRef}
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role='alert'
        >
          {props.alert.msg}
        </div>
      )}
    </div>
  )
}

export default Alert
