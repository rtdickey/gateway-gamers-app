import React, { useEffect, useMemo, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"
import { Session } from "@supabase/supabase-js"

import Combobox, { ComboboxOptions } from "components/Combobox"
import Shelf from "components/GameKeep/Shelf"
import GameSearch from "components/GameSearch"
import useShelves from "hooks/useShelves"
import { useGetBoardGameByIdQuery, useGetBoardGameBySearchQuery } from "services/bggApi"
import { BaseGame } from "types"

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
          <GameSearch />
        </>
      )}
    </>
  )
}

export default GameKeep
