import { createSlice } from '@reduxjs/toolkit'


interface IUser {
    id: string,
    name: string,
    email: string,
    picture: string|null
}

const initialUserData:IUser = {
    id: '',
    name: '',
    email: '',
    picture: ''
}

export const slice = createSlice({
    name: 'user',
    initialState: {
        userData: initialUserData,
        isLogged: false
    },
    reducers: {
        changeUser(state, { payload }) {
            return { ...state, userData: { ...payload }, isLogged:true }
        },
        logout() {
            return { isLogged: false, userData: initialUserData }
        }
    }

})

export const { changeUser, logout } = slice.actions

export default slice.reducer
