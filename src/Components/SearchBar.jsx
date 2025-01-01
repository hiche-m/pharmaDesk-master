import React from "react";
import { BiSearch } from "react-icons/bi";
import { tailwindColors } from "../Utils/Colors.jsx";

const SearchBar = () => {
    return (<div className="bg-lightShapes rounded-full inline-flex flex-row items-center px-2">
        <input className="w-28 p-2 bg-transparent outline-none text-textPrimary placeholder:font-normal" placeholder="Rechercher..." />
        <BiSearch size="1.5rem" color={tailwindColors.textSecoundary} />
    </div>);
}

export default SearchBar;