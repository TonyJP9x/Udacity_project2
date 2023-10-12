import { createSlice } from "@reduxjs/toolkit";
import * as _DATA from '../_DATA'

const initialState = {
    value: {},
    urlLocation: ''
};
const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        login: (state, action) => {
            state.value = action.payload

        },
        logout: (state) => {
            state.value = {}
        },
        updateAnswered: (state, action) =>{
            let arr = {...state.value.answers,[action.payload.id]:action.payload.selectedOption}
            state.value = {...state.value,answers: arr}
        },
        saveUrl: (state, action) => {
            state.urlLocation = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase("GET_USERS", (state, action) => {
            state.value = action.payload
            
        })

        
    }
})


export const getUsers = () =>async (dispatch) => {
    const data = await _DATA._getUsers()
    dispatch({type: 'GET_USERS', payload: data})
}


export const {login, logout, updateAnswered, saveUrl} = authSlice.actions
export default authSlice.reducer