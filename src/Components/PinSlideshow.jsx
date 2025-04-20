import React, { useState } from "react";
import { useStateContext } from "../Context/ContextProvider.jsx";

const PinSlideshow = ({ className }) => {

    const {
        pinNotif, unpinNotif, pinnedNotifs,
    } = useStateContext();

    return (
        <div className={`${className} bg-superClear rounded-xl shadow-md flex flex-col space-y-2 relative h-full p-4`}>
            <span className="font-bold text-xl">
                Épingles
            </span>
            {pinnedNotifs.length > 0 ? (
                <div id="carousel" className="relative w-full h-full">
                    <div className="relative overflow-hidden rounded-lg h-full">
                        <div
                            id="carouselInstance"
                            className="carousel h-full"
                            data-carousel
                        >
                            {pinnedNotifs.map((pin, index) => (
                                <div key={pin} className="carousel-item h-full">
                                    {/* <div ref={setContainerRef} className="flex justify-center items-center w-full h-full">
                                        <Document file={pin.url} onLoadSuccess={onDocumentLoadSuccess}>
                                            <Page
                                                pageNumber={1}
                                                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                                                height={containerHeight ? Math.min(containerHeight, maxHeight) : maxHeight}
                                                renderMode="svg"
                                                className="object-cover w-full h-full"
                                            />
                                        </Document>
                                    </div> */}
                                    <span>
                                        {pin.comment}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {pinnedNotifs.length > 1 ? (<button
                        type="button"
                        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-prev
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg
                                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>) : <></>}
                    {pinnedNotifs.length > 1 ? (<button
                        type="button"
                        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-next
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg
                                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>) : <></>}
                </div>
            ) : (
                <span className="text-textSecoundary text-center">
                    No pinned notifications available.
                </span>
            )}
        </div>
    );
}

export default PinSlideshow;