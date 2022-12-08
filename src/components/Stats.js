import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFBI } from "../store/FBISlice";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import LineChart from "./LineChart";
import graphSlice from "../store/GraphSlice";
import { fetchGraphInfo } from "../store/GraphSlice";

function Stats() {
 

//NEED TO PUT THE SELECTOR FOR THE GRAPH
  // const FBI = useSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchGraphInfo(chosenState));
  }, []);


  return (
    <>
      <div className="statsHeader">STATS</div>
      <div>
      <div>
          <BarChart />
        </div>
        <div className="doughnutChart">
          <DoughnutChart />
        </div>
        <div>
          <LineChart />
        </div>
        </div>

      
    </>
  );
}

export default Stats;
