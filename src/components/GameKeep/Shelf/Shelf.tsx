import React from "react"

interface ShelfProps {
  shelfId: string
  className?: string
}

const Shelf: React.FC<ShelfProps> = ({ shelfId, className = "" }) => {
  return <div className={className}>{shelfId ? <div>Shelf {shelfId}</div> : <div>Your shelf is empty!</div>}</div>
}

export default Shelf
