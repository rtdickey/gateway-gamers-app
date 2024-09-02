import React, { useEffect, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import { Card, CardContent } from "components/Card"
import { Input } from "components/Input"
import { useGetBoardGameBySearchQuery } from "services/bggApi"
import { BaseGame } from "types"

const GameSearch = () => {
  const [searchedGames, setSearchedGames] = useState<BaseGame[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const { data: games } = useGetBoardGameBySearchQuery(searchQuery ?? skipToken)

  const handleSearch = () => {
    setSearchQuery(searchInput)
  }

  const handleClear = () => {
    setSearchInput("")
    setSearchQuery(null)
    setSearchedGames([])
  }

  useEffect(() => {
    setSearchedGames(games ?? [])
  }, [games])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }
  return (
    <Card>
      <CardContent className='pt-5'>
        <div></div>
        <Input placeholder='Search for a game' value={searchInput} onChange={handleOnChange} />

        <Button variant='ghost' size='sm' onClick={handleSearch}>
          Search
        </Button>

        <Button variant='ghost' size='sm' onClick={handleClear}>
          Clear
        </Button>
        <div>
          <ul className='mt-5'>
            {searchedGames?.map((game, index) => {
              return <li key={index}>{game.name}</li>
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default GameSearch
