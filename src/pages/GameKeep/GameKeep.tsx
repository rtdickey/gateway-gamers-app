import React from "react"

import { Session } from "@supabase/supabase-js"

import Combobox from "components/Combobox"
import useShelves from "hooks/useShelves"

interface GameKeepProps {
  session: Session | null
}

const GameKeep: React.FC<GameKeepProps> = ({ session }) => {
  const { shelves } = useShelves()

  return (
    <>
      {shelves.data && !shelves.error && (
        <div className='mt-5'>
          <h2>Your Shelves</h2>
          <ul>
            {shelves.data.map(shelf => (
              <li key={shelf.id}>{shelf.name}</li>
            ))}
          </ul>
          <Combobox />
        </div>
      )}
    </>
  )
}

export default GameKeep
