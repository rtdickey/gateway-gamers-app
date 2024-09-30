import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"

import Button from "./Button"

describe("Button", () => {
  it("should render the component", async () => {
    render(<Button>Test</Button>)
    const button = screen.getByRole("button", { name: "Test" })

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent("Test")
  })
})
