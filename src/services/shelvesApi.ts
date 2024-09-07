import { createApi } from "@reduxjs/toolkit/query/react"

import { supabase } from "Supabase"
import { Shelf, Game } from "types"

import { supabaseBaseQuery } from "./supabaseBaseQuery"

export interface AddGameRequest {
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
    addGame: builder.mutation<Game[], AddGameRequest>({
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
        const { data, error } = await supabase
          .from("Games")
          .upsert({ name, year_published, min_players, max_players, playing_time, age, thumbnail, image, bgg_game_id })
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

export const { useGetShelvesQuery, useAddGameMutation } = shelvesApi
export { shelvesApi }
