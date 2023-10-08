
import * as _DATA from '../_DATA'
import { createSlice } from '@reduxjs/toolkit'
import { updateCreatedQuestionQty } from './GlobalStateSlice'





const initialState = {
    value: {},
    valueItem : {}
}
const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers:{
        newSelectedQuestions: (state, action) => {
            state.valueItem = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase('GET_QUESTIONS', (state, action) => {
            state.value = action.payload
        })
        .addCase('SAVE_QUESTION_ANSWER', (state, action) =>{
            state.value = action.payload
        })
        .addCase('SAVE_QUESTION', (state, action)=>{
            state.value[action.payload.id] = action.payload
        })
     
    }

   
})

export const getQuestions = () =>async (dispatch) => {
    const data = await _DATA._getQuestions()
    dispatch({type: 'GET_QUESTIONS', payload: data})
}

export const saveQuestionAnswer = (authedUser, qid, answer) => async(dispatch) => {
    const data = await _DATA._saveQuestionAnswer({authedUser, qid, answer})
    dispatch({type: 'SAVE_QUESTION_ANSWER', payload: data})
}
export const saveQuestion = (question) => async(dispatch) => {
    const data = await _DATA._saveQuestion(question)
    dispatch({type: 'SAVE_QUESTION', payload: data})
    dispatch(updateCreatedQuestionQty({authorId: data.author,questionId: data.id}))
}




export const {newSelectedQuestions} = questionSlice.actions
export default questionSlice.reducer
