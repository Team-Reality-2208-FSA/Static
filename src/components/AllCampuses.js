import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampusesAsync, postCampus, deleteCampus } from "../store/campusesSlice";
import { selectCampuses } from "../store/campusesSlice";
import { Link } from "react-router-dom";
import { useState } from "react";


const AllCampuses = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCampusesAsync())
    }, [])

    const campuses = useSelector(selectCampuses)

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const [description, setDesc] = useState('')

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
    }

    async function handleDelete(x) {
        x.preventDefault()
        const id = x.target.value
        console.log(id)
        dispatch(deleteCampus(id))
        
    }
    
    console.log(campuses)

    return (
        <>
            <h1 id="allCampuses">All Campuses</h1>
            <ul>
                {campuses.map((campus) => {
                    return <li className="campuses" key={campus.id}><Link to={`/campuses/${campus.id}`}><h3>{campus.name}</h3><img className="campusImgs" src={campus.imageUrl} /></Link><button value={campus.id} onClick={handleDelete}>X</button></li>
                })}
            </ul>

            <form className="campusForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Campus Name:</label>
                <input name="name" value={name} onChange={(ch) => setName(ch.target.value)}></input>
                <label htmlFor="address" >Address</label>
                <input name="address" value={address} onChange={(ch) => setAddress(ch.target.value)}></input>
                <label htmlFor="image">Image Url</label>
                <input name="image" value={image} onChange={(ch) => setImage(ch.target.value)}></input>
                <label htmlFor="desc">Description</label>
                <input name="description" value={description} onChange={(ch) => setDesc(ch.target.value)}></input>
                <button type='submit'>Add Campus</button>
            </form>
        </>
    )
}

export default AllCampuses

