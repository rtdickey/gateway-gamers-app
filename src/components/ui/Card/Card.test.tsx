import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card"

describe("Card", () => {
  it("should render the component", async () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>,
    )

    const cardTitle = screen.getByText("Card Title")
    const cardContent = screen.getByText("Card Content")
    const cardFooter = screen.getByText("Card Footer")

    expect(cardTitle).toBeInTheDocument()
    expect(cardContent).toBeInTheDocument()
    expect(cardFooter).toBeInTheDocument()
  })
})
