import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchSingleStudent, selectStudent, stuIsLoading } from "../store/studentsSlice";
import { fetchSingleCampus, isLoading, selectCampus } from "../store/CampusesSlice";


const SingleStudent = () => {
    const dispatch = useDispatch()
    const { stuId } = useParams()
    

    useEffect(()=>{
        dispatch(fetchSingleStudent(stuId))
    }, [dispatch])

    const campLoading = useSelector(isLoading)
    const stuLoading = useSelector(stuIsLoading)

    useEffect(()=>{
        dispatch(fetchSingleCampus(CampusId))
    },[stuLoading])

    const student = useSelector(selectStudent)
    const { CampusId } = student
    const campus = useSelector(selectCampus)
    

    console.log("campus selector is loading", campLoading)
    console.log("student selector is loading", stuLoading)
    console.log("student state in StudentSlice",student)
    console.log("campus state in CampusSlice", campus)
    
    if(!campLoading && !stuLoading) {
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