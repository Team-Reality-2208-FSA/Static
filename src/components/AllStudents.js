import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsAsync } from "../store/studentsSlice";
import { selectStudents } from "../store/studentsSlice";
import { Link } from "react-router-dom";

const AllStudents = ()=> {
    const dispatch = useDispatch()
    const students = useSelector(selectStudents).students
    console.log(students)
    
    useEffect(()=>{
        dispatch(fetchStudentsAsync())
    },[dispatch])

    return (
        <>
            <h1 id="allStudents">All Students</h1>
            <ul>
                {students.map((student)=>{
                    return <li className="students" key={student.id}><Link to={`/students/${student.id}`}><h3>{student.firstName} {student.lastName}</h3><img className="studentImgs" src={student.imageUrl}/></Link></li>
                })}
            </ul>
        </>
    )
}

export default AllStudents