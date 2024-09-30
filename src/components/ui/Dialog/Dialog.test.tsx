import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./Dialog"

describe("Dialog", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it("should render the component", async () => {
    render(
      <Dialog>
        <DialogTrigger>Trigger</DialogTrigger>
        <DialogContent>
          <DialogTitle>Content Title</DialogTitle>
          <DialogDescription>Content Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    )

    const user = userEvent.setup()

    const contentTitleBefore = screen.queryByText("Content Title")
    const contentDescriptionBefore = screen.queryByText("Content Description")

    expect(contentTitleBefore).not.toBeInTheDocument()
    expect(contentDescriptionBefore).not.toBeInTheDocument()

    const trigger = screen.getByText("Trigger")
    expect(trigger).toBeInTheDocument()

    await user.click(trigger)

    const contentTitleAfter = screen.getByText("Content Title")
    const contentDescriptionAfter = screen.getByText("Content Description")

    expect(contentTitleAfter).toBeInTheDocument()
    expect(contentDescriptionAfter).toBeInTheDocument()
  })
})
