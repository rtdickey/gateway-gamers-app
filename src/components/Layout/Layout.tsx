import React from "react"

import { Outlet } from "react-router-dom"

import "gatewaygamers.css"
import Nav from "components/Nav"

const Layout = () => {
  return (
    <div className='flex'>
      <Nav />
      <div className='p-7 text-2xl flex-1 h-screen'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
