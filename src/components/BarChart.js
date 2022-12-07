import React, {useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGraph,fetchGraphInfo } from "../store/GraphSlice";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function BarChart() {

  



  const GraphData = useSelector(selectGraph);

  //console.log(GraphData.results)


  // const sortByYear  = () => {
  // const graph = GraphData.results;
  //  graph.sort((a, b) => { a.year - b.year })
  // }

//This sorts the results by year
const myData = [].concat(GraphData.results)
.sort((a, b) => a.year - b.year)

  console.log('myData',myData)

  const [chosenState, setChosenState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [BarValues, setBarValues] = useState([]);
  
 
  
    const  setBars  = (crime) => {
      const arr = []
      
    for(const crimes of GraphData.results) {

      arr.push(crimes[crime])
      console.log(crime)
      

    }
    setBarValues(arr)
  }

  
  const labels = ["2015", "2016", "2017", "2018", "2019", "2020"];

  const data =  {
    labels,

    datasets: [
     
      {
        label: selectedCategory,
       
        data: BarValues,
        backgroundColor: "#333333",
      },
    ],
  }

  

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Last 5 years",
      },
    },
  };


  


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGraphInfo(chosenState)); 
  }, [chosenState]);


  function onSubmit (event) {
    event.preventDefault()
  dispatch(fetchGraphInfo(chosenState));
  setBars(selectedCategory)
  
   }

   const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);

    //setBars(selectedCategory)
   
   }

  return (
    <>
    <div>
      <form className="statsForm statsBody" onSubmit= {onSubmit}>
            <label htmlFor = "chosenState">State initials</label>
            <input value = {chosenState} onChange = {(evt) => setChosenState(evt.target.value)} />
                <button type = "submit" >Submit</button>
            </form>
            <select onChange={handleChange}>
              <option value = "aggravated_assault">Aggravated Assault</option>
              <option value = "arson">Arson</option>
              <option value = "homicide">Homicide</option>
              <option value = "larceny">Larceny</option>
              <option value = "motor_vehicle_theft">Vehicle Theft</option>
              <option value = "property_crime">Property Crime</option>
              <option value = "rape_revised">Rape</option>
              <option value = "robbery">Robbery</option>
              <option value = "violent_crime">Violent Crime</option>
            </select>

            <div className="barChart">
        <Bar options={options} data={data} /> 
      </div>
      </div>
    </>
  );
  
  }

export default BarChart;
