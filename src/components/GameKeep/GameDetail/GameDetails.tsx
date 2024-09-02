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
          <DrawerTitle className='text-2xl'>{game.name}</DrawerTitle>
          <DrawerDescription>{gameDetails?.year_published}</DrawerDescription>
        </DrawerHeader>
        <div className='p-4 pb-0'>
          <div className='flex items-center justify-center space-x-2'>
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
