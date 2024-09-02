import React from "react"

import Button from "components/Button"
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "components/Drawer"
import { useGetBoardGameByIdQuery } from "services/bggApi"
import { BaseGame } from "types"

import ShelfSelect from "../ShelfSelect"

interface GameDetailsProps {
  game: BaseGame
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  // const [selectedShelf, setSelectedShelf] = useState<number | null>(null)
  const { data: gameDetails } = useGetBoardGameByIdQuery(game.bgg_game_id)

  //   const handleAddToShelf = (bggGameId: string) => {
  //     alert(`add to shelf '${selectedShelf}', the game id is '${bggGameId}' for user '${session?.user?.id}'`)
  //   }

  return (
    <DrawerContent>
      <div className='mx-auto w-full max-w-sm'>
        <DrawerHeader>
          <DrawerTitle className='text-2xl'>
            {gameDetails?.image && <img src={gameDetails.image} alt={game.name} className='h-48 m-auto' />}
            <div className='mt-2'>{game.name}</div>
          </DrawerTitle>
          <DrawerDescription>{gameDetails?.year_published}</DrawerDescription>
        </DrawerHeader>
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
            <ShelfSelect />
          </div>
        </div>
        <DrawerFooter className='grid grid-cols-2 gap-4 justify-between'>
          <Button>Add to shelf</Button>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  )
}

export default GameDetails
