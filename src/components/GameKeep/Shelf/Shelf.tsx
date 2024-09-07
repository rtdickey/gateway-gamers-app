import React from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import { useGetUserGamesQuery } from "services/userGamesApi"

interface ShelfProps {
  shelfId: string
  className?: string
}

const Shelf: React.FC<ShelfProps> = ({ shelfId, className = "" }) => {
  const { data: games } = useGetUserGamesQuery(shelfId.length ? shelfId : skipToken)

  return (
    <div className={className}>
      {shelfId && games ? (
        <ul>
          {games.map((item, index) => {
            return <li key={index}>{item.game_id}</li>
          })}
        </ul>
      ) : (
        <div>Your shelf is empty!</div>
      )}
    </div>
  )
}

export default Shelf
