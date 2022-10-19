import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    students: [],
    student: {}
}

export const fetchStudentsAsync = createAsyncThunk("fetchStudentsAsync", async()=>{
    const { data } = await axios.get("api/students")
    return data
})

export const fetchSingleStudent = createAsyncThunk("fetchSingleStudent", async(stuId)=> {
    const { data } = await axios.get()
    return data
} )


export const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchStudentsAsync.fulfilled, (state, action)=>{
            console.log('DONE!')
            state.students = action.payload
            
        })
        builder.addCase(fetchStudentsAsync.pending, (state,action)=> {
            console.log("pending")
        })
    }
})
export const selectStudents = (state) => {
    return state.students;
  };

export default studentsSlice.reducer