import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import Overview from "./Overview"

describe("Overview", () => {
  it("should render the component", () => {
    render(<Overview />)

    expect(screen.getByText("Why Board Game Keep?")).toBeInTheDocument()
  })
})
