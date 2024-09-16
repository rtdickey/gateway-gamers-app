import React, { useEffect, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import bggLogo from "assets/powered_by_bgg.webp"
import Button from "components/Button"
import { Input } from "components/Input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "components/Table"
import { useGetBoardGameByIdQuery, useGetBoardGameBySearchQuery } from "services/bggApi"
import { AddGameRequest, useAddGameMutation, useGetGamesByBggGameIdQuery } from "services/gamesApi"
import { BaseGame } from "types"

const GameSearch: React.FC = () => {
  const [addGame] = useAddGameMutation()
  const [searchedGames, setSearchedGames] = useState<BaseGame[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [selectedBggGameId, setSelectedBggGameId] = useState<number | null>(null)

  const { data: bggGameDetails } = useGetBoardGameByIdQuery(selectedBggGameId ?? skipToken)
  const { data: gameDetails } = useGetGamesByBggGameIdQuery(selectedBggGameId ?? skipToken)

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

  const handleGameSelect = (game: BaseGame) => {
    setSelectedBggGameId(game.bgg_game_id)
  }

  useEffect(() => {
    if (!!gameDetails && gameDetails.length === 0 && !!bggGameDetails) {
      setSelectedBggGameId(null)
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
      setSelectedBggGameId(bggGameDetails.bgg_game_id)
    }
  }, [])

  return (
    <>
      <div>
        <Input placeholder='Search for a game' value={searchInput} onChange={handleOnChange} />
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
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchedGames?.map(game => (
              <TableRow key={game.bgg_game_id}>
                <TableCell onClick={() => handleGameSelect(game)}>{game.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default GameSearch
