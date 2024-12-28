import React, { useState, useRef, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const DropdownMenu = ({ options, label, selectedValue, onSelect, disabled = false, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className={`${className} relative inline-block text-left`}>
            {/* Button to trigger dropdown */}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={`${disabled ? 'border-gray-500' : 'border-primary'} border-2 bg-superClear ${disabled ? 'text-textSecoundary' : 'text-textPrimary'} px-2 py-2 rounded-md inline-flex justify-around items-center focus:outline-none z-0`}
            >
                <span className="px-2">
                    {!label ? selectedValue : selectedValue ? options.filter(option => option.value === selectedValue)[0].label : label}
                </span>
                <AiFillCaretDown className="text-primary" />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50"
                >
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => {
                                    onSelect(option.value); // Trigger the onSelect callback
                                    setIsOpen(false); // Close the dropdown after selecting an option
                                }}
                                className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 ${selectedValue === option.value ? "bg-gray-200" : ""
                                    }`}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
