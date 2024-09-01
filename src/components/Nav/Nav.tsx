import React from "react"

import { faDice, faHome, faPerson, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Session } from "@supabase/supabase-js"

import NavItem from "components/NavItem"

interface NavProps {
  session: Session | null
}

const Nav = ({ session }: NavProps) => {
  const [open, setOpen] = React.useState(true)
  const [activeMenuItem, setActiveMenuItem] = React.useState("home")

  const handleMenuToggleOnClick = () => {
    setOpen(!open)
  }

  const handleMenuClick = (menuId: string) => {
    setActiveMenuItem(menuId)
  }

  return (
    <>
      <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-accent relative`}></div>
      <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-accent fixed`}>
        <img
          src='./assets/control.png'
          alt='menu toggle'
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-accent rounded-full ${!open && "rotate-180"}`}
          onClick={handleMenuToggleOnClick}
        />
        <div className='flex gap-x-4 items-center'>
          <img src='./assets/gateway-gamers-logo.png' alt='logo' className={`w-10 cursor-pointer duration-500`} />
          <h1 className={`origin-left text-medium text-xl duration-300 ${!open && "scale-0"}`}>Gateway Gamers</h1>
        </div>
        <ul className='pt-6'>
          <NavItem
            menuId='home'
            title='Home'
            path='/'
            icon={<FontAwesomeIcon icon={faHome} className='text-xl  fa-fw' />}
            activeMenuItem={activeMenuItem}
            handleMenuClick={handleMenuClick}
            showTitle={open}
          />
          <NavItem
            menuId='game-keep'
            title='Game Keep'
            path='/GameKeep'
            icon={<FontAwesomeIcon icon={faDice} className='text-xl  fa-fw' />}
            activeMenuItem={activeMenuItem}
            handleMenuClick={handleMenuClick}
            showTitle={open}
          />
          {session && (
            <NavItem
              menuId='profile'
              title='Profile'
              path='/Profile'
              icon={<FontAwesomeIcon icon={faUser} className='text-xl fa-fw' />}
              activeMenuItem={activeMenuItem}
              handleMenuClick={handleMenuClick}
              showTitle={open}
            />
          )}
        </ul>
      </div>
    </>
  )
}

export default Nav
