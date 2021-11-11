import React, { useEffect } from 'react'

const Alert = ({msg, type, removeAlert, list}) => {

  useEffect(() => {
    const clearAlert = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () =>  clearTimeout(clearAlert)
  }, [removeAlert, list])
  return (
    <p className={`alert alert-${type}`}>{msg}</p>
  )
}

export default Alert
