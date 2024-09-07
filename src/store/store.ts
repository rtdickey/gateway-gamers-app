import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist" // Add this import
import storage from "redux-persist/lib/storage"

import { bggApi, shelvesApi, usersApi, userGamesApi } from "services"

const rootReducer = combineReducers({
  [bggApi.reducerPath]: bggApi.reducer,
  [shelvesApi.reducerPath]: shelvesApi.reducer,
  [userGamesApi.reducerPath]: userGamesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
})

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(bggApi.middleware, shelvesApi.middleware, userGamesApi.middleware, usersApi.middleware),
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
