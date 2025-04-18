import React, { useEffect, useState } from "react";

const ActivityTile = ({ tile, color, last = false }) => {

    const [className, setClassName] = useState(null);

    useEffect(() => {
        if (className === null) {
            setClassName(`h-2 w-2 bg-[${color + "FF"}] rounded-full shadow-[0_0_0_6px_${color + "20"}] p-1 m-2`);
        }
    }, [className]);

    return (className !== null ? (<div className="flex flex-row min-h-10">
        <div className="flex flex-col">
            <span className={`h-2 w-2 rounded-full p-1 m-2`} style={{ boxShadow: `0 0 0 6px ${color}20`, backgroundColor: color }} />
            {!last ? (<div className="flex flex-row h-full">
                <div className="w-full h-full pr-1 border-r border-dashed border-green" />
                <div className="w-full h-full pr-1 border-l border-dashed border-textSecoundary" />
            </div>) : null}
        </div>
        <span className="text-sm pt-0.5 pl-1">Tu as vendu <span className="font-medium">3</span> médicaments à <span className="font-medium">Bir El Djir</span>.</span>
    </div>) : (<div>Loading...</div>));
}

export default ActivityTile; 