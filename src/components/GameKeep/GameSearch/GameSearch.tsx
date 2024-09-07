import React, { useEffect, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import { Card, CardContent } from "components/Card"
import { Drawer } from "components/Drawer"
import { Input } from "components/Input"
import { ScrollArea } from "components/ScrollArea"
import { Separator } from "components/Separator"
import { useGetBoardGameBySearchQuery } from "services/bggApi"
// import { useAddGameMutation } from "services/shelvesApi"
// import { useGetAllUserGamesQuery } from "services/userGamesApi"
import { BaseGame } from "types"

import GameDetails from "../GameDetail"

const GameSearch: React.FC = () => {
  // const { data: userGames } = useGetAllUserGamesQuery()
  // const [addGame] = useAddGameMutation()
  const [searchedGames, setSearchedGames] = useState<BaseGame[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [selectedGame, setSelectedGame] = useState<BaseGame | null>(null)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

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

  const handleDrawerOpen = (game: BaseGame) => {
    setSelectedGame(game)
    setDrawerOpen(!drawerOpen)

    // addGame({
    //   name: game?.name,
    //   year_published: game?.year_published,
    //   // min_players: game?.min_players,
    //   // max_players: game?.max_players,
    //   // playing_time: game?.playing_time,
    //   // age: game?.age,
    //   // thumbnail: game?.thumbnail,
    //   // image: game?.image,
    //   bgg_game_id: game?.bgg_game_id,
    // } as AddGameRequest)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(!drawerOpen)
  }

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
                    <div className='text-sm hover:bg-accent cursor-pointer p-3' onClick={() => handleDrawerOpen(game)}>
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
        <GameDetails game={selectedGame} handleOnClickCancel={handleDrawerClose} />
      </Drawer>
    </>
  )
}

export default GameSearch
