import { useMediaQuery } from "@react-hook/media-query"
import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "components/Dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "components/Drawer"
import { useGetGamesByBggGameIdQuery } from "services/gamesApi"

interface GameDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
  bggGameId: number | null
}

const GameDrawer: React.FC<GameDrawerProps> = ({ open, setOpen, bggGameId }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { data: game } = useGetGamesByBggGameIdQuery(bggGameId ?? skipToken)

  if (isDesktop) {
    return (
      <>
        {!game ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Game Details Not Found</DialogTitle>
                <DialogDescription>Where is it?</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>{game?.name}</DialogTitle>
                <DialogDescription>{game?.year_published}</DialogDescription>
              </DialogHeader>
              {!!game.thumbnail && <img src={game.thumbnail} className='w-40 h-40' alt={game.name} />}
            </DialogContent>
          </Dialog>
        )}
      </>
    )
  }

  return (
    <>
      {!game ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className='text-left'>
              <DrawerTitle>Game Details Not Found</DrawerTitle>
              <DrawerDescription>Where is it?</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className='pt-2'>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className='text-left'>
              <DrawerTitle>{game?.name}</DrawerTitle>
              <DrawerDescription>{game?.year_published}</DrawerDescription>
            </DrawerHeader>
            {!!game.thumbnail && <img src={game.thumbnail} className='w-40 h-40' alt={game.name} />}
            <DrawerFooter className='pt-2'>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}

export default GameDrawer
