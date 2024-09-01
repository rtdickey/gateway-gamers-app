import { createApi } from "@reduxjs/toolkit/query/react"

import { supabase } from "Supabase"
import { Shelf } from "types"

import { supabaseBaseQuery } from "./supabaseBaseQuery"

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
  }),
})

export const { useGetShelvesQuery } = shelvesApi
export { shelvesApi }
