import { configureStore } from "@reduxjs/toolkit";
import postTodoReducer from "./slices/postTodoSlice"
import projectListReducer from "./slices/projectListSlice"
export default configureStore({
    reducer:{
        postTodoSlice :postTodoReducer,
        projectListSlice: projectListReducer,
    }
})