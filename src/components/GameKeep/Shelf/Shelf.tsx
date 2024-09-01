import React from "react"

import { useParams } from "react-router-dom"

const Shelf: React.FC = () => {
  const { id: shelfId } = useParams()
  return <>{shelfId ? <div>Shelf {shelfId}</div> : <div>This is your game keep!</div>}</>
}

export default Shelf
