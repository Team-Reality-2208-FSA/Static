import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchSingleStudent, selectStudent, stuIsLoading } from "../store/studentsSlice";
import { updateStudent } from "../store/studentsSlice";


const SingleStudent = () => {
    const dispatch = useDispatch()
    const { stuId } = useParams()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState('')
    const [email, setEmail] = useState('')
    const [gpa, setGpa] =useState(0)
   
    
    useEffect(()=>{
        dispatch(fetchSingleStudent(stuId))
    }, [singleStudent])

    const stuLoading = useSelector(stuIsLoading)
    const singleStudent = useSelector(selectStudent)

    const campus = singleStudent.campus
    const student = singleStudent.student
    
    async function update(x) {
        x.preventDefault()
        dispatch(updateStudent({
            stuId,
            firstName,
            lastName,
            email,
            image,
            gpa
        }))

    }

    if(!stuLoading) {
    return (
        <>
            <h1 className="studentsOfCampusName">{student.firstName} {student.lastName}</h1>
            <img className="studentsOfCampusImg" src={student.imageUrl}/>
            <h2 className="studentsOfCampusEmail" >{student.email}</h2>
            <h2 className="studentsOfCampusGpa" >{student.gpa}</h2>
            <Link to={`/campuses/${campus.id}`}><h2>{campus.name}</h2></Link>

            <form className="updateStudentForm" onSubmit={(x)=>update(x)}>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" value={firstName} onChange={(ch) => setFirstName(ch.target.value)}></input>
                <label htmlFor="lastName" >Last Name</label>
                <input name="lastName" value={lastName} onChange={(ch) => setLastName(ch.target.value)}></input>
                <label htmlFor="email">Email</label>
                <input name="email" value={email} onChange={(ch) => setEmail(ch.target.value)}></input>
                <label htmlFor="image">Image Url</label>
                <input name="image" value={image} onChange={(ch) => setImage(ch.target.value)}></input>
                <label htmlFor="gpa">GPA</label>
                <input name="gpa" value={gpa} onChange={(ch) => setGpa(ch.target.value)}></input>
                <button type='submit'>Update Student</button>
            </form>
           
        </>
    )
    }
}


export default SingleStudent