import React from "react"

import { NavLink } from "react-router-dom"

interface NavItemProps {
  menuId: string
  title: string
  gap?: boolean
  path: string
  icon: React.ReactNode
  showTitle: boolean
}

const NavItem: React.FC<NavItemProps> = ({ menuId, title, gap = false, path, icon, showTitle }) => {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <li
          className={`text-gray-600 text-sm font-medium flex items-center gap-x-4 cursor-pointer p-2 hover:bg-secondary rounded-md ${gap ? "mt-9" : "mt-2"} ${isActive && "bg-secondary"}`}
        >
          {icon}
          <span className={`${!showTitle && "hidden"} origin-left duration-200`}>{title}</span>
        </li>
      )}
    </NavLink>
  )
}

export default NavItem
