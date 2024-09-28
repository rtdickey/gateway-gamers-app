import React, { useCallback, useEffect, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/ui/Button"
import { Input } from "components/ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/ui/Table"
import { useGetBoardGamesByIdQuery, useGetBoardGameBySearchQuery } from "services/bggApi"
import { AddGameRequest, useAddGameMutation } from "services/gamesApi"
import { BaseGame } from "types"

import GameDrawer from "../GameDrawer"

const GameSearch: React.FC = () => {
  const [addGame] = useAddGameMutation()

  const [searchInput, setSearchInput] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string | null>(null)

  const [selectedBggGameId, setSelectedBggGameId] = useState<number | null>(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  const { data: bggGameDetails } = useGetBoardGamesByIdQuery(selectedBggGameId?.toString() ?? skipToken)

  const { data: games } = useGetBoardGameBySearchQuery(
    searchQuery ? { name: searchQuery, page: 1, pageSize: 10 } : skipToken,
  )

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = useCallback(() => {
    setSearchQuery(searchInput)
  }, [searchInput])

  const handleClear = () => {
    setSearchInput("")
    setSearchQuery(null)
  }

  const handleGameSelect = (game: BaseGame) => {
    setSelectedBggGameId(game.bgg_game_id)
    setOpenDrawer(true)
  }

  useEffect(() => {
    if (bggGameDetails && bggGameDetails.length > 0) {
      const game = bggGameDetails.filter(g => g.bgg_game_id === selectedBggGameId)[0]
      addGame({
        name: game.name ?? "",
        year_published: game.year_published ?? null,
        min_players: game.min_players ?? null,
        max_players: game.max_players ?? null,
        playing_time: game.playing_time ?? null,
        age: game.age ?? null,
        thumbnail: game.thumbnail ?? "",
        image: game.image ?? "",
        bgg_game_id: game.bgg_game_id ?? 0,
      } as AddGameRequest)
    }
  }, [bggGameDetails, addGame, selectedBggGameId])

  return (
    <>
      <div>
        <Input placeholder='Search BGG' value={searchInput} onChange={handleOnChange} />
      </div>
      <div className='flex justify-items-end m-2'>
        <Button variant='ghostSecondary' size='sm' onClick={handleSearch}>
          Search
        </Button>
        <Button variant='ghost' size='sm' onClick={handleClear}>
          Clear
        </Button>
      </div>
      {searchQuery && (
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>BGG ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Year Published</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games?.map(game => (
              <TableRow key={game.bgg_game_id} className='cursor-pointer' onClick={() => handleGameSelect(game)}>
                <TableCell>{game.bgg_game_id}</TableCell>
                <TableCell>{game.name}</TableCell>
                <TableCell>{game.year_published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <GameDrawer open={openDrawer} setOpen={setOpenDrawer} bggGameId={selectedBggGameId} />
    </>
  )
}

export default GameSearch
