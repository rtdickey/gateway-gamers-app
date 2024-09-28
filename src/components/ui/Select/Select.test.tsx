import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { Select, SelectGroup, SelectTrigger, SelectValue, SelectLabel, SelectContent, SelectItem } from "./Select"

describe("Select", () => {
  it("should render the component", () => {
    render(
      <Select onValueChange={() => jest.fn()} value={"1"}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select a shelf' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Test Options</SelectLabel>
            <SelectItem value='1'>Option 1</SelectItem>
            <SelectItem value='2'>Option 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    )

    const select = screen.getByRole("combobox")
    expect(select).toBeInTheDocument()
  })
})
