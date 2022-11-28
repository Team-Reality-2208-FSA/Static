import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialState = {
    students: [],
    student: {},
    studentCampusId: 0,
    loading: true
}
// thunks for handling AJAX requests
export const fetchStudentsAsync = createAsyncThunk("fetchStudentsAsync", async () => {
    const { data } = await axios.get("api/students")
    return data
})
export const fetchSingleStudent = createAsyncThunk("fetchSingleStudent", async (stuId) => {
    const { data } = await axios.get(`/api/students/${stuId}`)
    return data
})
export const postStudent = createAsyncThunk("postStudent", async (sub) => {
    const { data } = await axios.post('/api/students', sub)
    return data
})
export const deleteStudent = createAsyncThunk("deleteStudent", async (id) => {
    const { data } = await axios.get(`/api/students/${id}`)
    await axios.delete(`/api/students/${id}`)
    return data
})
export const updateStudent = createAsyncThunk("updateStudent", async (sub) => {
    console.log("sub:", sub)
    const { data } = await axios.put(`/api/students/update/${sub.stuId}`, sub)
    return data
})
// student slice and reducers for setting state
export const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStudentsAsync.fulfilled, (state, action) => {
            //console.log('Students aqquired!')
            state.loading = false
            state.students = action.payload
        })
        builder.addCase(fetchStudentsAsync.pending, (state, action) => {
            //console.log("Students pending")
            state.loading = true
        })
        builder.addCase(fetchSingleStudent.fulfilled, (state, action) => {
            console.log("Student aqquired!")
            console.log(action.payload)
            state.loading = false
            state.student = action.payload
            state.studentCampusId = state.students.CampusId

        })
        builder.addCase(fetchSingleStudent.pending, (state, action) => {
            //console.log("Student pending")
            state.loading = true
        })
        builder.addCase(postStudent.pending, (state, action) => {
            console.log("posting student to database")
            state.loading = true
        })
        builder.addCase(postStudent.fulfilled, (state, action) => {
            state.students.push(action.payload)
            state.loading = false
        })
        builder.addCase(deleteStudent.pending, (state, action) => {
            console.log("deleteing student from database")
            state.loading = true
        })
        builder.addCase(deleteStudent.fulfilled, (state, action) => {
            console.log(action.payload.student)
            const newStudents = state.students.filter((obj) => {
                if (obj.id !== action.payload.student.id) {
                    return obj
                }
            })
            state.students = newStudents
            state.loading = false
        })
        builder.addCase(updateStudent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            console.log("builder case reached with", action.payload)
            state.student = action.payload
            state.loading = false
        })

    }
})
//selectors for retrieving state
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