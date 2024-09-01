import React from "react"

import { Link } from "react-router-dom"

interface NavItemProps {
  menuId: string
  title: string
  gap?: boolean
  path: string
  icon: React.ReactNode
  activeMenuItem: string
  showTitle: boolean
  handleMenuClick: (menuId: string) => void
}

const NavItem: React.FC<NavItemProps> = ({
  menuId,
  title,
  gap = false,
  path,
  icon,
  activeMenuItem,
  showTitle,
  handleMenuClick,
}) => {
  const handleOnClick = () => {
    handleMenuClick(menuId)
  }

  return (
    <Link to={path}>
      <li
        className={`text-gray-600 text-sm font-medium flex items-center gap-x-4 cursor-pointer p-2 hover:bg-secondary rounded-md ${gap ? "mt-9" : "mt-2"} ${activeMenuItem === menuId && "bg-secondary"}`}
        onClick={handleOnClick}
      >
        {icon}
        <span className={`${!showTitle && "hidden"} origin-left duration-200`}>{title}</span>
      </li>
    </Link>
  )
}

export default NavItem
