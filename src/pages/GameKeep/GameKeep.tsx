import React from "react"

import { faDice, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { skipToken } from "@reduxjs/toolkit/query"
import { useNavigate } from "react-router-dom"

import Button from "components/Button"
import GameSearch from "components/GameKeep/GameSearch"
import Shelf from "components/GameKeep/Shelf"
import ShelfSelect from "components/GameKeep/ShelfSelect"
import useSession from "hooks/Supabase/useSession"
import useShelves from "hooks/useShelves"
import { useGetUserDetailsQuery } from "services/userApi"

const GameKeep: React.FC = () => {
  const navigate = useNavigate()
  const { session } = useSession()
  const user = session?.user

  const { data: userDetails } = useGetUserDetailsQuery(user ? { id: user.id } : skipToken)

  const [showGameSearch, setShowGameSearch] = React.useState<boolean>(false)
  const { data: shelves } = useShelves()
  const [selectedShelf, setSelectedShelf] = React.useState<string>(shelves?.[0].id.toString() ?? "")

  const handleSelectCallback = (value: string) => {
    setSelectedShelf(value)
  }

  const handleShowGameSearch = () => {
    setShowGameSearch(!showGameSearch)
  }

  const handleGoToProfile = () => {
    navigate("/Profile")
  }

  return (
    <>
      <div className='flex text-sm items-center gap-x-4 font-semibold'>
        <h1 className='text-2xl'>Board Game Keep</h1>
        {userDetails && (
          <div className='flex-1 items-center justify-between gap-x-4'>
            <Button variant='outline' size='sm' onClick={handleShowGameSearch}>
              <FontAwesomeIcon icon={showGameSearch ? faDice : faPlus} className='text-xl  fa-fw' />
            </Button>
          </div>
        )}
      </div>
      <hr className='border-1 border-accent mt-5 mb-5' />
      <div className='flex'>
        {!userDetails ? (
          <span>
            Finish updating your profile to start using Game Keep.
            <Button variant='link' onClick={handleGoToProfile}>
              Go to profile
            </Button>
          </span>
        ) : (
          <div className='flex-1 items-center gap-x-4'>
            <div className='flex-1'>
              {showGameSearch ? (
                <div>
                  <GameSearch />
                </div>
              ) : (
                <>
                  <div>
                    <div className='flex text-sm items-center gap-x-4 font-semibold mb-5'>
                      <label>Shelf: </label>
                      <ShelfSelect shelfId={selectedShelf} onSelect={handleSelectCallback} />
                    </div>
                    <Shelf shelfId={selectedShelf} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default GameKeep
