import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "./Table"

describe("Table", () => {
  it("should render the component", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Col Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    const table = screen.getByRole("table")
    expect(table).toBeInTheDocument()
  })
})
