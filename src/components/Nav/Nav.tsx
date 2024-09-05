import React from "react"

import { faDice, faHome, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import menuToggle from "assets/control.png"
import logo from "assets/gateway-gamers-logo.png"
import NavItem from "components/NavItem"
import useSession from "hooks/Supabase/useSession"

const Nav = () => {
  const { isAuthenticated } = useSession()
  const [open, setOpen] = React.useState(true)

  const handleMenuToggleOnClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-accent relative`}>
        <img
          src={menuToggle}
          alt='menu toggle'
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-accent rounded-full ${!open && "rotate-180"}`}
          onClick={handleMenuToggleOnClick}
        />
        <div className='flex gap-x-4 items-center'>
          <img src={logo} alt='logo' className={`w-10 cursor-pointer duration-500`} />
          <h1 className={`origin-left text-medium text-xl duration-300 ${!open && "scale-0"}`}>Gateway Gamers</h1>
        </div>
        <ul className='pt-6'>
          <NavItem
            menuId='home'
            title='Home'
            path='/'
            icon={<FontAwesomeIcon icon={faHome} className='text-xl  fa-fw' />}
            showTitle={open}
          />
          {isAuthenticated && (
            <>
              <NavItem
                menuId='game-keep'
                title='Game Keep'
                path='/GameKeep'
                icon={<FontAwesomeIcon icon={faDice} className='text-xl  fa-fw' />}
                showTitle={open}
              />
              <NavItem
                menuId='profile'
                title='Profile'
                path='/Profile'
                icon={<FontAwesomeIcon icon={faUser} className='text-xl fa-fw' />}
                showTitle={open}
              />
            </>
          )}
          {!isAuthenticated && (
            <NavItem
              menuId='login'
              title='Login'
              path='/Login'
              icon={<FontAwesomeIcon icon={faUser} className='text-xl fa-fw' />}
              showTitle={open}
            />
          )}
        </ul>
      </div>
    </>
  )
}

export default Nav
