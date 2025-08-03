import { Navigate,useNavigate,Outlet } from "react-router-dom";
import React from 'react'

const AuthGuard = () => {
    const isAuth = !!localStorage.getItem("token")
    console.log(isAuth)
  return (
    isAuth ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default AuthGuard