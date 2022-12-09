import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { selectGraph, fetchGraphInfo } from "../store/GraphSlice";
import "chart.js/auto";

function LineChart() {
  const GraphData = useSelector(selectGraph);
  console.log(GraphData);

  let CrimeRates2015 = 0;
  let CrimeRates2016 = 0;
  let CrimeRates2017 = 0;
  let CrimeRates2018 = 0;
  let CrimeRates2019 = 0;
  let CrimeRates2020 = 0;

  const myData = [].concat(GraphData.results).sort((a, b) => a.year - b.year);

  myData[0]
    ? (CrimeRates2015 =
        myData[0].population /
        (myData[0].rape_revised +
          myData[0].burglary +
          myData[0].robbery +
          myData[0].aggravated_assault +
          myData[0].arson +
          myData[0].homicide +
          myData[0].motor_vehicle_theft +
          myData[0].property_crime +
          myData[0].violent_crime))
    : null;

  myData[1]
    ? (CrimeRates2016 =
        myData[1].population /
        (myData[1].rape_revised +
          myData[1].burglary +
          myData[1].robbery +
          myData[1].aggravated_assault +
          myData[1].arson +
          myData[1].homicide +
          myData[1].motor_vehicle_theft +
          myData[1].property_crime +
          myData[1].violent_crime))
    : null;

  myData[2]
    ? (CrimeRates2017 =
        myData[2].population /
        (myData[2].rape_revised +
          myData[2].burglary +
          myData[2].robbery +
          myData[2].aggravated_assault +
          myData[2].arson +
          myData[2].homicide +
          myData[2].motor_vehicle_theft +
          myData[2].property_crime +
          myData[2].violent_crime))
    : null;

  myData[3]
    ? (CrimeRates2018 =
        myData[3].population /
        (myData[3].rape_revised +
          myData[3].burglary +
          myData[3].robbery +
          myData[3].aggravated_assault +
          myData[3].arson +
          myData[3].homicide +
          myData[3].motor_vehicle_theft +
          myData[3].property_crime +
          myData[3].violent_crime))
    : null;

  myData[4]
    ? (CrimeRates2019 =
        myData[4].population /
        (myData[4].rape_revised +
          myData[4].burglary +
          myData[4].robbery +
          myData[4].aggravated_assault +
          myData[4].arson +
          myData[4].homicide +
          myData[4].motor_vehicle_theft +
          myData[4].property_crime +
          myData[4].violent_crime))
    : null;

  myData[5]
    ? (CrimeRates2020 =
        myData[5].population /
        (myData[5].rape_revised +
          myData[5].burglary +
          myData[5].robbery +
          myData[5].aggravated_assault +
          myData[5].arson +
          myData[5].homicide +
          myData[5].motor_vehicle_theft +
          myData[5].property_crime +
          myData[5].violent_crime))
    : null;

  return (
    <div className="gridBox">
      <Line
        data={{
          // x-axis label values
          labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
          datasets: [
            {
              label: "Crime rate of the last 5 years",
              // y-axis data plotting values
              data: [
                CrimeRates2015.toFixed(2),
                CrimeRates2016.toFixed(2),
                CrimeRates2017.toFixed(2),
                CrimeRates2018.toFixed(2),
                CrimeRates2019.toFixed(2),
                CrimeRates2020.toFixed(2),
              ],
              fill: false,
              borderWidth: 4,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "green",
              responsive: true,
            },
          ],
        }}
      />
    </div>
  );
}

export default LineChart;
