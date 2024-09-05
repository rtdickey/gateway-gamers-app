import React from "react"

import { Outlet } from "react-router-dom"

import Nav from "components/Nav"

import "gatewaygamers.css"

const Layout = () => {
  return (
    <div className='flex'>
      <Nav />
      <div className='p-7 flex-1 h-screen'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
