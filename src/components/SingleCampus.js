import React from "react";
import {useEffect} from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCampus, fetchSingleCampus } from "../store/campusesSlice"
import { useDispatch } from "react-redux";
import { studentsOfCampus, isLoading } from "../store/campusesSlice"
import { Link } from "react-router-dom"

const SingleCampus = () => {
    const dispatch = useDispatch()
    const { campId } = useParams()

    useEffect(()=>{
        dispatch(fetchSingleCampus(campId))
    },[dispatch])

    const loading = useSelector(isLoading)
    const campus = useSelector(selectCampus)
    console.log(campus)
    if(!loading) {
    return (
        <>
            <h1 className="singleCampusName">{campus.name}</h1>
            <img className="singleCampusImg" src={campus.imageUrl}/>
            <h3 className="singleCampusAddress">{campus.adress}</h3>
            <p className="singleCampusDesc" >{campus.description}</p>
    
            <ul className="studentsOfCampus">
                {campus.Students.map((student)=>{
                return(
                    
                <li className="studentsOfCampusLi" key={student.id}>
                <Link to={`/students/${student.id}`}>
                <h2 className="studentsOfCampusName" >{student.firstName} {student.lastName}</h2>
                </Link>
                </li>
                )
                })}
            </ul>
        </>
    )
    }
}

export default SingleCampus

