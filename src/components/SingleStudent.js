import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchSingleStudent, selectStudent, stuIsLoading } from "../store/studentsSlice";



const SingleStudent = () => {
    const dispatch = useDispatch()
    const { stuId } = useParams()
    
    useEffect(()=>{
        dispatch(fetchSingleStudent(stuId))
    }, [dispatch])

    const stuLoading = useSelector(stuIsLoading)
    const singleStudent = useSelector(selectStudent)

    const campus = singleStudent.campus
    const student = singleStudent.student
    
    if(!stuLoading) {
    return (
        <>
            <h1 className="studentsOfCampusName">{student.firstName} {student.lastName}</h1>
            <img className="studentsOfCampusImg" src={student.imageUrl}/>
            <h2 className="studentsOfCampusEmail" >{student.email}</h2>
            <h2 className="studentsOfCampusGpa" >{student.gpa}</h2>
            <Link to={`/campuses/${campus.id}`}><h2>{campus.name}</h2></Link>
        </>
    )
}
}


export default SingleStudent