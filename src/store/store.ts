import { configureStore } from "@reduxjs/toolkit"

import { shelvesApi } from "services"

const store = configureStore({
  reducer: {
    [shelvesApi.reducerPath]: shelvesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(shelvesApi.middleware),
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
