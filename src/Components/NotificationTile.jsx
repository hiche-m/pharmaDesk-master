import React, { useEffect } from "react";
import persp from "../Assets/Images/persp.svg"
import { formatDate } from "../Utils/Functions.jsx";

const NotificationTile = ({ handleClick = () => { }, tile, index, isConfirm = false }) => {

    const timestamp = new Date(tile.created_at);

    const formattedTime = formatDate((new Date()) - timestamp);

    return (
        <div onClick={handleClick} className={`flex flex-row p-4 justify-start items-center bg-superClear "bg-opacity-75" rounded-xl "shadow-lg" cursor-pointer hover:bg-opacity-95 active:bg-disabled active:shadow-none`}>
            <img src={persp} className="rounded-full w-1/5 mr-4" />
            <div className="flex flex-col mr-2 text-sm">
                {/* tile.type === "order" && <span className="text-textSecoundary">Nouvelle commande</span> */}
                <span>{isConfirm ? "Confirmez-vous la vente à " : "Vous avez reçu une commande de "}<span className="font-medium">{tile.firstname}</span>{isConfirm ? "?" : "."}</span>
                <span className="text-textSecoundary italic">Appuyez ici pour ouvrir</span>
            </div>
            <div className="text-xs italic text-center">{formattedTime}</div>
        </div>
    );
}

export default NotificationTile;