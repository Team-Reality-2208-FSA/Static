import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampusesAsync, postCampus, deleteCampus, selectCampuses } from "../store/campusesSlice";
import { Link } from "react-router-dom";

const AllCampuses = () => {
    const dispatch = useDispatch()

    // side effect for dispatching fetch campuses thunk
    useEffect(() => {
        dispatch(fetchCampusesAsync())
    }, [])
    // select campuses array from state
    const campuses = useSelector(selectCampuses)

    // states used in the create campus form
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const [description, setDesc] = useState('')

    // event handler for submitting a new campus
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
    // handling deletion of campus dispatching action
    async function handleDelete(x) {
        x.preventDefault()
        const id = x.target.value
        console.log(id)
        dispatch(deleteCampus(id))

    }

    return (
        <>
            <h2 id="allCampusesh2">All Campuses</h2>
            <div className="allCampusesView">
                <ul className="campusesList">
                    {/* mapping through campuses state to render list items */}
                    {campuses.map((campus) => {
                        return <li className="campuses" key={campus.id}><Link className="campusNames"to={`/campuses/${campus.id}`}><h3 className="campush3s">{campus.name}</h3><img className="campusImgs" src={campus.imageUrl} /></Link><button value={campus.id} onClick={handleDelete}>Delete Campus</button></li>
                    })}
                </ul>
                {/* form for adding a new campus */}
                <form className="campusForm" onSubmit={handleSubmit}>
                    <label htmlFor="name">Campus Name:</label>
                    <input name="name" value={name} onChange={(ch) => setName(ch.target.value)}></input>
                    <label htmlFor="address" >Address</label>
                    <input name="address" value={address} onChange={(ch) => setAddress(ch.target.value)}></input>
                    <label htmlFor="image">Image Url</label>
                    <input name="image" value={image} onChange={(ch) => setImage(ch.target.value)}></input>
                    <label htmlFor="desc">Description</label>
                    <input name="description" value={description} onChange={(ch) => setDesc(ch.target.value)}></input>
                    <button id="addCampusButton"type='submit'>Add Campus</button>
                </form>
            </div>
        </>
    )
}

export default AllCampuses

