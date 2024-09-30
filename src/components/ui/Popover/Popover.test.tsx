import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { Popover, PopoverContent, PopoverTrigger } from "./Popover"

describe("Popover", () => {
  it("should render the component", async () => {
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    )

    const user = userEvent.setup()

    const contentBefore = screen.queryByText("Content")
    expect(contentBefore).not.toBeInTheDocument()

    const trigger = screen.getByText("Trigger")
    expect(trigger).toBeInTheDocument()

    await user.click(trigger)

    const contentAfter = screen.getByText("Content")
    expect(contentAfter).toBeInTheDocument()
  })
})
