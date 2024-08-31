import React, { useMemo } from "react"

import { Session } from "@supabase/supabase-js"
import { Link } from "react-router-dom"

import Button from "components/Button"
import useShelves from "hooks/useShelves"

interface MenuItem {
  menuId: string
  title: string
  imgSrc: string
  gap: boolean
  shelfId?: number
  path: string
}

interface NavProps {
  session: Session | null
}

const Nav = ({ session }: NavProps) => {
  const { shelves } = useShelves()
  const [open, setOpen] = React.useState(true)
  const [activeMenuItem, setActiveMenuItem] = React.useState("home")

  const handleMenuToggleOnClick = () => {
    setOpen(!open)
  }

  const menus: MenuItem[] = useMemo(() => {
    let menu: MenuItem[] = [
      { menuId: "home", title: "Home", imgSrc: "control.png", path: "/", gap: false },
      { menuId: "game-keep", title: "Game Keep", imgSrc: "control.png", path: "/GameKeep", gap: true },
    ]
    if (shelves.error) {
      return menu
    }

    if (shelves.data) {
      const shelvesData = shelves.data
      const shelfItems = shelvesData.map(shelf => {
        return {
          menuId: `{'shelf'-${shelf.id}}`,
          shelfId: shelf.id,
          title: shelf.name,
          imgSrc: "control.png",
          path: "/GameKeep",
        } as MenuItem
      })
      menu = [...menu, ...shelfItems]
    }

    return menu
  }, [shelves])

  const handleMenuClick = (menuId: string) => {
    setActiveMenuItem(menuId)
  }

  return (
    <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-accent relative`}>
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
        {menus.map((menu, index) => (
          <Link key={menu.menuId} to={menu.path}>
            <li
              className={`text-gray-600 text-sm  font-medium flex items-center gap-x-4 cursor-pointer p-2 hover:bg-secondary rounded-md ${menu.gap ? "mt-9" : "mt-2"} ${menu.menuId === activeMenuItem && "bg-secondary"}`}
              onClick={() => handleMenuClick(menu.menuId)}
            >
              <img src={`./assets/${menu.imgSrc}`} alt={menu.title} className='w-6' />
              <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Nav
