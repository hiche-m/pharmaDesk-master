import React from "react";
import pfp4 from "../Assets/Images/pfp4.svg"
import DashCard from "../Components/DashboardCard.jsx";
import DashHeader from "../Components/DashboardHeader.jsx";
import WideGraph from "../Components/WideGraph.jsx";
import DailyIncome from "../Components/DailyIncome.jsx";

const Dashboard = () => {
    return (
        <>
            <DashHeader className="hidden sm:flex row-span-3 col-span-12 ml-4" />
            <div className="row-span-5 col-span-12 flex-col space-y-4 small:space-y-0 small:flex small:flex-row small:justify-stretch small:space-x-4">
                <DashCard className='w-full' post="Admin" name="You" adress="Boulevard des lions" imgSrc={pfp4} />
                <DashCard className='w-full' name="Dexter Elliot" adress="Boulevard des lions" />
                <DailyIncome className='min-w-44 min-h-44' />
            </div>
            <WideGraph className="row-span-6 col-span-12" />
        </>
    );
}

export default Dashboard;