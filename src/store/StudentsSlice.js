import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    students: [],
    student: {},
    loading: true
}

export const fetchStudentsAsync = createAsyncThunk("fetchStudentsAsync", async()=>{
    const { data } = await axios.get("api/students")
    return data
})

export const fetchSingleStudent = createAsyncThunk("fetchSingleStudent", async (stuId)=> {
    const { data } = await axios.get(`/api/students/${stuId}`)
    console.log("fetchSingleStudent firing", data)
    return data
} )


export const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchStudentsAsync.fulfilled, (state, action)=>{
            console.log('DONE!')
            state.loading = false
            state.students = action.payload
        })
        builder.addCase(fetchStudentsAsync.pending, (state,action)=> {
            console.log("pending")
            state.loading = true
        })
        builder.addCase(fetchSingleStudent.fulfilled, (state, action)=>{
            console.log("done!")
            state.loading = false
            state.student = action.payload
        })
        builder.addCase(fetchSingleStudent.pending, (state, action)=> {
            console.log("pending")
            state.loading = true
        })
    }
})
export const selectStudents = (state) => {
    return state.students;
  };

export const selectStudent = (state) => {
    return state.students.student;
}

export default studentsSlice.reducer