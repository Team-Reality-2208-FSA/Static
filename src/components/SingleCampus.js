import React from "react";
import {useEffect, useState} from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCampus, fetchSingleCampus } from "../store/campusesSlice"
import { useDispatch } from "react-redux";
import { updateCampus, isLoading } from "../store/campusesSlice"
import { Link } from "react-router-dom"
import {unregisterStudent} from "../store/campusesSlice"

const SingleCampus = () => {
    const dispatch = useDispatch()
    const { campId } = useParams()

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const [description, setDesc] = useState('')


    useEffect(()=>{
        dispatch(fetchSingleCampus(campId))
    },[])

    const loading = useSelector(isLoading)
    const campus = useSelector(selectCampus)
    console.log("campus in state:", campus)

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

    async function unregister(e) {
        const id = e.target.value
        console.log(id)
        dispatch(unregisterStudent(id))
    }
    
   
    if(!loading) {
    return (
        <>
            <h1 className="singleCampusName">{campus.name}</h1>
            <img className="singleCampusImg" src={campus.imageUrl}/>
            <h3 className="singleCampusAddress">{campus.address}</h3>
            <p className="singleCampusDesc" >{campus.description}</p>
    
            <ul className="studentsOfCampus">
                
                { 
                campus.Students ? campus.Students.map((student)=>{
                return(
                    
                <li className="studentsOfCampusLi" key={student.id}>
                <Link to={`/students/${student.id}`}>
                <h2 className="studentsOfCampusName" >{student.firstName} {student.lastName}</h2>
                </Link>
                <button type="button" value={student.id} onClick={(e)=> unregister(e)}>Unregister</button>
                </li>
                )
                }):null}
            </ul>
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
        </>
    )
    }
}

export default SingleCampus

