import React from "react"

import { Link } from "react-router-dom"

import Button from "components/Button"

const Nav = () => {
  const [open, setOpen] = React.useState(true)

  const handleMenuToggleOnClick = () => {
    setOpen(!open)
  }

  return (
    <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen bg-accent relative`}>
      <img
        src='./assets/control.png'
        alt='logo'
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-accent rounded-full ${!open && "rotate-180"}`}
        onClick={handleMenuToggleOnClick}
      />
    </div>
  )
}

export default Nav
