import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { XMLParser } from "fast-xml-parser"

import { Game } from "../types"

const bggApi = createApi({
  reducerPath: "bggApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.geekdo.com/xmlapi2/" }),
  tagTypes: ["BGG_Games"],
  endpoints: builder => ({
    getBoardGame: builder.query<Game, string>({
      query: bggGameId => ({
        url: `thing?id=${bggGameId}`,
        responseHandler: response => response.text(),
      }),
      transformResponse: (response: any) => {
        const options = {
          ignoreAttributes: false,
          attributeNamePrefix: "",
        }
        const parser = new XMLParser(options)

        const responseJson = parser.parse(response)
        const item = responseJson.items?.item

        return {
          id: "bgg_lookup",
          name: item?.name.value ?? "",
          year_published: item?.yearpublished.value ?? null,
          min_players: item?.minplayers.value ?? null,
          max_players: item?.maxplayers.value ?? null,
          playing_time: item?.playingtime.value ?? null,
          age: item?.minage.value ?? null,
          thumbnail: item.thumbnail ?? null,
          image: item.image ?? null,
          bgg_game_id: item.id ?? "",
        }
      },
      providesTags: ["BGG_Games"],
    }),
  }),
})

export const { useGetBoardGameQuery } = bggApi
export { bggApi }
