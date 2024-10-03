import { User } from "@supabase/supabase-js"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { renderWithProviders } from "utils/test-utils"
import EditProfileDetails from "./EditProfileDetails"

describe("EditProfileDetails", () => {
  it("should render the component", async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <EditProfileDetails
        user={
          {
            id: "1",
            email: "test@gatewaygamers.com",
          } as User
        }
      />,
    )

    expect(screen.getByText("Edit Profile Details")).toBeInTheDocument()
  })
})
