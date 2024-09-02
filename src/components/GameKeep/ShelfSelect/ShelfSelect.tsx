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

const ShelfSelect: React.FC = () => {
  const { data: shelves } = useShelves()
  return (
    <Select>
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
