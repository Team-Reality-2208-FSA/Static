import React from "react";
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectCampus, fetchSingleCampus, updateCampus, isLoading, unregisterStudent } from "../store/campusesSlice"

const SingleCampus = () => {
    const dispatch = useDispatch()
    // retrieving campus id from url
    const { campId } = useParams()

    //states used in the update form
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const [description, setDesc] = useState('')

    // dispatches thunk to retrieve campus in redux
    useEffect(() => {
        dispatch(fetchSingleCampus(campId))
    }, [])

    //retrieves state of loading to determine when to render
    const loading = useSelector(isLoading)

    //retrieves the campus
    const campus = useSelector(selectCampus)
    console.log("campus in state:", campus)

    // handles the update form onSubmit
    async function handleUpdate(x) {
        x.preventDefault()
        console.log("updating campus")
        dispatch(updateCampus({
            campId,
            name,
            image,
            address,
            description
        }))
    }

    // function for handling the unregister button
    async function unregister(e) {
        const id = e.target.value
        console.log(id)
        dispatch(unregisterStudent(id))
    }

    if (!loading) {
        return (
            <>
            <div className="singleCampusView">
                <div className="singleCampus">
                <h2 className="singleCampusName">{campus.name}</h2>
                <img className="singleCampusImg" src={campus.imageUrl} />
                <h3 className="singleCampusAddress">{campus.address}</h3>
                <p className="singleCampusDesc" >{campus.description}</p>
                </div>
                
                    {/* update campus form */}
                <form className="updateCampusForm" onSubmit={handleUpdate}>
                    <label htmlFor="name">Name</label>
                    <input name="name" value={name} onChange={(ch) => setName(ch.target.value)}></input>
                    <label htmlFor="address" >Address</label>
                    <input name="address" value={address} onChange={(ch) => setAddress(ch.target.value)}></input>
                    <label htmlFor="image">Image Url</label>
                    <input name="image" value={image} onChange={(ch) => setImage(ch.target.value)}></input>
                    <label htmlFor="desc">Description</label>
                    <input name="description" value={description} onChange={(ch) => setDesc(ch.target.value)}></input>
                    <button type='submit'>update Campus</button>
                </form>
                </div>
                <h3 className="stuh3">Students:</h3>
                <ul className="studentsOfCampus">
                    {/* if campus has students registered map over else return "This Campus has no registered students" */}
                    {campus.Students !== undefined && campus.Students.length > 0 ? campus.Students.map((student) => {
                        return (
                            <li className="studentsOfCampusLi" key={student.id}>
                                <Link className="studentlink"to={`/students/${student.id}`}>
                                    <h3 className="studentsOfCampusName" >{student.firstName} {student.lastName}</h3>
                                </Link>
                                <button className="unregisterButton" type="button" value={student.id} onClick={(e) => unregister(e)}>Unregister</button>
                            </li>
                        )
                    }) : <h2>This Campus has no registered students</h2>}
                </ul>
            </>
        )
    }
}

export default SingleCampus

