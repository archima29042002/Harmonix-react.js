import React from 'react'
import { Navigate } from 'react-router-dom'
const isAuth = () =>{
    return !!localStorage.getItem("email")
}
const PrivateRoute = ({children}) => {
  return isAuth()  ? children : <Navigate to="/login" />
}

export default PrivateRoute