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

const Dashboard = () => {

    const {
        todayStats, setDailyWidgetDate, dailyWidgetData, setGraphWidgetBeginDate, setGraphWidgetEndDate,
        dailyWidgetDate, graphWidgetData, graphWidgetBeginDate, graphWidgetEndDate, pinnedNotifs,
    } = useStateContext();

    return (
        <>
            <DashHeader className="hidden sm:flex row-span-3 col-span-12 ml-4" />
            <div className="row-span-5 col-span-12 flex-col space-y-4 small:space-y-0 small:flex small:flex-row small:justify-stretch small:space-x-4">

                {!todayStats && (<div className={`w-full flex justify-center items-center`}>
                    <LoadingSpinner />
                </div>)}
                {todayStats && (<DashCard className={`w-full`} post="Admin" name="You" adress="Boulevard des lions" imgSrc={pfp4} todaySales={todayStats && todayStats.total_sales} />)}

                {!dailyWidgetData && (<div className={`min-w-44 min-h-44 flex justify-center items-center`}>
                    <LoadingSpinner />
                </div>)}
                {dailyWidgetData && (<DailyIncome className={`min-w-44 min-h-44`} values={dailyWidgetData && dailyWidgetData.length > 0 && getTotalSalesForDates(dailyWidgetData, dailyWidgetDate)} />)}

                {!pinnedNotifs && (<div className={`w-full flex justify-center items-center`}>
                    <LoadingSpinner />
                </div>)}
                {pinnedNotifs && (<PinSlideshow className='w-full' />)}

            </div>

            {!graphWidgetData && (<div className={`row-span-6 col-span-12 flex justify-center items-center`}>
                <LoadingSpinner />
            </div>)}
            {graphWidgetData && (<WideGraph className={`row-span-6 col-span-12`} />)}
        </>
    );
}

export default Dashboard;