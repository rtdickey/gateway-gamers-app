import React, { useMemo } from "react"

import { Session } from "@supabase/supabase-js"

import useShelves from "hooks/useShelves"

interface MenuItem {
  shelfId: number
  title: string
  imgSrc: string
  gap: boolean
}

interface NavProps {
  session: Session | null
}

const Nav = ({ session }: NavProps) => {
  const { shelves } = useShelves()
  const [open, setOpen] = React.useState(true)

  const handleMenuToggleOnClick = () => {
    setOpen(!open)
  }

  const menus: MenuItem[] = useMemo(() => {
    if (shelves.error) {
      return []
    }

    if (shelves.data) {
      const items = shelves.data
      return items.map(shelf => {
        return {
          shelfId: shelf.id,
          title: shelf.name,
          imgSrc: "control.png",
        } as MenuItem
      })
    }

    return []
  }, [shelves])

  return (
    <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-accent relative`}>
      <img
        src='./assets/control.png'
        alt='logo'
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-accent rounded-full ${!open && "rotate-180"}`}
        onClick={handleMenuToggleOnClick}
      />
      <div className='flex gap-x-4 items-center'>
        <img src='./assets/gateway-gamers-logo.png' className={`w-10 cursor-pointer duration-500`} />
        <h1 className={`origin-left text-medium text-xl duration-300 ${!open && "scale-0"}`}>Gateway Gamers</h1>
      </div>
      <ul className='pt-6'>
        {menus.map((menu, index) => (
          <li
            key={menu.shelfId}
            className={`text-gray-600 text-sm  font-medium flex items-center gap-x-4 cursor-pointer p-2 hover:bg-secondary rounded-md ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-secondary"}`}
          >
            <img src={`./assets/${menu.imgSrc}`} alt={menu.title} className='w-6' />
            <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Nav
