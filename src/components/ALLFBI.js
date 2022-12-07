import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFBI, selectFBI, selectOri } from "../store/FBISlice"
import { fetchStats } from "../store/CrimedataSlice";

 
const ALLFBI = () => {
    const [chosenState, setChosenState] = useState("")
    const [option, setOption ] = useState("")
    
    const dispatch = useDispatch();
    
    const FBIData = useSelector(selectFBI);
    const OriData = useSelector(selectOri)
    let Oris = []

    
    OriData.filter((ori) => ori[1] === option ?  Oris.push(ori[0]) : null) 
   
        
    function onSubmit (event) {
        event.preventDefault()

        dispatch(fetchStats({oris: Oris, offense: "homicide" , from: 2019, to: 2020}))

        dispatch(fetchFBI(chosenState));
       }
       

    return (
        <>

            <form onSubmit= {onSubmit}>
            <label htmlFor = "chosenState">State initials</label>
            <input value = {chosenState} onChange = {(evt) => setChosenState(evt.target.value)} />
                <button type = "submit" >Submit</button>
            </form>

            
           
            <select onChange = {(evt) => setOption(evt.target.value)}><option>Select County</option>{FBIData.map((county)=><option value = {county} >{county}</option>)}</select>  
             
            
             

         </>
    )
                    
    }
export default ALLFBI;

