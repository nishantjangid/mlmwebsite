import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

const Layout = () => {

    return (
        <>
            <Header outlet={<Outlet />}/>
            

        </>

    )
}

export default Layout