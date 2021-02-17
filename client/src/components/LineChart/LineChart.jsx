import React from 'react';
import { defaults, Line } from "react-chartjs-2";
defaults.global.defaultFontFamily = "Mukta";

const LineChart = ({ arr }) => {
  const bgcolor = ["#727cf5"];
  const dates = arr.map(item => (new Date(item[0])).toString().split(" ").slice(1,4).join(" "));

  return (
    <Line
      data={{
          labels: dates.map(date => date),
          datasets: [{
            label: "Bitcoin",
            data: arr.map(item => item[1].toFixed(3).toLocaleString()),
            borderColor: bgcolor,
            fill: false
          }],
        }}
        options={{
          maintainAspectRatio: false,
        }}>
      
    </Line>
  )
}

export default LineChart
