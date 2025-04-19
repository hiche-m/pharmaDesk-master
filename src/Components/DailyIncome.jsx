import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { calcPercentage, drawCircle, drawLine, formatNumberWithComma, formattedPreviousDates, getFullMonthNameInFrench, getTotalSalesForDates, sqlToFrenchDateDaily } from "../Utils/Functions.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";

const DailyIncome = ({ className = "", dotWidth = 5 }) => {

    const canvasRef = useRef(null);

    const {
        dailyWidgetData, dailyWidgetDate
    } = useStateContext();

    const [result, setResult] = useState([0, 0, 0]);

    useEffect(() => {
        if (dailyWidgetData) {
            const values = getTotalSalesForDates(dailyWidgetData, dailyWidgetDate)

            console.log(dailyWidgetData);
            console.log(values);

            setResult(values);

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions based on its container
            const { width, height } = canvas.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;

            const third = width / 3;

            // Example drawing on the canvas
            ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            ctx.fillRect(0, 0, width, height);
            ctx.beginPath();

            drawLine(ctx, third - third / 2,
                height * (1 - calcPercentage(values[1], values[0])),
                2 * third - third / 2,
                height * 0.5);
            drawLine(ctx, 2 * third - third / 2,
                height * 0.5,
                width - third / 2,
                height * (1 - calcPercentage(values[1], values[2])));

            drawCircle(ctx, third - third / 2,
                height * (1 - calcPercentage(values[1], values[0])),
                dotWidth);
            drawCircle(ctx, 2 * third - third / 2,
                height * 0.5,
                dotWidth);
            drawCircle(ctx, width - third / 2,
                height * (1 - calcPercentage(values[1], values[2])),
                dotWidth);
        }
    }, [dailyWidgetData]);

    return (<div className={`${className} bg-superClear rounded-xl shadow-md p-2 flex flex-col`}>
        <div className="flex flex-row h-max">
            <span className="flex flex-row grow text-sm items-center justify-start font-medium">Profits quotidiens</span>
            <span className="flex flex-row grow row-span-1 text-xs justify-end items-center">
                <span className="px-1">{getFullMonthNameInFrench(formattedPreviousDates(dailyWidgetDate, 1))}</span>
                <AiFillCaretDown size="0.5rem" />
            </span>
        </div>
        <div className="relative h-full w-full p-2">
            {/* Canvas overlay */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none"
            ></canvas>
            <div className="grid grid-cols-3 grid-rows-1 h-full mt-5 text-center pb-6">
                <span className="col-span-1 row-span-1 text-textSecoundary flex flex-col items-center justify-end text-sm pb-2 px-2">{sqlToFrenchDateDaily(formattedPreviousDates(dailyWidgetDate, 2))}</span>
                <div className="col-span-1 row-span-1 flex flex-col justify-between items-center bg-darkPrimary p-2 rounded-xl text-white text-sm">
                    <span className="font-medium">{formatNumberWithComma(result[1])} Ventes</span>
                    <span>{sqlToFrenchDateDaily(formattedPreviousDates(dailyWidgetDate, 1))}</span>
                </div>
                <span className="col-span-1 row-span-1 text-textSecoundary flex flex-col items-center justify-end text-sm pb-2 px-2">{sqlToFrenchDateDaily(dailyWidgetDate)}</span>
            </div>
        </div>
    </div>);
}

export default DailyIncome;