import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFBI, selectFBI } from "../store/FBISlice"
import { Link } from "react-router-dom";


const ALLFBI = () => {
    const FBI = useSelector(selectFBI);
    console.log(FBI)    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchFBI("NJ"));
      }, []);

    return (
        <>
            {FBI ? FBI.map((result)=>(<h1>{

                    result.ori

            }</h1>

                
            ))
            
            
            
            
            
            : null}
        </>
    )

    }
export default ALLFBI

