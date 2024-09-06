import React from "react"

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
  onSelect?: (shelfId: string) => void
}

const ShelfSelect: React.FC<ShelfSelectProps> = ({ onSelect }) => {
  const { data: shelves } = useShelves()
  return (
    <Select onValueChange={onSelect}>
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
