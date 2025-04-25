import React from "react";
import { formatDate } from "../Utils/Functions.jsx";

const Carousel = ({ pinnedNotifs, index }) => {
    return ( 
        <div className={`overflow-hidden relative w-full h-full`}>
        <div className={`inline-flex transition ease-out duration-75`}
        style={{
            transform: `translateX(-${index * 100}%)`,
            width: `${pinnedNotifs.length * 100}%`,
        }}
        >
            {pinnedNotifs.map((pin, mapIndex) => (
                                    <div 
                                        key={mapIndex} 
                                        className="flex flex-col justify-start items-start w-full h-full"
                                        style={{ flex: "0 0 100%" }}
                                    >
                                        <span className="font-medium text-sm">
                                            {pin.name}
                                        </span>
                                        <span className="text-textSecoundary text-sm">
                                            {formatDate((new Date()) - pin.timestamp)}
                                        </span>
                                            <span className="mt-4 text-sm">
                                                Commentaire: 
                                            </span>
                                                <span className="text-textSecoundary text-sm m-1">
                                                {pin.comment && pin.comment != "" ? pin.comment : "Aucun commentaire"}
                                                </span>
                                    </div>
                            ))}
                            </div>
        </div>
     );
}
 
export default Carousel;