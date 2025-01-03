import { Chart as ChartJS, CategoryScale, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { data, formatPrescriptionData, options } from "../Utils/Data/WideGraphData.jsx";
import { AiFillCaretDown } from "react-icons/ai";
import { formatDateForSql, sqlToFrenchDateDaily } from "../Utils/Functions.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";

const WideGraph = ({ className = "" }) => {
    ChartJS.register(CategoryScale,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        Title,
        Tooltip);

    const {
        graphWidgetData, graphWidgetBeginDate, graphWidgetEndDate
    } = useStateContext();

    const [stateData, setStateData] = useState(data);

    useEffect(() => {
        if (graphWidgetBeginDate && graphWidgetEndDate && graphWidgetData) {
            const dataObject = formatPrescriptionData(graphWidgetData, graphWidgetBeginDate, graphWidgetEndDate);
            setStateData({
                labels: dataObject.labels,
                datasets: [
                    {
                        ...stateData.datasets[0],
                        data: [
                            null,
                            ...dataObject.confirmed,
                            null,
                        ]
                    },
                    {
                        ...stateData.datasets[1],
                        data: [
                            null,
                            ...dataObject.received,
                            null,
                        ]
                    }
                ],
            });
        }
    }, [graphWidgetData]);

    return (
        <div className={`${className} bg-superClear rounded-xl shadow-md p-2 grid grid-rows-8`}>
            <div className="row-span-1 grid grid-rows-1 grid-cols-2">
                <span className="flex flex-row grow row-span-1 font-medium items-center">Meilleures Postes</span>
                <span className="flex flex-row grow row-span-1 text-sm justify-end items-center">
                    <span className="text-selectionBG">De</span>
                    <span className="px-1 text-xs">{sqlToFrenchDateDaily(graphWidgetBeginDate)}</span>
                    <AiFillCaretDown size="0.5rem" />
                    <span className="text-selectionBG pl-2">Jusqu'à</span>
                    <span className="px-1 text-xs">{sqlToFrenchDateDaily(graphWidgetEndDate)}</span>
                    <AiFillCaretDown size="0.5rem" />
                </span>
            </div>
            <div className="row-span-7">
                <Line options={options} data={stateData} />
            </div>
        </div>);
}

export default WideGraph;