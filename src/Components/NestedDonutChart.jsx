import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { tailwindColors } from "../Utils/Colors.jsx";

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

export default function NestedDonutChart({ className }) {
    // Sample data for each ring
    const data = {
        labels: ["Ring 1", "Ring 2", "Ring 3", "Ring 4", "Ring 5"],
        datasets: [
            // Outermost ring (largest)
            {
                label: "Ring 1",
                data: [75, 25], // [filled, empty]
                backgroundColor: [tailwindColors.primary, "transparent"],
                borderColor: ["transparent", "transparent"],
                borderWidth: 0,
                circumference: 270, // 3/4 of a circle
                rotation: -135, // Start from top
                weight: 0.5, // Make all rings have equal visual weight
                borderRadius: 20,
            },
            // Second ring
            {
                label: "Ring 2",
                data: [60, 40], // [filled, empty]
                backgroundColor: [tailwindColors.selectionBG, "transparent"],
                borderColor: ["transparent", "transparent"],
                borderWidth: 0,
                circumference: 270,
                rotation: -135,
                weight: 0.5,
                borderRadius: 20,
            },
            // Third ring
            {
                label: "Ring 3",
                data: [85, 15], // [filled, empty]
                backgroundColor: [tailwindColors.accent, "transparent"],
                borderColor: ["transparent", "transparent"],
                borderWidth: 0,
                circumference: 270,
                rotation: -135,
                weight: 0.5,
                borderRadius: 20,
            },
            // Fourth ring
            {
                label: "Ring 4",
                data: [45, 55], // [filled, empty]
                backgroundColor: [tailwindColors.selection, "transparent"],
                borderColor: ["transparent", "transparent"],
                borderWidth: 0,
                circumference: 270,
                rotation: -135,
                weight: 0.5,
                borderRadius: 20,
            },
            // Innermost ring (smallest)
            {
                label: "Ring 5",
                data: [90, 10], // [filled, empty]
                backgroundColor: [tailwindColors.highlight, "transparent"],
                borderColor: ["transparent", "transparent"],
                borderWidth: 0,
                circumference: 270,
                rotation: -135,
                weight: 0.5,
                borderRadius: 20,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "65%", // This makes the donuts skinny
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    generateLabels: (chart) => {
                        // Custom function to generate correct labels for each dataset
                        const datasets = chart.data.datasets
                        const labels = chart.data.labels

                        return datasets.map((dataset, i) => {
                            return {
                                text: labels[i],
                                fillStyle: dataset.backgroundColor[0],
                                hidden: false,
                                lineCap: undefined,
                                lineDash: undefined,
                                lineDashOffset: undefined,
                                lineJoin: undefined,
                                lineWidth: undefined,
                                strokeStyle: undefined,
                                pointStyle: "circle",
                                datasetIndex: i,
                            }
                        })
                    },
                },
            },
            tooltip: {
                callbacks: {
                    // Add this title callback
                    title: (tooltipItems) => {
                        // Get the dataset index of the first item
                        const datasetIndex = tooltipItems[0].datasetIndex;
                        // Return the correct label from the labels array
                        return data.labels[datasetIndex];
                    },
                    label: (context) => {
                        const datasetIndex = context.datasetIndex;
                        const dataIndex = context.dataIndex;

                        // Only show tooltip for the filled part (dataIndex 0)
                        if (dataIndex === 0) {
                            const label = data.labels[datasetIndex] || "";
                            const value = context.raw || 0;
                            return `${label}: ${value}%`;
                        }
                        return "";
                    },
                },
            },
        },
    }

    return (
        <div className={`${className} bg-superClear rounded-xl shadow-md p-4 flex flex-col space-y-2`}>
            <h2 className="text-sm font-medium">Statistiques</h2>
            <div className="aspect-square w-64 h-64 mx-auto">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
}
