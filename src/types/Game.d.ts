export interface BaseGame {
  name: string
  year_published: number | null
}

export interface Game extends BaseGame {
  id: string
  min_players: number | null
  max_players: number | null
  playing_time: number | null
  age: number | null
  thumbnail: string | null
  image: string | null
}
