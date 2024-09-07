import { createApi } from "@reduxjs/toolkit/query/react"

import { supabase } from "Supabase"
import { UserGame } from "types"

import { supabaseBaseQuery } from "./supabaseBaseQuery"

interface AddUserGameRequest {
  gameId: string
  shelfId: number
  userId: string
}

const userGamesApi = createApi({
  reducerPath: "userGamesApi",
  baseQuery: supabaseBaseQuery(),
  tagTypes: ["UserGames"],
  endpoints: builder => ({
    getAllUserGames: builder.query<UserGame[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from("UserGames").select("id, game_id, shelf_id")

        if (error) {
          return { error }
        }

        return { data }
      },
      providesTags: ["UserGames"],
    }),
    getUserGames: builder.query<UserGame[], string>({
      queryFn: async shelfId => {
        const { data, error } = await supabase.from("UserGames").select("id, game_id, shelf_id").eq("shelf_id", shelfId)

        if (error) {
          return { error }
        }

        return { data }
      },
      providesTags: ["UserGames"],
    }),
    addUserGame: builder.mutation<UserGame[], AddUserGameRequest>({
      queryFn: async ({ gameId, shelfId, userId }) => {
        const { data, error } = await supabase
          .from("UserGames")
          .insert({ shelf_id: shelfId, game_id: gameId, user_id: userId })
          .select("id, game_id, shelf_id")

        if (error) {
          return { error }
        }

        return { data }
      },
      invalidatesTags: ["UserGames"],
    }),
  }),
})

export const { useGetAllUserGamesQuery, useGetUserGamesQuery, useAddUserGameMutation } = userGamesApi
export { userGamesApi }
