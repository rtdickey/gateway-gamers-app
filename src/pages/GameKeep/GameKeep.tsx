import React from "react"

import GameSearch from "components/GameKeep/GameSearch"
import Shelf from "components/GameKeep/Shelf"
import ShelfSelect from "components/GameKeep/ShelfSelect"
import useShelves from "hooks/useShelves"

const GameKeep: React.FC = () => {
  const { data: shelves, error: shelvesError } = useShelves()

  const [selectedShelf, setSelectedShelf] = React.useState<string>(shelves?.[0].id.toString() ?? "")

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
              <ShelfSelect onSelect={handleSelectCallback} />
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
