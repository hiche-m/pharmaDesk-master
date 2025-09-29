import React, { useEffect } from "react";
import pfp4 from "../Assets/Images/pfp4.svg"
import DashCard from "../Components/DashboardCard.jsx";
import DashHeader from "../Components/DashboardHeader.jsx";
import WideGraph from "../Components/WideGraph.jsx";
import DailyIncome from "../Components/DailyIncome.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";
import { getTotalSalesForDates } from "../Utils/Functions.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import PinSlideshow from "../Components/PinSlideshow.jsx";
import CalendarComponent from "../Components/calander.jsx";
import LinearRadialBarWidget from "../Components/linearRadialBars.jsx";
import NestedDonutChart from "../Components/NestedDonutChart.jsx";

const Dashboard = () => {

    const {
        setDailyWidgetDate, dailyWidgetData, setGraphWidgetBeginDate, setGraphWidgetEndDate,
        dailyWidgetDate, graphWidgetData, graphWidgetBeginDate, graphWidgetEndDate, pinnedNotifs,
    } = useStateContext();
    const [showCalendar, setShowCalendar] = React.useState(false);
    

    const handleCloseCalendar = () => {
        setShowCalendar(false);
    };
        const { updateStats } = useStateContext();
    


    return (
        <>
            {/* <DashHeader className="hidden sm:flex row-span-3 col-span-12 ml-4" /> */}
            
            <div className="flex items-center row-span-5 col-span-12 pl-4 gap-60">
                <p className="text-lg font-medium pr-8">Dashboard</p>
                <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Filter by date
                </button>
             </div>
            <div className="row-span-5 col-span-12 flex-col space-y-4 pl-4 
                small:space-y-0 small:flex small:flex-row small:justify-stretch small:space-x-4">

                {/* Donuts big */}
                <div className="flex-[1.5] min-h-80">   {/* flex-grow 2 makes it larger */}
                    <NestedDonutChart />
                </div>

                {/* Graph widget */}
                {!dailyWidgetData && (
                    <div className="flex-[2] min-h-60 flex justify-center items-center">
                    <LoadingSpinner />
                    </div>
                )}

                {/* Pinned notif smaller */}
                {!pinnedNotifs && (
                    <div className="flex-[1] flex justify-center items-center">
                    <LoadingSpinner />
                    </div>
                )}
                {pinnedNotifs && (
                    <div className="flex-[1]">
                    <PinSlideshow className="w-full" />
                    </div>
                )}
            </div>


            {!graphWidgetData && (<div className={`row-span-6 col-span-12 flex justify-center items-center`}>
                <LoadingSpinner />
            </div>)}
            {graphWidgetData && (<WideGraph className={`row-span-6 col-span-12`} />)}
            {showCalendar && (
            <div className="absolute z-50 bg-white shadow-lg p-4 rounded-lg">
                <CalendarComponent onClose={handleCloseCalendar} onApply={({ start, end }) => {
      updateStats(start, end);  // 👈 refresh chart with selected range
    }}/>
            </div>
)}
        </>
    );
}

export default Dashboard;