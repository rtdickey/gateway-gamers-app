import React, { useCallback } from "react"

import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/Table"
import { useGetUserGamesQuery, useDeleteUserGameMutation } from "services/userGamesApi"
import { Game } from "types"

interface ShelfProps {
  shelfId: string
}

const Shelf: React.FC<ShelfProps> = ({ shelfId }) => {
  const { data: games } = useGetUserGamesQuery(shelfId.length ? shelfId : skipToken)
  const [deleteGameApi] = useDeleteUserGameMutation()

  const handleDelete = useCallback(
    async (gameId: string) => {
      if (window.confirm("Are you sure you want to delete this game?")) {
        await deleteGameApi({ gameId, shelfId: parseInt(shelfId) })
      }
    },
    [deleteGameApi, shelfId],
  )

  return (
    <div className='flex-1 flex-col'>
      {shelfId && games ? (
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>BGG ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Year Published</TableHead>
              <TableHead>Players</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Playing Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games?.map(game => {
              const gameInfo = game.Games as unknown as Game
              return (
                <TableRow key={gameInfo.bgg_game_id}>
                  <TableCell className='flex items-center justify-center'>
                    {gameInfo.thumbnail && (
                      <img
                        src={gameInfo.thumbnail}
                        alt={gameInfo.name}
                        className='rounded-md min-w-20 min-h-20'
                        height={80}
                        width={80}
                      />
                    )}
                  </TableCell>
                  <TableCell>{gameInfo.bgg_game_id}</TableCell>
                  <TableCell>{gameInfo.name}</TableCell>
                  <TableCell>{gameInfo.year_published}</TableCell>
                  <TableCell>
                    {gameInfo.min_players}-{gameInfo.max_players}
                  </TableCell>
                  <TableCell>{gameInfo.age}+</TableCell>
                  <TableCell>{gameInfo.playing_time}m</TableCell>
                  <TableCell>
                    <Button variant='destructive' onClick={() => handleDelete(game.game_id)}>
                      <FontAwesomeIcon icon={faTrash} size='sm' />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <div>Your shelf is empty!</div>
      )}
    </div>
  )
}

export default Shelf
