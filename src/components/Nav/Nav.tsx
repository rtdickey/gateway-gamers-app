import React from "react"

import { Link } from "react-router-dom"

import Button from "components/Button"

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Button variant='link' asChild>
            <Link to='/'>Home</Link>
          </Button>
        </li>
        <li>
          <Button variant='link' asChild>
            <Link to='/keep'>Game Keep</Link>
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
