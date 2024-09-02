import { createApi } from "@reduxjs/toolkit/query/react"

import { supabase } from "Supabase"
import { User } from "types"

import { supabaseBaseQuery } from "./supabaseBaseQuery"

export interface UserRequest {
  userId: string | null
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
          .select("id, full_name", {})
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
  }),
})

export const { useGetUserDetailsQuery } = usersApi
export { usersApi }
