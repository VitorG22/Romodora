import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import mapsReducer from './mapsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        maps: mapsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
