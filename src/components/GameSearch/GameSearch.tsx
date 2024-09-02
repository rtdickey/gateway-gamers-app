import React, { useEffect, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import { Card, CardContent } from "components/Card"
import { Input } from "components/Input"
import { ScrollArea } from "components/ScrollArea"
import { Separator } from "components/Separator"
import { useGetBoardGameBySearchQuery } from "services/bggApi"
import { BaseGame } from "types"

const GameSearch = () => {
  const [searchedGames, setSearchedGames] = useState<BaseGame[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const { data: games } = useGetBoardGameBySearchQuery(
    searchQuery ? { name: searchQuery, page: 1, pageSize: 10 } : skipToken,
  )

  const handleSearch = () => {
    setSearchQuery(searchInput)
  }

  const handleClear = () => {
    setSearchInput("")
    setSearchQuery(null)
  }

  useEffect(() => {
    setSearchedGames(games ?? [])
  }, [games])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleAddToShelf = () => {
    alert("add to shelf")
  }

  return (
    <Card>
      <CardContent className='pt-5'>
        <div>
          <Input placeholder='Search for a game' value={searchInput} onChange={handleOnChange} />
        </div>
        <div className='flex justify-items-end m-2'>
          <Button variant='ghost' size='sm' onClick={handleSearch}>
            Search
          </Button>
          <Button variant='ghost' size='sm' onClick={handleClear}>
            Clear
          </Button>
        </div>
        {searchQuery && (
          <ScrollArea className='h-72 w-48 rounded-md border'>
            <div className='p-4'>
              {searchedGames?.map(game => (
                <>
                  <div key={`bgg-${game.bgg_game_id}`} className='text-sm'>
                    {game.name}
                    <Button variant='ghost' size='sm' onClick={handleAddToShelf}>
                      Add
                    </Button>
                  </div>
                  <Separator className='my-2' />
                </>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

export default GameSearch
