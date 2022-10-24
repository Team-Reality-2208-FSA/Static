import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsAsync } from "../store/studentsSlice";
import { selectStudents } from "../store/studentsSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postStudent, deleteStudent } from "../store/studentsSlice";

const AllStudents = () => {
    const dispatch = useDispatch()
    // fetching All students from state
    const students = useSelector(selectStudents).students

    // state used in the add student form
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [gpa, setGpa] = useState('')

    // triggering thunk in react lifecycle
    useEffect(() => {
        dispatch(fetchStudentsAsync())
    }, [])

    // handling sbmission of form ie: new student
    async function handleSubmit(submission) {
        submission.preventDefault()
        console.log("submitting Student")
        dispatch(
            postStudent({
                firstName,
                lastName,
                email,
                image,
                gpa
            })
        )
    }

    // handles the deletion of a student
    async function handleDelete(x) {
        x.preventDefault()
        const id = x.target.value
        console.log(id)
        dispatch(deleteStudent(id))
    }

    return (
        <>
            <h2 id="allStudentsh2">All Students</h2>
            <div className="allStudentsView">
                <ul className="studentsList">
                    {/* maps over students array to render list */}
                    {students.map((student) => {
                        return <li className="students" key={student.id}><Link className="studentsNames" to={`/students/${student.id}`}><h3 className="studentsh3s">{student.firstName} {student.lastName}</h3><img className="studentsImgs" src={student.imageUrl} /></Link><button value={student.id} onClick={handleDelete}>Delete Student</button></li>
                    })}
                </ul>
                {/* form for submitting new student to database */}
                <form className="studentForm" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name:</label>
                    <input name="firstName" value={firstName} onChange={(ch) => setFirstName(ch.target.value)}></input>
                    <label htmlFor="lastName" >Last Name</label>
                    <input name="lastName" value={lastName} onChange={(ch) => setLastName(ch.target.value)}></input>
                    <label htmlFor="email" >Email Address</label>
                    <input name="email" value={email} onChange={(ch) => setEmail(ch.target.value)}></input>
                    <label htmlFor="image">Image Url</label>
                    <input name="image" value={image} onChange={(ch) => setImage(ch.target.value)}></input>
                    <label htmlFor="gpa">GPA</label>
                    <input name="gpa" value={gpa} onChange={(ch) => setGpa(ch.target.value)}></input>
                    <button type='submit'>Add Student</button>
                </form>
            </div>
        </>
    )
}

export default AllStudents