import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    students: [],
    student: {},
    studentCampusId: 0,
    loading: true
}

export const fetchStudentsAsync = createAsyncThunk("fetchStudentsAsync", async()=>{
    try{
    const { data } = await axios.get("api/students")
    return data
    } catch(err) {
        console.log(err)
    }
})

export const fetchSingleStudent = createAsyncThunk("fetchSingleStudent", async (stuId)=> {
    const { data } = await axios.get(`/api/students/${stuId}`)
    //console.log("fetchSingleStudent firing", data)
    return data
} )



export const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchStudentsAsync.fulfilled, (state, action)=>{
            //console.log('Students aqquired!')
            state.loading = false
            state.students = action.payload
        })
        builder.addCase(fetchStudentsAsync.pending, (state,action)=> {
            //console.log("Students pending")
            state.loading = true
        })
        builder.addCase(fetchSingleStudent.fulfilled, (state, action)=>{
            console.log("Student aqquired!")
            state.loading = false
            state.student = action.payload
            state.studentCampusId = state.students.CampusId
            
        })
        builder.addCase(fetchSingleStudent.pending, (state, action)=> {
            //console.log("Student pending")
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
export const stuIsLoading = (state) => {
    return state.students.loading
}

export default studentsSlice.reducer