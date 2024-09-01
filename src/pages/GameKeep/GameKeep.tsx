import React from "react"

import { User } from "@supabase/supabase-js"

import Button from "components/Button"
import useShelves from "hooks/useShelves"

interface GameKeepProps {
  user: User
  handleSignOut: () => void
}

const GameKeep = ({ user, handleSignOut }: GameKeepProps) => {
  const { shelves } = useShelves()

  return (
    <>
      <div>
        <h1>Welcome, {user?.email}</h1>
        <Button className='mt-2' onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      {shelves.error && <div>Error loading shelves</div>}
      {shelves.data && !shelves.error && (
        <div className='mt-5'>
          <h2>Your Shelves</h2>
          <ul>
            {shelves.data.map(shelf => (
              <li key={shelf.id}>{shelf.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default GameKeep
