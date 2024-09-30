import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import ProfileDetails from "./ProfileDetails"

describe("ProfileDetails", () => {
  it("should render the component", async () => {
    render(
      <ProfileDetails
        user={{
          id: "1",
          email: "test@gatewaygamers.com",
          display_name: "test name",
        }}
      />,
    )

    const profile = screen.getByText("Profile")
    const email = screen.getByText("Email: test@gatewaygamers.com")
    const displayName = screen.getByText("Name: test name")

    expect(profile).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(displayName).toBeInTheDocument()
  })
})
