import React, { useMemo } from "react"

import { Session } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"

import Combobox, { ComboboxOptions } from "components/Combobox"
import Shelf from "components/GameKeep/Shelf"
import useShelves from "hooks/useShelves"

interface GameKeepProps {
  session: Session | null
}

const GameKeep: React.FC<GameKeepProps> = ({ session }) => {
  const { shelves } = useShelves()
  const navigate = useNavigate()

  const shelfOptions = useMemo(() => {
    if (!!shelves.data) {
      return shelves.data?.map(shelf => {
        return {
          value: shelf.id.toString(),
          label: shelf.name,
        } as ComboboxOptions
      })
    }

    return []
  }, [shelves.data])

  const handleSelectCallback = (value: string) => {
    navigate(`/GameKeep/Shelf/${value}`)
  }

  return (
    <>
      {shelves.data && !shelves.error && (
        <div className='mt-5'>
          <Combobox options={shelfOptions} label='Select a shelf' handleSelectCallback={handleSelectCallback} />
          <Shelf />
        </div>
      )}
    </>
  )
}

export default GameKeep
