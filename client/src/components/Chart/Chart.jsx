import React from 'react'
import { defaults, Doughnut } from "react-chartjs-2";
import styles from "./Chart.module.css";

defaults.global.defaultFontFamily = "Source Sans Pro";

const Chart = ({ arr }) => {
  const bgcolor = ["#727cf5",
          "#b96fe7",
          "#ea60ce",
          "#ff56ac",
          "#ff5b86",
          "#ff6f5f",
          "#ff8a38",
          "#ffa600",
          "#e2ab00",
          "#c9ad00",
          "#b1ae0a",
          "#99ae1c",
          "#81ac2b",
          "#69aa3a",
          "#4fa747",
          "#31a354"]
  return (
    <Doughnut
      data={{
        labels: arr.map(obj => obj.name),
        datasets: [{
          data: arr.map(obj => obj.holding_price.toFixed(3).toLocaleString()),
          backgroundColor: bgcolor
        }]
      }}
      options={{
        maintainAspectRatio: false,
        legend: { 
          display: true, 
          position: "bottom", 
          align: "start",
          labels: {
            boxWidth: 20,
            padding: 8
          }
        },
      }}
    />
  )
}

export default Chart