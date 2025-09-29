import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ placeholder = "Rechercher...", value, onSearch }) => {
    return (
        <div className="bg-superClear rounded-full inline-flex flex-row grow items-center justify-between px-2 my-4">
            <input
                className="w-full p-2 bg-transparent outline-none text-textSecoundary placeholder:font-normal"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <BiSearch size="1.5rem" className="text-disabled" />
        </div>
    );
};

export default SearchBar;
