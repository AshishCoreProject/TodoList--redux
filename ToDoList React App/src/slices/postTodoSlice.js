import { createSlice } from "@reduxjs/toolkit";

const postTodoSlice = createSlice({
    name:"postTodoSlice",
    initialState: {
        tasks: [],
        isAddTask:false,
        searchString:"",
    },
    reducers:{
        handleAddTask:(state,action) => {
            state.tasks.push(action.payload.newTask);
        },
        setIsAddTask: (state,action) => {
            state.isAddTask = action.payload;
        },
        handleSearchString:(state,action)=> {
            state.searchString = action.payload;
        },
        handleDeleteTask:(state,action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
        },
        handleEditTask:(state,action) => {
            const newListItem = state.tasks.map((item) => {
                if (item.id === action.payload.myId) {
                  const updatedItem = {
                    ...item,
                    title: action.payload.myTitle,
                    description: action.payload.myDescription,
                    priority: action.payload.myPriority,
                    dueDate: action.payload.myDueDate,
                    dueMonth: action.payload.myDueMonth,
                  };
                  return updatedItem;
                }
                return item;
              });
           state.tasks = newListItem;
        },
        handleSortingList: (state,action) => {
            state.tasks = action.payload.items;
        }
    }
})
export const tasks = (state) => state.postTodoSlice.tasks;
export const isAddTask = (state) => state.postTodoSlice.isAddTask;
export const searchString = (state) => state.postTodoSlice.searchString;

export const {handleAddTask, setIsAddTask, handleDeleteTask, handleEditTask, handleSearchString, handleSortingList} = postTodoSlice.actions; 

export default postTodoSlice.reducer;