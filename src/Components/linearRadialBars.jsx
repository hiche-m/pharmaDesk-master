import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

const LinearRadialBarWidget = () => {
    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

    const linearBarData = {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                label: "Linear Bar",
                data: [12, 19, 3, 5, 2],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const radialBarData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
        datasets: [
            {
                label: "Radial Bar",
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                ],
            },
        ],
    };

    return (
        <div className="linear-radial-axis-widget">
            <div className="linear-radial-axis">
                <Bar data={linearBarData} />
                <Doughnut data={radialBarData} />
            </div>
            <div className="text-center mt-2">
                <span className="text-sm font-medium text-textPrimary">Linear Radial Axis</span>
            </div>
        </div>
    );
}
 
export default LinearRadialBarWidget;