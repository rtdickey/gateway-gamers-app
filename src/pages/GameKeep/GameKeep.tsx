import React, { useEffect, useMemo, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"
import { Session } from "@supabase/supabase-js"

import Button from "components/Button"
import Combobox, { ComboboxOptions } from "components/Combobox"
import Shelf from "components/GameKeep/Shelf"
import useShelves from "hooks/useShelves"
import { useGetBoardGameByIdQuery, useGetBoardGameBySearchQuery } from "services/bggApi"
import { BaseGame } from "types"

interface GameKeepProps {
  session: Session | null
}

const GameKeep: React.FC<GameKeepProps> = ({ session }) => {
  const [searchedGames, setSearchedGames] = useState<BaseGame[]>([])
  const { shelves } = useShelves()
  const { data: boardgame } = useGetBoardGameByIdQuery(35420)

  const [searchInput, setSearchInput] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const { data: games } = useGetBoardGameBySearchQuery(searchQuery ?? skipToken)

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

  const handleOnClickSearch = () => {
    setSearchQuery(searchInput)
  }

  const handleOnClickClear = () => {
    setSearchInput("")
    setSearchQuery(null)
    setSearchedGames([])
  }

  useEffect(() => {
    setSearchedGames(games ?? [])
  }, [games])

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
          <div className='mt-5'>
            <input
              type='text'
              className='border me-2'
              placeholder='Search for a game'
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <Button variant='ghost' size='sm' onClick={handleOnClickSearch}>
              Search
            </Button>

            <Button variant='ghost' size='sm' onClick={handleOnClickClear}>
              Clear
            </Button>
            <ul className='mt-5'>
              {searchedGames?.map((game, index) => {
                return <li key={index}>{game.name}</li>
              })}
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export default GameKeep
