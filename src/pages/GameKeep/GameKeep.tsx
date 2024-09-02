import React, { useMemo } from "react"

import { Session } from "@supabase/supabase-js"

import Combobox, { ComboboxOptions } from "components/Combobox"
import Shelf from "components/GameKeep/Shelf"
import GameSearch from "components/GameSearch"
import useShelves from "hooks/useShelves"

interface GameKeepProps {
  session: Session | null
}

const GameKeep: React.FC<GameKeepProps> = ({ session }) => {
  const { shelves } = useShelves()

  const [selectedShelf, setSelectedShelf] = React.useState<string>(shelves.data?.[0].id.toString() ?? "")

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

  const handleSelectCallback = (value: string) => {
    setSelectedShelf(value)
  }

  const handleAddToShelf = (bggGameId: string) => {
    alert(`add to shelf '${selectedShelf}', the game id is '${bggGameId}' for user '${session?.user?.id}'`)
  }

  return (
    <>
      {shelves.data && !shelves.error && (
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
            <GameSearch handleAddToShelf={handleAddToShelf} />
          </div>
        </div>
      )}
    </>
  )
}

export default GameKeep
