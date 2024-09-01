import React from "react"

import { useParams } from "react-router-dom"

const Shelf = () => {
  const { id: shelfId } = useParams()

  return <div>Shelf {shelfId}</div>
}

export default Shelf
