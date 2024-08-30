import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import Button from "./Button"

export const ActionsData = {
  onClick: fn(),
}

const meta: Meta<typeof Button> = {
  component: Button,
  title: "components/Button",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
}

export default meta
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Default Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
}
