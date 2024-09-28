import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import * as UseSession from "hooks/Supabase/useSession"

import App from "./App"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "store"

describe("App", () => {
  beforeEach(() => {
    jest
      .spyOn(UseSession, "useSession")
      .mockReturnValue({ session: null, user: undefined, handleSignOut: jest.fn(), isAuthenticated: false })
  })

  it("should render the component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
    )

    const app = screen.getByTestId("app")
    expect(app).toBeInTheDocument()
  })
})
