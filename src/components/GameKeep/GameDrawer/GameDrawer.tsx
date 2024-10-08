import { useEffect, useState } from "react"

import { useMediaQuery } from "@react-hook/media-query"
import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/ui/Button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "components/ui/Dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "components/ui/Drawer"
import useSession from "hooks/Supabase/useSession"
import { useGetGamesByBggGameIdQuery } from "services/gamesApi"
import { useAddUserGameMutation } from "services/userGamesApi"

import ShelfSelect from "../ShelfSelect"

interface GameDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
  bggGameId: number | null
}

const GameDrawer: React.FC<GameDrawerProps> = ({ open, setOpen, bggGameId }) => {
  const { user } = useSession()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { data: game } = useGetGamesByBggGameIdQuery(bggGameId ?? skipToken)
  const [addUserGame] = useAddUserGameMutation()
  const [selectedShelfId, setSelectedShelfId] = useState<number | null>(null)

  const onShelfSelect = (shelfId: string) => {
    setSelectedShelfId(parseInt(shelfId))
  }

  useEffect(() => {
    if (selectedShelfId && game && user) {
      addUserGame({ gameId: game!.id, shelfId: selectedShelfId })
    }
  }, [selectedShelfId, game, user, addUserGame])

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          {!game ? (
            <DialogHeader>
              <DialogTitle>Game Details Not Found</DialogTitle>
              <DialogDescription>Where is it?</DialogDescription>
            </DialogHeader>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{game?.name}</DialogTitle>
                <DialogDescription>{game?.year_published}</DialogDescription>
              </DialogHeader>
              <div className='flex flex-row mb-2 gap-x-4'>
                {!!game.thumbnail && <img src={game.thumbnail} className='w-40 h-40' alt={game.name} />}
                <ul>
                  <li>Min Players: {game.min_players}</li>
                  <li>Max Players: {game.max_players}</li>
                  <li>Playing Time: {game.playing_time}m</li>
                  <li>Age: {game.age}+</li>
                </ul>
              </div>
              <ShelfSelect onValueChange={onShelfSelect} />
            </>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        {!game ? (
          <>
            <DrawerHeader className='text-left'>
              <DrawerTitle>Game Details Not Found</DrawerTitle>
              <DrawerDescription>Where is it?</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className='pt-2'>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DrawerFooter>
          </>
        ) : (
          <div className='flex justify-center'>
            <div className='flex flex-col gap-y-4'>
              <div>
                <DrawerHeader>
                  <DrawerTitle>{game?.name}</DrawerTitle>
                  <DrawerDescription>{game?.year_published}</DrawerDescription>
                </DrawerHeader>
                <div className='flex flex-col'>
                  <div className='flex flex-row gap-x-4'>
                    {!!game.thumbnail && <img src={game.thumbnail} className='w-40 h-40' alt={game.name} />}
                    <div className='flex flex-col gap-y-4'>
                      <ul className='ps-4'>
                        <li>Min Players: {game.min_players}</li>
                        <li>Max Players: {game.max_players}</li>
                        <li>Playing Time: {game.playing_time}m</li>
                        <li>Age: {game.age}+</li>
                      </ul>
                      <ShelfSelect onValueChange={onShelfSelect} />
                    </div>
                  </div>
                </div>
              </div>
              <DrawerFooter className='pt-2'>
                <Button variant='outline' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DrawerFooter>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default GameDrawer
