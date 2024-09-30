import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import * as UseSession from "hooks/Supabase/useSession"
import * as router from "react-router"

import ProtectedRoute from "./ProtectedRoute"

describe("ProtectedRoute", () => {
  const navigate = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(UseSession, "useSession")
      .mockReturnValue({ session: null, user: undefined, handleSignOut: jest.fn(), isAuthenticated: false })
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate)
  })

  it("should render the component", async () => {
    render(
      <ProtectedRoute isAuthenticated={true}>
        <div>Protected Content</div>
      </ProtectedRoute>,
    )

    const protectedContent = screen.getByText("Protected Content")

    expect(protectedContent).toBeInTheDocument()
  })

  it('should redirect to "/Login" when user is not authenticated', async () => {
    render(
      <ProtectedRoute isAuthenticated={false}>
        <div>Protected Content</div>
      </ProtectedRoute>,
    )

    expect(navigate).toHaveBeenCalledWith("/Login")
  })
})
