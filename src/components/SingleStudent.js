import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchSingleStudent, selectStudent } from "../store/studentsSlice";


const SingleStudent = () => {
    const dispatch = useDispatch()
    const { stuId } = useParams()

    useEffect(()=>{
        dispatch(fetchSingleStudent(stuId))
    }, [dispatch])

    const student = useSelector(selectStudent)
    console.log(student)

    return (
        <>
            <h1 className="studentsOfCampusName">{student.firstName} {student.lastName}</h1>
            <img className="studentsOfCampusImg" src={student.imageUrl}/>
            <h2 className="studentsOfCampusEmail" >{student.email}</h2>
            <h2 className="studentsOfCampusGpa" >{student.gpa}</h2>
        </>
    )
}

export default SingleStudent