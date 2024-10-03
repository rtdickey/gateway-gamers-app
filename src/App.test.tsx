import { render, screen } from "@testing-library/react"
import { renderWithProviders } from "utils/test-utils"
import "@testing-library/jest-dom"

import * as UseSession from "hooks/Supabase/useSession"

import App from "./App"
import { MemoryRouter } from "react-router-dom"
import { setupStore } from "store/store"

describe("App", () => {
  beforeEach(() => {
    jest
      .spyOn(UseSession, "useSession")
      .mockReturnValue({ session: null, user: undefined, handleSignOut: jest.fn(), isAuthenticated: false })
  })

  it("should render the component", () => {
    const store = setupStore()

    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { preloadedState: store.getState() },
    )

    const app = screen.getByTestId("app")
    expect(app).toBeInTheDocument()
  })
})
