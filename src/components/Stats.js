import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFBI, selectFBI } from "../store/FBISlice";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";

function Stats() {
  const [inputState, setInputState] = useState("");

  const FBI = useSelector(selectFBI);
  console.log(FBI);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFBI("NJ"));
  }, []);

  console.log("inputState", inputState);

  return (
    <>
      <div className="statsHeader">STATS</div>
      <div className="statsBody">
        <div className="statsForm">
          <form>
            <label>
              <div className="inputLabel">Enter State Initials</div>
              <input
                className="stateInput"
                onChange={setInputState}
                type="text"
                name="name"
              />
            </label>

            <label>
              <div className="inputLabel">Category</div>
              <select
                name="myselect"
                className="selectCounty"
                id="myselect"
                onChange="this.form.submit()"
              >
                <option value="1">All</option>
                <option value="2">Robbery</option>
                <option value="3">Sexual Assault</option>
                <option value="4">Larceny</option>
                <option value="4">Burglery</option>
              </select>
            </label>

            <div className="inputLabel">
              <input type="submit" value="Generate" />
            </div>
          </form>
        </div>
        <div>
          <BarChart />
        </div>
        <div>
          <DoughnutChart />
        </div>
      </div>
    </>
  );
}

export default Stats;
