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
        graphWidgetData, graphWidgetBeginDate, graphWidgetEndDate,
        setGraphWidgetBeginDate, setGraphWidgetEndDate
    } = useStateContext();

    const [stateData, setStateData] = useState(data);
    const [startDate, setStartDate] = useState(graphWidgetBeginDate);
    const [endDate, setEndDate] = useState(graphWidgetEndDate);

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

    const handleStartChange = (e) => {
        setStartDate(e.target.value);
        console.log(e.target.value);
    };

    const handleEndChange = (e) => {
        setEndDate(e.target.value);
        console.log(e.target.value);
    };

    const handleDateChange = () => {
        if (startDate != graphWidgetBeginDate || endDate != graphWidgetEndDate) {
            const start = formatDateForSql(startDate);
            const end = formatDateForSql(endDate);
            setGraphWidgetBeginDate(start);
            setGraphWidgetEndDate(end);
            console.log("Start Date: ", start);
            console.log("End Date: ", end);
        }
    }

    return (
        <div className={`${className} bg-superClear rounded-xl shadow-md p-2 grid grid-rows-8`}>
            <div className="row-span-1 grid grid-rows-1 grid-cols-2">
                <span className="flex flex-row grow row-span-1 font-medium items-center">Meilleures Postes</span>
                <span className="flex flex-row grow row-span-1 text-sm justify-end items-center">
                    <span className="text-selectionBG">De</span>
                    {/* <span className="px-1 text-xs">{sqlToFrenchDateDaily(graphWidgetBeginDate)}</span> */}
                    <input type="date" className="text-end"
                        value={startDate}
                        onChange={handleStartChange}
                    />
                    {/* <AiFillCaretDown size="0.5rem" /> */}
                    <span className="text-selectionBG pl-2">Jusqu'à</span>
                    {/* <span className="px-1 text-xs">{sqlToFrenchDateDaily(graphWidgetEndDate)}</span> */}
                    <input type="date" className="text-end"
                        value={endDate}
                        onChange={handleEndChange}
                    />
                    {/* <AiFillCaretDown size="0.5rem" /> */}
                    <button className={(startDate != graphWidgetBeginDate || endDate != graphWidgetEndDate) ? "bg-primary p-2 rounded-lg mx-4 text-white cursor-pointer hover:bg-primary/90 active:bg-darkPrimary" : "bg-disabled p-2 rounded-lg mx-4 cursor-default text-textSecoundary"} onClick={() => handleDateChange()}>
                        <span className="inline-flex flex-row space-x-2 text-sm items-center px-2">Appliquer</span>
                    </button>
                </span>
            </div>
            <div className="row-span-7">
                <Line options={options} data={stateData} />
            </div>
        </div>);
}

export default WideGraph;