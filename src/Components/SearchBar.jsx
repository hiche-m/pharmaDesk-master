import React from "react";
import { BiSearch } from "react-icons/bi";
import { tailwindColors } from "../Utils/Colors.jsx";

const SearchBar = () => {
    return (<div className="bg-superClear rounded-full inline-flex flex-row grow items-center justify-between px-2 my-4">
        <input className="w-28 p-2 bg-transparent outline-none text-textSecoundary placeholder:font-normal" placeholder="Rechercher..." />
        <BiSearch size="1.5rem" className="text-disabled" />
    </div>);
}

export default SearchBar;