import React, { useEffect } from "react";
import persp from "../Assets/Images/persp.svg"
import { formatDate } from "../Utils/Functions.jsx";

<<<<<<< HEAD
const NotificationTile = ({ handleClick = () => { }, tile, index, isConfirm = false }) => {
=======
const NotificationTile = ({ handleClick = () => { }, tile, index }) => {
>>>>>>> 68eb42d746b61bf73ca6cf3b28376e7d3e7921e1

    const timestamp = new Date(tile.created_at);

    const formattedTime = formatDate((new Date()) - timestamp);

<<<<<<< HEAD
=======

>>>>>>> 68eb42d746b61bf73ca6cf3b28376e7d3e7921e1
    return (
        <div onClick={handleClick} className={`flex flex-row p-4 justify-start items-center bg-superClear "bg-opacity-75" rounded-xl "shadow-lg" cursor-pointer hover:bg-opacity-95 active:bg-disabled active:shadow-none`}>
            <img src={persp} className="rounded-full w-1/5 mr-4" />
            <div className="flex flex-col mr-2 text-sm">
<<<<<<< HEAD
                {/* tile.type === "order" && <span className="text-textSecoundary">Nouvelle commande</span> */}
                <span>{isConfirm ? "Confirmez-vous l'achat de " : "Vous avez reçu une commande de "}<span className="font-medium">{tile.firstname}</span>{isConfirm ? "?" : "."}</span>
                <span className="text-textSecoundary italic">Appuyez ici pour ouvrir</span>
=======
                <span>Vous avez reçu une commande de <span className="font-medium">{tile.firstname}</span>.</span>
                <span className="text-textSecoundary italic">Appuyez ici pour voir l'ordonnance</span>
>>>>>>> 68eb42d746b61bf73ca6cf3b28376e7d3e7921e1
            </div>
            <div className="text-xs italic text-center">{formattedTime}</div>
        </div>
    );
}

export default NotificationTile;