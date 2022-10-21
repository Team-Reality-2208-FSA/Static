import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsAsync } from "../store/studentsSlice";
import { selectStudents } from "../store/studentsSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postStudent } from "../store/studentsSlice";

const AllStudents = ()=> {
    const dispatch = useDispatch()
    const students = useSelector(selectStudents).students
    console.log(students)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] =useState('')
    const [image, setImage] = useState('')
    const [gpa, setGpa] = useState('')
    
    useEffect(()=>{
        dispatch(fetchStudentsAsync())
    },[dispatch])

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

    return (
        <>
            <h1 id="allStudents">All Students</h1>
            <ul>
                {students.map((student)=>{
                    return <li className="students" key={student.id}><Link to={`/students/${student.id}`}><h3>{student.firstName} {student.lastName}</h3><img className="studentImgs" src={student.imageUrl}/></Link></li>
                })}
            </ul>
            <form className="studentForm" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input name="firstName" value={firstName} onChange={(ch)=> setFirstName(ch.target.value)}></input>
                <label htmlFor="lastName" >Last Name</label>
                <input name="lastName" value={lastName} onChange={(ch)=> setLastName(ch.target.value)}></input>
                <label htmlFor="email" >Email Address</label>
                <input name="email" value={email} onChange={(ch)=> setEmail(ch.target.value)}></input>
                <label htmlFor="image">Image Url</label>
                <input name="image" value={image} onChange={(ch)=> setImage(ch.target.value)}></input>
                <label htmlFor="gpa">GPA</label>
                <input name="gpa" value={gpa} onChange={(ch)=> setGpa(ch.target.value)}></input> 
                <button type='submit'>Add Student</button>
            </form>
        </>
    )
}

export default AllStudents