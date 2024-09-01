import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { Game } from "../types"

const bggApi = createApi({
  reducerPath: "bggApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.boardgamegeek.com/xmlapi2/" }),
  tagTypes: ["BGG_Games"],
  endpoints: builder => ({
    getBoardGame: builder.query<Game, string>({
      query: bggGameId => `thing?id=${bggGameId}`,
      transformResponse: (response: string) => {
        const parser = new DOMParser()
        const xml = parser.parseFromString(response, "application/xml")
        const item = xml.querySelector("item")

        if (!item) {
          throw new Error("Board game not found")
        }

        return {
          id: item.getAttribute("id") || "",
          name: item.querySelector("name")?.getAttribute("value") || "",
          year_published: Number(item.querySelector("yearpublished")?.getAttribute("value") || null),
          min_players: Number(item.querySelector("minplayers")?.getAttribute("value") || null),
          max_players: Number(item.querySelector("maxplayers")?.getAttribute("value") || null),
          playing_time: Number(item.querySelector("playingtime")?.getAttribute("value") || null),
          age: Number(item.querySelector("age")?.getAttribute("value") || null),
          thumbnail: item.querySelector("thumbnail")?.textContent || null,
          image: item.querySelector("image")?.textContent || null,
          bgg_game_id: Number(item.getAttribute("id") || null),
        }
      },
      providesTags: ["BGG_Games"],
    }),
  }),
})

export const { useGetBoardGameQuery } = bggApi
export { bggApi }
