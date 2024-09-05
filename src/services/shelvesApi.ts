import { createApi } from "@reduxjs/toolkit/query/react"

import { supabase } from "Supabase"
import { Shelf, Game, UserGame } from "types"

import { supabaseBaseQuery } from "./supabaseBaseQuery"

interface AddGameToShelfRequest {
  shelfId: number
  bggGameId: number
  userId: string
}

export interface AddGameDetailsRequest {
  name: string
  year_published: number | null
  min_players: number | null
  max_players: number | null
  playing_time: number | null
  age: number | null
  thumbnail: string | null
  image: string | null
  bgg_game_id: number
}

const shelvesApi = createApi({
  reducerPath: "shelvesApi",
  baseQuery: supabaseBaseQuery(),
  tagTypes: ["Shelf"],
  endpoints: builder => ({
    getShelves: builder.query<Shelf[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from("Shelves").select("id, name")

        if (error) {
          return { error }
        }

        return { data }
      },
      providesTags: ["Shelf"],
    }),
    addGameToShelf: builder.mutation<UserGame[], AddGameToShelfRequest>({
      queryFn: async ({ shelfId, bggGameId, userId }) => {
        const { data, error } = await supabase
          .from("UserGames")
          .insert({ shelf_id: shelfId, bgg_game_id: bggGameId, user_id: userId })
          .select("id, bgg_game_id, shelf_id")

        if (error) {
          return { error }
        }

        return { data }
      },
      invalidatesTags: ["Shelf"],
    }),
    addGameDetails: builder.mutation<Game[], AddGameDetailsRequest>({
      queryFn: async ({
        name,
        year_published,
        min_players,
        max_players,
        playing_time,
        age,
        thumbnail,
        image,
        bgg_game_id,
      }) => {
        const { data: record, error: selectError } = await supabase
          .from("Games")
          .select("*")
          .eq("bgg_game_id", bgg_game_id)

        if (selectError) {
          return { error: selectError }
        }

        if (record.length > 0) {
          return { data: record }
        }

        const { data, error } = await supabase
          .from("Games")
          .insert({ name, year_published, min_players, max_players, playing_time, age, thumbnail, image, bgg_game_id })
          .select()

        if (error) {
          return { error }
        }

        return { data }
      },
      invalidatesTags: ["Shelf"],
    }),
  }),
})

export const { useGetShelvesQuery, useAddGameToShelfMutation, useAddGameDetailsMutation } = shelvesApi
export { shelvesApi }
