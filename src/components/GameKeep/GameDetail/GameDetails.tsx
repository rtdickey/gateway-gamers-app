import React, { useEffect, useMemo, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "components/Drawer"
import useSession from "hooks/Supabase/useSession"
import { useGetBoardGameByIdQuery } from "services/bggApi"
import { AddGameRequest, useAddGameMutation } from "services/shelvesApi"
import { useAddUserGameMutation } from "services/userGamesApi"
import { BaseGame } from "types"

import ShelfSelect from "../ShelfSelect"

interface GameDetailsProps {
  game: BaseGame | null
  handleOnClickCancel: () => void
}

const GameDetails: React.FC<GameDetailsProps> = ({ game, handleOnClickCancel }) => {
  const { session, isAuthenticated } = useSession()
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null)
  const [addUserGame] = useAddUserGameMutation()
  const [addGame] = useAddGameMutation()

  const { data: gameDetails } = useGetBoardGameByIdQuery(game?.bgg_game_id ?? skipToken)

  const canAddGameToShelf = useMemo(() => {
    return isAuthenticated && !!selectedShelf
  }, [isAuthenticated, selectedShelf])

  const handleOnShelfSelect = (shelfId: string) => {
    setSelectedShelf(shelfId)
  }

  const handleAddToShelf = (bggGameId: number | undefined) => {
    if (!!bggGameId && canAddGameToShelf && session?.user?.id) {
      console.log("adding game to shelf")
      //addUserGame({ shelfId: parseInt(selectedShelf!), gameId: "test", userId: session.user.id })
    }
  }

  return (
    <DrawerContent>
      <div className='mx-auto w-full max-w-sm'>
        {game && (
          <DrawerHeader>
            <DrawerTitle className='text-2xl'>
              {gameDetails?.image && <img src={gameDetails.image} alt={gameDetails?.name} className='h-48 m-auto' />}
              <div className='mt-2'>{game.name}</div>
            </DrawerTitle>
            <DrawerDescription>{gameDetails?.year_published}</DrawerDescription>
          </DrawerHeader>
        )}
        {game ? (
          <div className='p-4 pb-0'>
            <div className='flex flex-col space-x-2'>
              <ul>
                {gameDetails?.min_players && (
                  <li>
                    <span className='font-semibold me-2'>Mininum Players:</span>
                    <span>{gameDetails.min_players}</span>
                  </li>
                )}
                {gameDetails?.max_players && (
                  <li>
                    <span className='font-semibold me-2'>Maximum Players:</span>
                    <span>{gameDetails.max_players}</span>
                  </li>
                )}
                {gameDetails?.playing_time && (
                  <li>
                    <span className='font-semibold me-2'>Playing Time:</span>
                    <span>{gameDetails.playing_time} minutes</span>
                  </li>
                )}
                {gameDetails?.age && (
                  <li>
                    <span className='font-semibold me-2'>Ages:</span>
                    <span>{gameDetails.age}+</span>
                  </li>
                )}
              </ul>
            </div>
            <div className='flex justify-center mt-5 mb-3'>
              <ShelfSelect onSelect={handleOnShelfSelect} />
            </div>
          </div>
        ) : (
          <div className='text-center'>There was an issue retrieving game details.</div>
        )}
        {game && (
          <DrawerFooter className='grid grid-cols-2 gap-4 justify-between'>
            <Button onClick={() => handleAddToShelf(gameDetails?.bgg_game_id)} disabled={!canAddGameToShelf}>
              Add to shelf
            </Button>
            <Button variant='outline' onClick={handleOnClickCancel}>
              Cancel
            </Button>
          </DrawerFooter>
        )}
      </div>
    </DrawerContent>
  )
}

export default GameDetails
