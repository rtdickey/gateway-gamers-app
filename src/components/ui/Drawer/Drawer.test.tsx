import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "./Drawer"

describe("Drawer", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it("should render the component", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Trigger</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Content Title</DrawerTitle>
          <DrawerDescription>Content Description</DrawerDescription>
        </DrawerContent>
      </Drawer>,
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
    const contenDescriptiontAfter = screen.getByText("Content Title")

    expect(contentTitleAfter).toBeInTheDocument()
    expect(contenDescriptiontAfter).toBeInTheDocument()
  })
})
