import React from 'react'
import { Navigate } from'react-router-dom'
const isAdmin = () =>{
    return !!localStorage.getItem("isAdmin")
}
const AdminRouter = ({children}) => {
    
  return isAdmin() ? children : <Navigate to="/homepage" replace/>
}

export default AdminRouter