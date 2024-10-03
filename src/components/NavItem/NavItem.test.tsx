import { screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { MemoryRouter } from "react-router-dom"

import { renderWithProviders } from "utils/test-utils"
import NavItem from "./NavItem"

describe("NavItem", () => {
  it("should render the component", () => {
    renderWithProviders(
      <MemoryRouter>
        <NavItem title={"linkTitle"} path={"linkPath"} icon={undefined} showTitle={true} />
      </MemoryRouter>,
    )

    expect(screen.getByText("linkTitle")).toBeInTheDocument()
  })
})
