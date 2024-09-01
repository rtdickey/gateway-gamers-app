import React, { useMemo } from "react"

import { Session } from "@supabase/supabase-js"

import Combobox, { ComboboxOptions } from "components/Combobox"
import Shelf from "components/GameKeep/Shelf"
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

  return (
    <>
      {shelves.data && !shelves.error && (
        <div className='mt-5'>
          <Combobox
            options={shelfOptions}
            label='Select a shelf'
            handleSelectCallback={handleSelectCallback}
            selectedOption={selectedShelf}
          />
          <Shelf shelfId={selectedShelf} />
        </div>
      )}
    </>
  )
}

export default GameKeep
