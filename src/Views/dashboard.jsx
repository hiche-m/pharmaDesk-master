import React from "react";
import pfp4 from "../Assets/Images/pfp4.svg"
import DashCard from "../Components/DashboardCard.jsx";
import DashHeader from "../Components/DashboardHeader.jsx";
import WideGraph from "../Components/WideGraph.jsx";
import DailyIncome from "../Components/DailyIncome.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";
import { getTotalSalesForDates } from "../Utils/Functions.jsx";

const Dashboard = () => {

    const {
        todayStats, setDailyWidgetDate, dailyWidgetData, setGraphWidgetBeginDate, setGraphWidgetEndDate,
        graphWidgetData, dailyWidgetDate, graphWidgetBeginDate, graphWidgetEndDate
    } = useStateContext();

    return (
        <>
            <DashHeader className="hidden sm:flex row-span-3 col-span-12 ml-4" />
            <div className="row-span-5 col-span-12 flex-col space-y-4 small:space-y-0 small:flex small:flex-row small:justify-stretch small:space-x-4">
                <DashCard className={`${!todayStats ? 'blur-md pointer-events-none' : ''} w-full`} post="Admin" name="You" adress="Boulevard des lions" imgSrc={pfp4} todaySales={todayStats && todayStats.total_sales} />
                <DashCard className='w-full' name="Dexter Elliot" adress="Boulevard des lions" />
                <DailyIncome className={`${!dailyWidgetData ? 'blur-md pointer-events-none' : ''} min-w-44 min-h-44`} values={dailyWidgetData && dailyWidgetData.length > 0 && getTotalSalesForDates(dailyWidgetData, dailyWidgetDate)} />
            </div>
            <WideGraph className={`${!graphWidgetData ? 'blur-md pointer-events-none' : ''} row-span-6 col-span-12`} />
        </>
    );
}

export default Dashboard;