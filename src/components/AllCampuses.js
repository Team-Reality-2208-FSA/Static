import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampusesAsync } from "../store/campusesSlice";
import { selectCampuses } from "../store/campusesSlice";
import { Link } from "react-router-dom";

const AllCampuses = ()=> {
    const dispatch = useDispatch()
    const campuses = useSelector(selectCampuses).campuses
    
    useEffect(()=>{
        dispatch(fetchCampusesAsync())
    },[dispatch])

    return (
        <>
            <h1 id="allCampuses">All Campuses</h1>
            <ul>
                {campuses.map((campus)=>{
                    return <li className="campuses" key={campus.id}><Link to={`/campuses/${campus.id}`}><h3>{campus.name}</h3><img className="campusImgs" src={campus.imageUrl}/></Link></li>
                })}
            </ul>
        </>
    )
}

export default AllCampuses