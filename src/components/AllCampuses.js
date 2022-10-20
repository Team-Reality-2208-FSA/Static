import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampusesAsync, postCampus } from "../store/campusesSlice";
import { selectCampuses } from "../store/campusesSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

const AllCampuses = ()=> {
    const dispatch = useDispatch()
    const campuses = useSelector(selectCampuses).campuses

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const [description, setDesc] = useState('')
    
    useEffect(()=>{
        dispatch(fetchCampusesAsync())
    },[dispatch])

    async function handleSubmit(submission) {
        submission.preventDefault()
        console.log("submitting Campus")
        dispatch(
            postCampus({
            name,
            image,
            address,
            description
        })
        )
        console.log("address value passed to Thunk", address)


    }

    return (
        <>
            <h1 id="allCampuses">All Campuses</h1>
            <ul>
                {campuses.map((campus)=>{
                    return <li className="campuses" key={campus.id}><Link to={`/campuses/${campus.id}`}><h3>{campus.name}</h3><img className="campusImgs" src={campus.imageUrl}/></Link></li>
                })}
            </ul>
             
            <form className="campusForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Campus Name:</label>
                <input name="name" value={name} onChange={(ch)=> setName(ch.target.value)}></input>
                <label htmlFor="address" >Address</label>
                <input name="address" value={address} onChange={(ch)=> setAddress(ch.target.value)}></input>
                <label htmlFor="image">Image Url</label>
                <input name="image" value={image} onChange={(ch)=> setImage(ch.target.value)}></input>
                <label htmlFor="desc">Description</label>
                <input name="description" value={description} onChange={(ch)=> setDesc(ch.target.value)}></input> 
                <button type='submit'>Add Campus</button>
            </form>
        </>
    )
}

export default AllCampuses

