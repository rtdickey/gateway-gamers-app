import { createApi } from "@reduxjs/toolkit/query/react"

import { supabase } from "Supabase"
import { User } from "types"

import { supabaseBaseQuery } from "./supabaseBaseQuery"
import { PostgrestError } from "@supabase/supabase-js"

export interface UserRequest {
  userId: string
}

export interface UpsertUserRequest extends UserRequest {
  display_name: string
}

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: supabaseBaseQuery(),
  tagTypes: ["User"],
  endpoints: builder => ({
    getUserDetails: builder.query<User | null, UserRequest>({
      queryFn: async ({ userId }: UserRequest) => {
        if (!userId) {
          return { data: null }
        }

        const { data, error } = await supabase
          .from("Users")
          .select("id, display_name", {})
          .eq("id", userId)
          .limit(1)
          .single()

        if (error) {
          return { error }
        }

        return { data }
      },
      providesTags: ["User"],
    }),
    updateUserDetails: builder.mutation<PostgrestError | null, UpsertUserRequest>({
      queryFn: async (userDetails: UpsertUserRequest) => {
        const { data, error } = await supabase.from("Users").upsert(userDetails, {})
        if (error) {
          return { error }
        }

        return { data }
      },
      invalidatesTags: ["User"],
    }),
  }),
})

export const { useGetUserDetailsQuery, useUpdateUserDetailsMutation } = usersApi
export { usersApi }
