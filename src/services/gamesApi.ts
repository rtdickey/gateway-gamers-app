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

const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: supabaseBaseQuery(),
  tagTypes: ["Games"],
  endpoints: builder => ({
    getGamesByBggGameId: builder.query<Game[], number>({
      queryFn: async bggGameId => {
        const { data, error } = await supabase
          .from("Games")
          .select(
            "id, name, year_published, min_players, max_players, playing_time, age, thumbnail, image, bgg_game_id",
          )
          .eq("bgg_game_id", bggGameId)

        if (error) {
          return { error }
        }

        return { data }
      },
      providesTags: ["Games"],
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
          .insert({ name, year_published, min_players, max_players, playing_time, age, thumbnail, image, bgg_game_id })
          .select()

        if (error) {
          return { error }
        }

        return { data }
      },
      invalidatesTags: ["Games"],
    }),
  }),
})

export const { useGetGamesByBggGameIdQuery, useAddGameMutation } = gamesApi
export { gamesApi }
