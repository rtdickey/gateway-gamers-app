import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { skipToken } from "@reduxjs/toolkit/query"
import { NavLink } from "react-router-dom"

import logo from "assets/gateway-gamers-logo.png"
import { useSession } from "hooks/Supabase/useSession"
import { useGetUserDetailsQuery } from "services/userApi"

const Nav = () => {
  const { isAuthenticated, handleSignOut, session } = useSession()
  const user = session?.user
  const { data: userDetails } = useGetUserDetailsQuery(user ? { id: user.id } : skipToken)
  const userDisplayName = userDetails?.display_name.slice(0, 1) ?? "GG"

  const navigation = [
    { name: "Login", href: "/Login", show: !isAuthenticated },
    { name: "Game Keep", href: "/GameKeep", show: isAuthenticated },
    { name: "About", href: "/", show: true },
  ]

  const navlinks = navigation.filter(item => item.show)
  return (
    <Disclosure as='nav' className='bg-secondary'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/* Mobile menu button*/}
            <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-accent hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
              <span className='absolute -inset-0.5' />
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon aria-hidden='true' className='block h-6 w-6 group-data-[open]:hidden' />
              <XMarkIcon aria-hidden='true' className='hidden h-6 w-6 group-data-[open]:block' />
            </DisclosureButton>
          </div>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex flex-shrink-0 items-center'>
              <img src={logo} alt='Gateway Gamers' className={`h-8 w-auto`} />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-4'>
                {navlinks.map(item => (
                  <NavLink
                    to={item.href}
                    key={item.name}
                    className={({ isActive }) =>
                      [
                        isActive ? "bg-accent text-gray-800" : "text-gray-800 hover:bg-accent hover:text-gray-800",
                        "rounded-md px-3 py-2 text-sm font-medium",
                      ].join(" ")
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          {isAuthenticated && (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              {/* Profile dropdown */}
              <Menu as='div' className='relative ml-3'>
                <div>
                  <MenuButton className='relative flex rounded-full bg-accent text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-primary'>
                    <span className='absolute -inset-1.5' />
                    <span className='sr-only'>Open user menu</span>
                    <div className='h-8 w-8 rounded-full ring-1 ring-primary bg-accent text-gray-800 font-bold flex items-center justify-center'>
                      {userDisplayName}
                    </div>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
                >
                  <MenuItem>
                    <NavLink to='/Profile' className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100'>
                      Your Profile
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <div
                      className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100'
                      onClick={handleSignOut}
                    >
                      Sign out
                    </div>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          )}
        </div>
      </div>

      <DisclosurePanel className='sm:hidden'>
        <div className='space-y-1 px-2 pb-3 pt-2 flex flex-col'>
          {navlinks.map(item => (
            <NavLink
              to={item.href}
              key={item.name}
              className={({ isActive }) =>
                [
                  isActive ? "bg-accent text-gray-800" : "flex-1 text-gray-800 hover:bg-accent hover:text-gray-800",
                  "rounded-md px-3 py-2 text-sm font-medium",
                ].join(" ")
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Nav
