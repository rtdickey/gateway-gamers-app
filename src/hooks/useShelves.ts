import { useGetShelvesQuery } from "../services/shelvesApi"

const useShelves = () => {
  const shelves = useGetShelvesQuery()

  return { shelves }
}

export default useShelves
