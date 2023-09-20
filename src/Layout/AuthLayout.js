import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = ({userData}) => {
   
    return (
        <>
          <Outlet/>
        </>

    )
}

export default AuthLayout