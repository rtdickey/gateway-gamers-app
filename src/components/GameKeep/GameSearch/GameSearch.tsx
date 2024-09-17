import React, { useCallback, useEffect, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import { Input } from "components/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/Table"
import { useGetBoardGamesByIdQuery, useGetBoardGameBySearchQuery } from "services/bggApi"
import { AddGameRequest, useAddGameMutation } from "services/gamesApi"
import { BaseGame, Game } from "types"

import GameDrawer from "../GameDrawer"

const GameSearch: React.FC = () => {
  const [addGame] = useAddGameMutation()

  const [searchInput, setSearchInput] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [bggGameIds, setBggGameIds] = useState<string | null>(null)

  const [selectedBggGameId, setSelectedBggGameId] = useState<number | null>(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  const { data: bggGameDetails } = useGetBoardGamesByIdQuery(selectedBggGameId?.toString() ?? skipToken)
  const { data: searchGameDetails } = useGetBoardGamesByIdQuery(bggGameIds ?? skipToken)
  const [allGameDetails, setAllGameDetails] = useState<Game[]>([])

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
    console.log("games", searchGameDetails)
    if (searchGameDetails) {
      setAllGameDetails(prevState => [...prevState, ...searchGameDetails])
    } else {
      setAllGameDetails([])
    }
  }, [searchGameDetails])

  useEffect(() => {
    // setBggGameIds(games?.map(game => game.bgg_game_id).join(",") ?? null)
    setBggGameIds("143085,155766,68448,316377,331815,316382,316378,423428,331817,316380")
    setBggGameIds("423426,379939,173346,309116,348601,202976,310215,196339,186069,134277")
  }, [games, setBggGameIds])

  const handleGameSelect = (game: BaseGame) => {
    setSelectedBggGameId(game.bgg_game_id)
    setOpenDrawer(true)
  }

  useEffect(() => {
    if (!!bggGameDetails) {
      const game = bggGameDetails.filter(g => g.bgg_game_id === selectedBggGameId)[0]
      console.log("game to add", game)
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
              <TableHead></TableHead>
              <TableHead>BGG ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Year Published</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allGameDetails?.map(game => (
              <TableRow key={game.bgg_game_id} className='cursor-pointer' onClick={() => handleGameSelect(game)}>
                <TableCell className='flex items-center justify-center'>
                  {game.thumbnail && <img src={game.thumbnail} alt={game.name} className='w-auto' />}
                </TableCell>
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
