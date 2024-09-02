import { useGetShelvesQuery } from "../services/shelvesApi"

const useShelves = () => {
  const shelves = useGetShelvesQuery()
  return { data: shelves.data, isLoading: shelves.isLoading, error: shelves.error }
}

export default useShelves
