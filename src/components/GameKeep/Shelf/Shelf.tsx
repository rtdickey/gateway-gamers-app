import React, { useCallback } from "react"

import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/Table"
import { useGetUserGamesQuery, useDeleteUserGameMutation, useUpdateUserGameMutation } from "services/userGamesApi"
import { Game } from "types"

import ShelfSelect from "../ShelfSelect"

interface ShelfProps {
  shelfId?: string
}

const Shelf: React.FC<ShelfProps> = ({ shelfId }) => {
  const { data: games } = useGetUserGamesQuery(shelfId ? shelfId : skipToken)
  const [deleteUserGameApi] = useDeleteUserGameMutation()
  const [updateUserGameApi] = useUpdateUserGameMutation()

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this game?")) {
        await deleteUserGameApi({ id })
      }
    },
    [deleteUserGameApi],
  )

  const handleUpdateShelf = useCallback(
    async (id: string, newShelfId: string) => {
      await updateUserGameApi({ id, shelfId: parseInt(newShelfId) })
    },
    [updateUserGameApi],
  )

  const handleOnValueChange = (newShelfId: string, id?: string) => {
    if (!!id) {
      console.log("id", id)
      handleUpdateShelf(id, newShelfId)
    }
  }

  return (
    <div className='flex-1 flex-col'>
      {shelfId && games ? (
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead className='sticky left-0 bg-white'></TableHead>
              <TableHead className='sticky left-0 bg-white'>Name</TableHead>
              <TableHead>Year Published</TableHead>
              <TableHead>Players</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Playing Time</TableHead>
              <TableHead>Shelf</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games?.map(game => {
              const gameInfo = game.Games as unknown as Game
              return (
                <TableRow key={gameInfo.bgg_game_id}>
                  <TableCell className='sticky left-0 bg-white'>
                    {gameInfo.thumbnail && (
                      <div className='flex items-center justify-center'>
                        <img
                          src={gameInfo.thumbnail}
                          alt={gameInfo.name}
                          className='rounded-md min-w-20 min-h-20'
                          height={80}
                          width={80}
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className='sticky left-0 bg-white'>{gameInfo.name}</TableCell>
                  <TableCell>{gameInfo.year_published}</TableCell>
                  <TableCell>
                    {gameInfo.min_players}-{gameInfo.max_players}
                  </TableCell>
                  <TableCell>{gameInfo.age}+</TableCell>
                  <TableCell>{gameInfo.playing_time}m</TableCell>
                  <TableCell>
                    <ShelfSelect shelfId={shelfId} onValueChange={handleOnValueChange} userGameId={game.id} />
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center gap-x-4'>
                      <a
                        href={`https://boardgamegeek.com/boardgame/${gameInfo.bgg_game_id}`}
                        className='font-semibold text-primary'
                        target='_blank'
                        rel='noreferrer'
                      >
                        BGG
                      </a>
                      <Button variant='destructive' onClick={() => handleDelete(game.id)} size='sm'>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
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
