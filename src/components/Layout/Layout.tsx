import React from "react"

import { Session } from "@supabase/supabase-js"
import { Outlet } from "react-router-dom"

import Nav from "components/Nav"

import "gatewaygamers.css"

interface LoginProps {
  session: Session | null
}

const Layout = ({ session }: LoginProps) => {
  return (
    <div className='flex'>
      <Nav session={session} />
      <div className='p-7 flex-1 h-screen'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
