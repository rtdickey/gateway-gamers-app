import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { XMLParser } from "fast-xml-parser"

import { BaseGame, Game } from "../types"

const convertResponseToJson = (response: any) => {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
  }
  const parser = new XMLParser(options)

  const responseJson = parser.parse(response)

  return responseJson
}

const mapItemsToGameArray = (items: any[]) => {
  const games: BaseGame[] = items.map(item => {
    return {
      id: "tempId",
      name: item.name?.value,
      year_published: item.yearpublished?.value ?? null,
      bgg_game_id: item.id ?? "",
    }
  })
  return games
}

const bggApi = createApi({
  reducerPath: "bggApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.geekdo.com/xmlapi2/" }),
  tagTypes: ["BGG_Games"],
  endpoints: builder => ({
    getBoardGameById: builder.query<Game, number>({
      query: bggGameId => ({
        url: `thing?id=${bggGameId}`,
        responseHandler: response => response.text(),
      }),
      transformResponse: (response: any) => {
        const responseJson = convertResponseToJson(response)
        const item = responseJson.items?.item

        return {
          id: "tempId",
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
    getBoardGameBySearch: builder.query<BaseGame[], string>({
      query: gameTitle => ({
        url: `search?query=${gameTitle}&type=boardgame`,
        responseHandler: response => response.text(),
      }),
      transformResponse: (response: any) => {
        const responseJson = convertResponseToJson(response)
        return mapItemsToGameArray(responseJson.items.item)
      },
      providesTags: ["BGG_Games"],
    }),
  }),
})

export const { useGetBoardGameByIdQuery, useGetBoardGameBySearchQuery } = bggApi
export { bggApi }
