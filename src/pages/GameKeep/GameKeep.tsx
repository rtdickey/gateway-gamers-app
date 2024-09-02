import React, { useMemo } from "react"

import { Session } from "@supabase/supabase-js"

import Combobox, { ComboboxOptions } from "components/Combobox"
import GameSearch from "components/GameKeep/GameSearch"
import Shelf from "components/GameKeep/Shelf"
import useShelves from "hooks/useShelves"

interface GameKeepProps {
  session: Session | null
}

const GameKeep: React.FC<GameKeepProps> = ({ session }) => {
  const { data: shelves, error: shelvesError } = useShelves()

  const [selectedShelf, setSelectedShelf] = React.useState<string>(shelves?.[0].id.toString() ?? "")

  const shelfOptions = useMemo(() => {
    if (!!shelves) {
      return shelves.map(shelf => {
        return {
          value: shelf.id.toString(),
          label: shelf.name,
        } as ComboboxOptions
      })
    }

    return []
  }, [shelves])

  const handleSelectCallback = (value: string) => {
    setSelectedShelf(value)
  }

  return (
    <>
      {shelves && !shelvesError && (
        <div className='flex'>
          <div className='flex-1'>
            <h1 className='text-2xl'>Board Game Keep</h1>
            <hr className='mt-2 mb-2' />
            <div className='flex mt-5 mb-5 text-sm items-center gap-x-4 font-semibold'>
              <label>Shelf: </label>
              <Combobox
                options={shelfOptions}
                label='Select a shelf'
                handleSelectCallback={handleSelectCallback}
                selectedOption={selectedShelf}
              />
            </div>
            <Shelf shelfId={selectedShelf} />
          </div>
          <div>
            <GameSearch />
          </div>
        </div>
      )}
    </>
  )
}

export default GameKeep
