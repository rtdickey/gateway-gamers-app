import React from "react"

import { Outlet } from "react-router-dom"

import Nav2 from "components/Nav/Nav2"

import "gatewaygamers.css"

const Layout = () => {
  return (
    <>
      <Nav2 />
      <div className='flex'>
        <div className='p-7 flex-1 h-screen'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
