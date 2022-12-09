import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGraph, fetchGraphInfo } from "../store/GraphSlice";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

function DoughnutChart() {

  


  const GraphData = useSelector(selectGraph)
  


    let rape = 9;
    let larceny = 9;
    let burglary = 9;
    let robbery = 9;
    let aggravated_assault = 9;
    let arson = 9;
    let homicide = 9;
    let motor_vehicle_theft = 9;
    let property_crime = 9;
    let violent_crime = 10;

  
    GraphData.results ? GraphData.results.map((result) => {
      rape += (result.rape_revised - 9);
      larceny += (result.larceny - 9);
      burglary += (result.burglary - 9);
      robbery += (result.robbery - 9);
      aggravated_assault += (result.aggravated_assault - 9);
      arson += (result.arson - 9);
      homicide += (result.homicide - 9);
      motor_vehicle_theft += (motor_vehicle_theft - 9);
      property_crime += (result.property_crime - 9);
      violent_crime += (result.violent_crime - 10);




      
    }) : null 


const data = {
  labels: ["Rape", "Larceny", "Burglery", "Robbery", "Aggravated Assault","Arson", "Homicide","Vehicle Theft", "Property Crime", "Violent Crime"],
  datasets: [
    {
    
      label: "Crime Category",
      data: [rape, larceny, burglary, robbery, aggravated_assault, arson, homicide, motor_vehicle_theft,property_crime,violent_crime],
      borderColor: ["rgba(255,206,86,0.2)"],
      backgroundColor: [
        "#1abc9c",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#e74c3c",
        "#f1c40f",
        "#e67e22",
        "#bdc3c7",
        "#7f8c8d",
        "#2c3e50",
        "#e74c3c"
      ],
      pointBackgroundColor: "rgba(255,206,86,0.2)",
    },
  ],
};

const options = {
  maintainAspectRation: true,
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Category Breakdown",
      color: "blue",
      font: {
        size: 20,
      },
      padding: {
        // top: 30,
        // bottom: 30,
      },
      maintainAspectRation: true,
      responsive: true,
      animation: {
        animateScale: true,
      },
    },
  },
};


  return (
    <>
      <Doughnut data={data} options={options} />
   
    </>
  );
  
}

export default DoughnutChart;
