import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { tailwindColors } from "../Utils/Colors.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

export default function NestedDonutChart({ className }) {


    const { todayStats } = useStateContext();

    const [data, setData] = useState(null);

    useEffect(() => {
        if (todayStats) {
            setData({
                labels: [
                    "Acceptées",
                    "Refusées",
                    "Selectionnée",
                    "Ventes",
                    "Envoie d'instructions",
                ],
                datasets: [
                    {
                        label: "Acceptées",
                        data: [
                            (todayStats.notifications_accepted / todayStats.total_notifications_received) * 100,
                            100 - (todayStats.notifications_accepted / todayStats.total_notifications_received) * 100,
                        ],
                        backgroundColor: [tailwindColors.primary, tailwindColors.lightShapes],
                        borderColor: ["transparent", "transparent"],
                        borderWidth: 0,
                        circumference: 270,
                        rotation: -135,
                        weight: 0.5,
                        borderRadius: 20,
                    },
                    {
                        label: "Refusées",
                        data: [
                            (todayStats.notifications_rejected / todayStats.total_notifications_received) * 100,
                            100 - (todayStats.notifications_rejected / todayStats.total_notifications_received) * 100,
                        ],
                        backgroundColor: [tailwindColors.selectionBG, "#F3F3F3"],
                        borderColor: ["transparent", "transparent"],
                        borderWidth: 0,
                        circumference: 270,
                        rotation: -135,
                        weight: 0.5,
                        borderRadius: 20,
                    },
                    {
                        label: "Selectionnée",
                        data: [
                            (todayStats.notifications_accepted_client_chosen / todayStats.total_notifications_received) * 100,
                            100 - (todayStats.notifications_accepted_client_chosen / todayStats.total_notifications_received) * 100,
                        ],
                        backgroundColor: [tailwindColors.accent, "#F6F6F6"],
                        borderColor: ["transparent", "transparent"],
                        borderWidth: 0,
                        circumference: 270,
                        rotation: -135,
                        weight: 0.5,
                        borderRadius: 20,
                    },
                    {
                        label: "Ventes",
                        data: [
                            (todayStats.confirmed_notifications / todayStats.total_notifications_received) * 100,
                            100 - (todayStats.confirmed_notifications / todayStats.total_notifications_received) * 100,
                        ],
                        backgroundColor: [tailwindColors.selection, "#F9F9F9"],
                        borderColor: ["transparent", "transparent"],
                        borderWidth: 0,
                        circumference: 270,
                        rotation: -135,
                        weight: 0.5,
                        borderRadius: 20,
                    },
                    {
                        label: "Envoie d'instructions",
                        data: [
                            (todayStats.confirmed_notifications_with_prescription / todayStats.total_notifications_received) * 100,
                            100 - (todayStats.confirmed_notifications_with_prescription / todayStats.total_notifications_received) * 100,
                        ],
                        backgroundColor: [tailwindColors.highlight, "#FCFCFC"],
                        borderColor: ["transparent", "transparent"],
                        borderWidth: 0,
                        circumference: 270,
                        rotation: -135,
                        weight: 0.5,
                        borderRadius: 20,
                    },
                ],
            });
        }
    }, [todayStats]);

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
        <div className={`${className} bg-superClear rounded-xl shadow-md p-4 flex flex-col space-y-2 justify-center items-start`}>
            {!data && (<LoadingSpinner />)}
        { data && 
        (<>
            <span className="text-sm font-medium">Statistiques d'aujourd'hui</span>
            <div className="aspect-square w-64 h-64 mx-auto">
                <Doughnut data={data} options={options} />
            </div>
            <span className="text-xs text-center text-textSecoundary mx-auto">
                Nombre totale de commandes reçu : {todayStats.total_notifications_received}
            </span>
            </>)}
        </div>
    )
}
