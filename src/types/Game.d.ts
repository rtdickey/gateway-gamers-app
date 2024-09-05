export interface BaseGame {
  name: string
  year_published: number | null
  bgg_game_id: number
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

export interface UserGame {
  id: string
  bgg_game_id: number
  shelf_id: number
}
