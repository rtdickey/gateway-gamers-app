import React, { useEffect, useState } from "react"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "components/Select"
import useShelves from "hooks/useShelves"

interface ShelfSelectProps {
  shelfId?: string
  onValueChange?: (shelfId: string) => void
}

const ShelfSelect: React.FC<ShelfSelectProps> = ({ shelfId, onValueChange }) => {
  const { data: shelves } = useShelves()
  const [selectedShelf, setSelectedShelf] = useState<string | undefined>(shelfId)

  console.log(shelfId)
  const handleOnValueChange = (value: string) => {
    setSelectedShelf(value)
    if (!!onValueChange) {
      onValueChange(value)
    }
  }

  return (
    <Select onValueChange={handleOnValueChange} value={selectedShelf}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a shelf' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Shelves</SelectLabel>
          {shelves?.map(shelf => (
            <SelectItem key={shelf.id} value={shelf.id.toString()}>
              {shelf.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ShelfSelect
