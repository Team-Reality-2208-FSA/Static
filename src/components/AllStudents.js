import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { fetchCampusesAsync, selectCampuses } from "../store/CampusesSlice";

const AllStudents = ()=> {
    const dispatch = useDispatch()
    // const campuses = useSelector(selectCampuses)

    // useEffect(()=>{
    //     dispatch(fetchCampusesAsync())
    // },[dispatch])

    return (
        <div>
            <h1>All Students</h1>
        </div>
    )
}

export default AllStudents