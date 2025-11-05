import { createSlice } from '@reduxjs/toolkit'
import type { ITableMap } from '../pages/maps/editMap/mapsClass'

const initialMapState:ITableMap[] = []

export const slice = createSlice({
    name: 'maps',
    initialState: initialMapState,
    reducers: {
        changeMapsList(state, { payload }) {
            state = state
            return payload
        }
    }

})

export const { changeMapsList } = slice.actions

export default slice.reducer
