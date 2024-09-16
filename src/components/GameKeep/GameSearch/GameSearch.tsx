import React, { useCallback, useEffect, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import { Input } from "components/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/Table"
import { useGetBoardGameByIdQuery, useGetBoardGameBySearchQuery } from "services/bggApi"
import { AddGameRequest, useAddGameMutation, useGetGamesByBggGameIdQuery } from "services/gamesApi"
import { BaseGame } from "types"

import GameDrawer from "../GameDrawer"

const GameSearch: React.FC = () => {
  const [addGame] = useAddGameMutation()
  const [searchedGames, setSearchedGames] = useState<BaseGame[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [selectedBggGameId, setSelectedBggGameId] = useState<number | null>(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  const { data: bggGameDetails } = useGetBoardGameByIdQuery(selectedBggGameId ?? skipToken)

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

  useEffect(() => {
    setSearchedGames(games ?? [])
  }, [games])

  const handleGameSelect = (game: BaseGame) => {
    setSelectedBggGameId(game.bgg_game_id)
    setOpenDrawer(true)
  }

  useEffect(() => {
    if (bggGameDetails) {
      addGame({
        name: bggGameDetails.name ?? "",
        year_published: bggGameDetails.year_published ?? null,
        min_players: bggGameDetails.min_players ?? null,
        max_players: bggGameDetails.max_players ?? null,
        playing_time: bggGameDetails.playing_time ?? null,
        age: bggGameDetails.age ?? null,
        thumbnail: bggGameDetails.thumbnail ?? "",
        image: bggGameDetails.image ?? "",
        bgg_game_id: bggGameDetails.bgg_game_id ?? 0,
      } as AddGameRequest)
    }
  }, [bggGameDetails, addGame])

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
            {searchedGames?.map(game => (
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
