import React from "react"

interface ShelfProps {
  shelfId: string
}

const Shelf: React.FC<ShelfProps> = ({ shelfId }) => {
  return <>{shelfId ? <div>Shelf {shelfId}</div> : <div>This is your game keep!</div>}</>
}

export default Shelf
