import React, { useMemo } from "react"

import { Session } from "@supabase/supabase-js"

import Combobox, { ComboboxOptions } from "components/Combobox"
import useShelves from "hooks/useShelves"

interface GameKeepProps {
  session: Session | null
}

const GameKeep: React.FC<GameKeepProps> = ({ session }) => {
  const { shelves } = useShelves()

  const shelfOptions = useMemo(() => {
    if (!!shelves.data) {
      return shelves.data?.map(shelf => {
        return {
          value: shelf.id.toString(),
          label: shelf.name,
        } as ComboboxOptions
      })
    }

    return []
  }, [shelves.data])

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
          <Combobox options={shelfOptions} label='Select a shelf' />
        </div>
      )}
    </>
  )
}

export default GameKeep
