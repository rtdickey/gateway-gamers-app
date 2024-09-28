import React, { useMemo, useState } from "react"

import Button from "components/ui/Button"
import { DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "components/ui/Drawer"
import useSession from "hooks/Supabase/useSession"
import { useAddUserGameMutation } from "services/userGamesApi"
import { Game } from "types"

import ShelfSelect from "../ShelfSelect"

interface GameProps {
  game: Game | null
  handleOnClickCancel: () => void
}

const GameDetails: React.FC<GameProps> = ({ game, handleOnClickCancel }) => {
  const { isAuthenticated } = useSession()
  const [addGameToShelf] = useAddUserGameMutation()
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null)

  const canAddGameToShelf = useMemo(() => {
    return isAuthenticated && !!selectedShelf
  }, [isAuthenticated, selectedShelf])

  const handleOnShelfSelect = (shelfId: string) => {
    setSelectedShelf(shelfId)
  }

  const handleAddGameToShelf = () => {
    if (!!selectedShelf && game?.id) {
      addGameToShelf({ shelfId: parseInt(selectedShelf), gameId: game?.id ?? "" })
      handleOnClickCancel()
    }
  }

  return (
    <DrawerContent>
      <div className='mx-auto w-full max-w-sm'>
        <DrawerHeader>
          <DrawerTitle className='text-2xl'>
            {game ? (
              <>
                {game?.image && <img src={game.image} alt={game?.name} className='h-48 m-auto' />}
                <div className='mt-2'>{game.name}</div>
              </>
            ) : (
              <span>Error</span>
            )}
          </DrawerTitle>
          <DrawerDescription>{game?.year_published}</DrawerDescription>
        </DrawerHeader>
        {game ? (
          <div className='p-4 pb-0'>
            <div className='flex flex-col space-x-2'>
              <ul>
                {game?.min_players && (
                  <li>
                    <span className='font-semibold me-2'>Mininum Players:</span>
                    <span>{game.min_players}</span>
                  </li>
                )}
                {game?.max_players && (
                  <li>
                    <span className='font-semibold me-2'>Maximum Players:</span>
                    <span>{game.max_players}</span>
                  </li>
                )}
                {game?.playing_time && (
                  <li>
                    <span className='font-semibold me-2'>Playing Time:</span>
                    <span>{game.playing_time} minutes</span>
                  </li>
                )}
                {game?.age && (
                  <li>
                    <span className='font-semibold me-2'>Ages:</span>
                    <span>{game.age}+</span>
                  </li>
                )}
              </ul>
            </div>
            <div className='flex justify-center mt-5 mb-3'>
              <ShelfSelect onValueChange={handleOnShelfSelect} />
            </div>
          </div>
        ) : (
          <div className='text-center'>There was an issue retrieving game details.</div>
        )}
        <DrawerFooter className='grid grid-cols-2 gap-4 justify-between'>
          {game && (
            <>
              <Button onClick={handleAddGameToShelf} disabled={!canAddGameToShelf}>
                Add to shelf
              </Button>
              <Button variant='outline' onClick={handleOnClickCancel}>
                Cancel
              </Button>
            </>
          )}
        </DrawerFooter>
      </div>
    </DrawerContent>
  )
}

export default GameDetails
