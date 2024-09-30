import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { Input } from "./Input"

describe("Input", () => {
  it("should render the component", async () => {
    render(<Input />)

    const user = userEvent.setup()
    const input = screen.getByRole("textbox")

    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("")

    await user.type(input, "test")

    expect(input).toHaveValue("test")
  })
})
