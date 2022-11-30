import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFBI, selectFBI } from "../store/FBISlice"

 



const ALLFBI = () => {

    const [chosenState, setChosenState] = useState("")
    const dispatch = useDispatch();
    const FBIData = useSelector(selectFBI);
   
        function onSubmit (event) {
        event.preventDefault()

        dispatch(fetchFBI(chosenState));
       }
       
    return (
        <>

            <form onSubmit= {onSubmit}>
            <label htmlFor = "chosenState">State initials</label>
            <input value = {chosenState} onChange = {(evt) => setChosenState(evt.target.value)} />
                <button type = "submit" >Submit</button>
            </form>

            <select>{FBIData.map((county)=><option>{county}</option>)}</select>  
             
         </>
    )

    }
export default ALLFBI

