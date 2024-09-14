import React, { useEffect, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import { Card, CardContent } from "components/Card"
import { Drawer } from "components/Drawer"
import { Input } from "components/Input"
import { ScrollArea } from "components/ScrollArea"
import { Separator } from "components/Separator"
import { useGetBoardGameByIdQuery, useGetBoardGameBySearchQuery } from "services/bggApi"
import { AddGameRequest, useAddGameMutation, useGetGamesByBggGameIdQuery } from "services/gamesApi"
import { useAddUserGameMutation } from "services/userGamesApi"
import { BaseGame } from "types"

import GameDetails from "../GameDetail"

const GameSearch: React.FC = () => {
  const [addGame] = useAddGameMutation()
  const [searchedGames, setSearchedGames] = useState<BaseGame[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [selectedBggGameId, setSelectedBggGameId] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

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
    // setSearchedGames(games?.filter(g => userGames?.every(ug => ug.bgg_game_id !== g.bgg_game_id)) ?? [])
    setSearchedGames(games ?? [])
  }, [games])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleGameSelect = (game: BaseGame) => {
    setSelectedBggGameId(game.bgg_game_id)
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleDrawerClose = () => {
    setSelectedBggGameId(null)
    setDrawerOpen(!drawerOpen)
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

    if (!!gameDetails?.[0]) {
      handleDrawerOpen()
    }
  }, [gameDetails, addGame, bggGameDetails, handleDrawerOpen])

  return (
    <>
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
                  <div key={game.bgg_game_id}>
                    <div className='text-sm hover:bg-accent cursor-pointer p-3' onClick={() => handleGameSelect(game)}>
                      {game.name}
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
      <Drawer open={drawerOpen} onClose={handleDrawerClose}>
        <GameDetails game={gameDetails?.length ? gameDetails[0] : null} handleOnClickCancel={handleDrawerClose} />
      </Drawer>
    </>
  )
}

export default GameSearch
