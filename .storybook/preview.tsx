import React from "react"

import type { Preview } from "@storybook/react"
import { MemoryRouter } from "react-router-dom"

import "tailwindcss/tailwind.css"
import "../src/gatewaygamers.css"

export const decorators = [
  Story => (
    <MemoryRouter initialEntries={["/"]}>
      <Story />
    </MemoryRouter>
  ),
]

const preview: Preview = {
  parameters: {
    decorators: decorators,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
