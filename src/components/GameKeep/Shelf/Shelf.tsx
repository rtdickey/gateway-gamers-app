import React from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import { useGetUserGamesQuery } from "services/userGamesApi"
import { Game } from "types"

interface ShelfProps {
  shelfId: string
}

const Shelf: React.FC<ShelfProps> = ({ shelfId }) => {
  const { data: games } = useGetUserGamesQuery(shelfId.length ? shelfId : skipToken)
  console.log("games: ", games)
  return (
    <div className='flex-1 flex-col'>
      {shelfId && games ? (
        <div>
          {games.map((game, index) => {
            console.log("game: ", JSON.stringify(game, null, 2))
            const gameInfo = game.Games as unknown as Game
            console.log("game: ", gameInfo)
            return (
              <div key={index} className='flex flex-row p-4 border rounded-md w-full'>
                <div className='p-3'>
                  {gameInfo?.thumbnail && <img src={gameInfo.thumbnail} alt={gameInfo?.name} className='h-20 m-auto' />}
                </div>
                <div className='p-3'>
                  <h2 className='font-semibold'>{gameInfo.name}</h2>
                  <ul>
                    {gameInfo?.min_players && (
                      <li className='text-sm'>
                        <span className='me-2'>Mininum Players:</span>
                        <span>{gameInfo.min_players}</span>
                      </li>
                    )}
                    {gameInfo?.max_players && (
                      <li>
                        <span className='font-semibold me-2'>Maximum Players:</span>
                        <span>{gameInfo.max_players}</span>
                      </li>
                    )}
                    {gameInfo?.playing_time && (
                      <li>
                        <span className='font-semibold me-2'>Playing Time:</span>
                        <span>{gameInfo.playing_time} minutes</span>
                      </li>
                    )}
                    {gameInfo?.age && (
                      <li>
                        <span className='font-semibold me-2'>Ages:</span>
                        <span>{gameInfo.age}+</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div>Your shelf is empty!</div>
      )}
    </div>
  )
}

export default Shelf
