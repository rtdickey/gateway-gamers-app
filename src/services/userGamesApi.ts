import { createApi } from "@reduxjs/toolkit/query/react"
import { PostgrestError } from "@supabase/supabase-js"

import { supabase } from "Supabase"
import { UserGame } from "types"

import { supabaseBaseQuery } from "./supabaseBaseQuery"

interface AddUserGameRequest {
  gameId: string
  shelfId: number
}

interface DeleteUserGameRequest {
  gameId: string
  shelfId: number
}

const userGamesApi = createApi({
  reducerPath: "userGamesApi",
  baseQuery: supabaseBaseQuery(),
  tagTypes: ["UserGames"],
  endpoints: builder => ({
    getAllUserGames: builder.query<UserGame[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("UserGames")
          .select(
            "id, game_id, Games (id, name, year_published, age, playing_time, min_players, max_players, bgg_game_id, thumbnail, image)",
          )

        if (error) {
          return { error }
        }

        return { data }
      },
      providesTags: ["UserGames"],
    }),
    getUserGames: builder.query<UserGame[], string>({
      queryFn: async shelfId => {
        const { data, error } = await supabase
          .from("UserGames")
          .select(
            "game_id, Games (id, name, year_published, age, playing_time, min_players, max_players, bgg_game_id, thumbnail, image)",
          )
          .eq("shelf_id", shelfId)

        if (error) {
          return { error }
        }

        return { data }
      },
      providesTags: ["UserGames"],
    }),
    addUserGame: builder.mutation<PostgrestError | null, AddUserGameRequest>({
      queryFn: async ({ gameId, shelfId }) => {
        const { data, error } = await supabase.from("UserGames").upsert({ shelf_id: shelfId, game_id: gameId })

        if (error) {
          return { error }
        }

        return { data }
      },
      invalidatesTags: ["UserGames"],
    }),
    deleteUserGame: builder.mutation<PostgrestError | null, DeleteUserGameRequest>({
      queryFn: async ({ gameId, shelfId }) => {
        const { data, error } = await supabase.from("UserGames").delete().eq("game_id", gameId).eq("shelf_id", shelfId)

        if (error) {
          return { error }
        }

        return { data }
      },
      invalidatesTags: ["UserGames"],
    }),
  }),
})

export const { useGetAllUserGamesQuery, useGetUserGamesQuery, useAddUserGameMutation, useDeleteUserGameMutation } =
  userGamesApi
export { userGamesApi }
