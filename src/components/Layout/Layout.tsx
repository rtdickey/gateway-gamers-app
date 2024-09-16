import React from "react"

import { Outlet } from "react-router-dom"

import bggLogo from "assets/powered_by_bgg.webp"
import Nav2 from "components/Nav/Nav2"

import "gatewaygamers.css"

const Layout = () => {
  const year = new Date().getFullYear()
  return (
    <>
      <Nav2 />
      <div className='flex'>
        <div className='flex-1 min-h-screen'>
          <div className='p-7 flex-1 h-full'>
            <Outlet />
          </div>
          <footer className='bg-accent w-full p-2 text-muted-foreground flex justify-between items-center'>
            <a href='https://boardgamegeek.com/' target='_blank' rel='noreferrer'>
              <img src={bggLogo} title='Powered By BGG' alt='Powered By BGG' className='h-10' />
            </a>
            <span>© {year} Gateway Gamers</span>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Layout
