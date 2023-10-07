import { configureStore } from "@reduxjs/toolkit";
import authSlice from './Slices/AuthSlice'
import thunk from "redux-thunk";
import questionSlice from "./Slices/QuestionSlice";
import globalStateSlice from "./Slices/GlobalStateSlice";



const rootReducer = {
    login: authSlice,
    question: questionSlice,
    globalState: globalStateSlice
}

const store = configureStore({
    reducer: rootReducer,

});

export default store;