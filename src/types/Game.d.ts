export interface Game {
  id: string
  name: string
  year_published: number | null
  min_players: number | null
  max_players: number | null
  playing_time: number | null
  age: number | null
  thumbnail: string | null
  image: string | null
  bgg_game_id: number | null
}
