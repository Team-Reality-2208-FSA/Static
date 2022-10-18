import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampusesAsync, selectCampuses } from "../store/CampusesSlice";

const AllCampuses = ()=> {
    const dispatch = useDispatch()
    const campuses = useSelector(selectCampuses)

    useEffect(()=>{
        dispatch(fetchCampusesAsync())
    },[dispatch])

    return (
        <div>
            <h1>All Campuses</h1>
        </div>
    )
}

export default AllCampuses