import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    email: null,
    username: null,
    id: 0,
    token: '',
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetActiveUser: (state, action) => {
            state.isLogin = true
            state.email = action.payload.email
            state.username = action.payload.username
            state.id = action.payload.id
            state.token = action.payload.token
        },
        RemoveActiveUser: (state, action) => {
            state.isLogin = false
            state.email = null
            state.username = null
            state.id = 0
            state.token = ''
        },
    },
})

export const {SetActiveUser, RemoveActiveUser} = AuthSlice.actions

export default AuthSlice.reducer
