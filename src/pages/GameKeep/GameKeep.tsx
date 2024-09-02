import React, { useMemo } from "react"

import { Session } from "@supabase/supabase-js"

import Combobox, { ComboboxOptions } from "components/Combobox"
import Shelf from "components/GameKeep/Shelf"
import useShelves from "hooks/useShelves"
import { useGetBoardGameQuery } from "services/bggApi"

interface GameKeepProps {
  session: Session | null
}

const GameKeep: React.FC<GameKeepProps> = ({ session }) => {
  const { shelves } = useShelves()
  const { data: boardgame } = useGetBoardGameQuery("35420")
  const [selectedShelf, setSelectedShelf] = React.useState<string>(shelves.data?.[0].id.toString() ?? "")

  const game = useMemo(() => {
    const result = JSON.stringify(boardgame, null, 2)
    console.log(result)
    return result
  }, [boardgame])

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

  return (
    <>
      {shelves.data && !shelves.error && (
        <>
          <h1>The Game Keep</h1>
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
          <div className='mt-5'>
            <pre>{boardgame?.name}</pre>
          </div>
        </>
      )}
    </>
  )
}

export default GameKeep
