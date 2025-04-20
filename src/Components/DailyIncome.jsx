import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { calcPercentage, capFix, drawCircle, drawLine, formatNumberWithComma, formattedPreviousDates, getFullMonthNameInFrench, getTotalSalesForDates, sqlToFrenchDateDaily } from "../Utils/Functions.jsx";
import { BiRefresh } from "react-icons/bi";
import { useStateContext } from "../Context/ContextProvider.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

const DailyIncome = ({ className = "", dotWidth = 5 }) => {

    const canvasRef = useRef(null);

    const {
        dailyWidgetData, dailyWidgetDate
    } = useStateContext();

    const [result, setResult] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (dailyWidgetData && !result && canvasRef) {
            try {
                const values = getTotalSalesForDates(dailyWidgetData, dailyWidgetDate)

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

                console.log(values);


                drawLine(ctx, third - third / 2, // X1
                    (height * (1 - calcPercentage(values[1], values[0]))) + (values[0] > values[1] ? dotWidth + 2 : -dotWidth - 2), // Y1
                    2 * third - third / 2, // X2
                    height * 0.5); // Y2
                drawLine(ctx, 2 * third - third / 2, // X1
                    height * 0.5, // Y1
                    width - third / 2, // X2
                    (height * (1 - calcPercentage(values[1], values[2]))) + (values[2] > values[1] ? dotWidth + 2 : -dotWidth - 2)); // Y2

                drawCircle(ctx, third - third / 2, // X
                    (height * (1 - calcPercentage(values[1], values[0]))) + (values[0] > values[1] ? dotWidth + 2 : -dotWidth - 2), // Y
                    dotWidth);
                drawCircle(ctx, 2 * third - third / 2, // X
                    height * 0.5, // Y
                    dotWidth);
                drawCircle(ctx, width - third / 2, // X
                    (height * (1 - calcPercentage(values[1], values[2]))) + (values[2] > values[1] ? dotWidth + 2 : -dotWidth - 2), // Y
                    dotWidth);

                if (hasError) {
                    setHasError(false);
                }
            } catch (error) {
                console.log(error);
                setHasError(true);
            }
            setIsLoading(false);
        }
    }, [dailyWidgetData, result, canvasRef]);

    return (<div className={`${className} bg-superClear rounded-xl shadow-md p-4 flex flex-col justify-center items-center`}>
        {isLoading && (<LoadingSpinner />)}

        {!isLoading && hasError && (<div className="flex flex-col justify-center items-center h-full w-full">
            <span className="text-red-500 text-sm">Erreur de chargement</span>
            <span className="text-textSecoundary text-xs">Veuillez réessayer plus tard</span>
            <BiRefresh className="text-textSecoundary text-2xl cursor-pointer" onClick={() => setResult(null)} />
        </div>)}

        {!isLoading && !hasError && (
            <div className="flex flex-row h-max items-center justify-between w-full">
                <span className="flex flex-row grow text-sm items-center justify-start font-medium">Profits quotidiens</span>
                <span className="px-1 text-xs">{capFix(getFullMonthNameInFrench(formattedPreviousDates(dailyWidgetDate, 1)))}</span>
            </div>)}
        <div className="relative h-full w-full">
            {/* Canvas overlay */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none"
            ></canvas>
            {!isLoading && !hasError && (<div className="grid grid-cols-3 grid-rows-1 h-full mt-5 text-center pb-6">
                <span className="col-span-1 row-span-1 text-textSecoundary flex flex-col items-center justify-end text-sm pb-2 px-2">{sqlToFrenchDateDaily(formattedPreviousDates(dailyWidgetDate, 2))}</span>
                <div className="col-span-1 row-span-1 flex flex-col justify-between items-center bg-darkPrimary p-2 rounded-xl text-white text-sm">
                    <span className="font-medium">{formatNumberWithComma(result[1])} Ventes</span>
                    <span>{sqlToFrenchDateDaily(formattedPreviousDates(dailyWidgetDate, 1))}</span>
                </div>
                <span className="col-span-1 row-span-1 text-textSecoundary flex flex-col items-center justify-end text-sm pb-2 px-2">{sqlToFrenchDateDaily(dailyWidgetDate)}</span>
            </div>)}
        </div>
    </div>);
}

export default DailyIncome;