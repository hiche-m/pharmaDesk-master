import { Chart as ChartJS, CategoryScale, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { data, formatPrescriptionData, options } from "../Utils/Data/WideGraphData.jsx";
import { AiFillCaretDown } from "react-icons/ai";
import { formatDateForSql, sqlToFrenchDateDaily } from "../Utils/Functions.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";
import CalendarComponent from "../Components/calander.jsx";
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
                    /* {
                        ...stateData.datasets[1],
                        data: [
                            null,
                            ...dataObject.received,
                            null,
                        ]
                    } */
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
    const [showCalendar, setShowCalendar] = useState(false);


    return (
        <>
        <div className={`${className} bg-superClear rounded-xl shadow-md p-2 grid grid-rows-8`}>
            <div className="row-span-1 grid grid-rows-1 grid-cols-2 px-2">
                <span className="flex flex-row grow row-span-1 font-medium items-center">Statistiques des ventes totales</span>
                <span className="flex flex-row grow row-span-1 text-sm justify-end items-center">
                    {/* <AiFillCaretDown size="0.5rem" /> */}
                    <button
                        className="bg-primary p-2 rounded-lg ml-4 text-white cursor-pointer hover:bg-primary/90 active:bg-darkPrimary"
                        onClick={() => setShowCalendar(!showCalendar)}
                        >
                        <span className="inline-flex flex-row space-x-2 text-sm items-center px-2">
                            Filtrer par date
                        </span>
                    </button>
                </span>
            </div>
            <div className="row-span-7">
                <Line options={options} data={stateData} />
            </div>
        </div>
        {showCalendar && (
  <div className="absolute z-50 bg-white shadow-lg p-4 rounded-lg">
    <CalendarComponent 
      onClose={() => setShowCalendar(false)} 
      onApply={({ start, end }) => {
        // format dates if needed
        const sqlStart = formatDateForSql(start);
        const sqlEnd = formatDateForSql(end);

        setGraphWidgetBeginDate(sqlStart);
        setGraphWidgetEndDate(sqlEnd);
        setShowCalendar(false);  // close calendar after apply
      }} 
    />
  </div>
)}
        </>
        );
}

export default WideGraph;