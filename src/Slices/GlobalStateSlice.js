import { createSlice ,current} from "@reduxjs/toolkit";
import * as _DATA from '../_DATA'



const initialState = {
    value: {}
};
const globalStateSlice = createSlice({
    name: 'globalState',
    initialState,
    reducers:{
      allQuestions: (state, action) => {
        state.value = action.payload
   
      },
      updateCreatedQuestionQty: (state, action) => {
        state.value[action.payload.authorId].questions.push(action.payload.questionId)
      },
      updateAnsweredQuantity: (state, action) => {
        let valueTemp = state.value;
        let user = valueTemp[action.payload.userId]
        let arr = {...user.answers,[action.payload.answeredId]:action.payload.selectedOption}
        state.value = {...state.value,[action.payload.userId]: {...user,answers:arr}}
      }

    },
    extraReducers: (builder) => {
        builder.addCase("GET_ALL_USERS", (state, action) => {
            state.value = action.payload
            
        })
        
    }
})


export const getAllUsers = () =>async (dispatch) => {
    const data = await _DATA._getUsers()
    dispatch({type: 'GET_ALL_USERS', payload: data})
}


export const {allQuestions, updateQuestions, updateAnsweredQuantity, updateCreatedQuestionQty} = globalStateSlice.actions
export default globalStateSlice.reducer