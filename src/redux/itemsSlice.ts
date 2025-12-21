import { createSlice } from '@reduxjs/toolkit'
import type { TItems } from '../pages/items/itemsClass'

const initialItemsState:Array<TItems> = []

export const slice = createSlice({
    name: 'items',
    initialState: initialItemsState,
    reducers: {
        changeItemsList(state, { payload }) {
            state = state
            return payload
        }
    }

})

export const { changeItemsList } = slice.actions

export default slice.reducer
