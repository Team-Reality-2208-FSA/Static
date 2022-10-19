import React from "react";
import {useEffect} from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCampus, fetchSingleCampus } from "../store/campusesSlice"
import { useDispatch } from "react-redux";

const SingleCampus = () => {
    const dispatch = useDispatch()
    const { campId } = useParams()
    console.log("id received from Url", campId)

    

    useEffect(()=>{
        dispatch(fetchSingleCampus(campId))
    },[dispatch])

    const campus = useSelector(selectCampus)
    console.log("state received from use selector", campus)

    return (
    <>
    <h1 className="singleCampusName">{campus.name}</h1>
    <img className="singleCampusImg" src={campus.imageUrl}/>
    <h3 className="singleCampusAddress">{campus.adress}</h3>
    <p className="singleCampusDesc" >{campus.description}</p>
    </>
    )
}

export default SingleCampus

