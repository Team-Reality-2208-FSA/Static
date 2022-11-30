import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFBI, selectFBI } from "../store/FBISlice";

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
        <img
          className="graphImg"
          src="https://cdn.pixabay.com/photo/2012/04/16/12/26/chart-35773__340.png"
        ></img>

        <div className="statsForm">
          <form>
            <label>
              <div className="inputLabel">Enter State Initials</div>
              <input
                classname="stateInput"
                onChange={setInputState}
                type="text"
                name="name"
              />
            </label>
            <label>
              <div className="inputLabel">Select County</div>
              <select
                name="myselect"
                className="selectCounty"
                id="myselect"
                onchange="this.form.submit()"
              >
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
              </select>
            </label>

            <label>
              <div className="inputLabel">Year</div>
              <select
                name="myselect"
                className="selectCounty"
                id="myselect"
                onchange="this.form.submit()"
              >
                <option value="1">2019</option>
                <option value="2">2018</option>
                <option value="3">2017</option>
                <option value="4">2016</option>
              </select>
            </label>

            <label>
              <div className="inputLabel">Category</div>
              <select
                name="myselect"
                className="selectCounty"
                id="myselect"
                onchange="this.form.submit()"
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
      </div>
    </>
  );
}

export default Stats;
