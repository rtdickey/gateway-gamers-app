import React from "react"

import { Check, ChevronsUpDown } from "lucide-react"

import Button from "components/Button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "components/Command"
import { Popover, PopoverContent, PopoverTrigger } from "components/Popover"
import { cn } from "lib/utils"

export interface ComboboxOptions {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOptions[]
  label?: string
  allowSearch?: boolean
  handleSelectCallback: (value: string) => void
  selectedOption?: string
}

const Combobox: React.FC<ComboboxProps> = ({
  label = "Select option",
  options,
  selectedOption,
  allowSearch = false,
  handleSelectCallback,
}) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedOption ?? "")

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
    handleSelectCallback(currentValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
          {value ? options.find(option => option.value === value)?.label : label}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          {allowSearch && <CommandInput placeholder='Search option...' />}
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem key={option.value} value={option.value} onSelect={handleSelect}>
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Combobox
