import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import mapsReducer from './mapsSlice'
import itemsReducer from './itemsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        maps: mapsReducer,
        items: itemsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
