import React from "react";

const NotifictionsSkeleton = ({ length = 3 }) => {
    return (<>{Array.from({ length: length }, (_, index) => (
        <div key={`${index}-notification-sk`} role="status" className="flex flex-row animate-pulse p-4 justify-start items-center bg-superClear  bg-opacity-50 rounded-xl shadow-lg ">
            <div className="flex w-1/6 p-4 justify-center items-center rounded-full bg-disabled dark:bg-lightShapes">
                <svg className="w-full h-1/2 text-superClear dark:text-disabled" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
            <div className="flex flex-col grow space-y-3 justify-center items-center mx-2 text-sm">
                <span className="h-2 w-full bg-disabled rounded-full dark:bg-lightShapes" />
                <span className="h-2 w-full bg-disabled rounded-full dark:bg-lightShapes" />
            </div>
            <div className="h-2 w-5 bg-disabled rounded-full dark:bg-lightShapes" />
            <span className="sr-only">Loading...</span>
        </div>
    ))}</>
    );
}

export default NotifictionsSkeleton;