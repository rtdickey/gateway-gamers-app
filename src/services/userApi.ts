import { createApi } from "@reduxjs/toolkit/query/react"
import { PostgrestError } from "@supabase/supabase-js"

import { supabase } from "Supabase"
import { User } from "types"

import { supabaseBaseQuery } from "./supabaseBaseQuery"

export interface UserRequest {
  id: string
}

export interface UpsertUserRequest extends UserRequest {
  email: string
  display_name: string
}

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: supabaseBaseQuery(),
  tagTypes: ["User"],
  endpoints: builder => ({
    getUserDetails: builder.query<User | null, UserRequest>({
      queryFn: async ({ id }: UserRequest) => {
        if (!id) {
          return { data: null }
        }

        const { data, error } = await supabase
          .from("Users")
          .select("id, display_name, email", {})
          .eq("id", id)
          .limit(1)
          .maybeSingle()

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
