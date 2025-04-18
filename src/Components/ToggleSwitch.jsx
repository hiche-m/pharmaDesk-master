import React, { useState } from 'react';

const ToggleSwitch = ({ value, toggleSwitch, className }) => {

    return (
        <div
            className={`relative inline-flex items-center min-h-6 max-h-6 rounded-full min-w-11 max-w-11 cursor-pointer transition-colors duration-300 ${value ? 'bg-primary' : 'bg-gray-400'
                } ${className}`}
            onClick={() => toggleSwitch()}
        >
            <span
                className={`transform transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-1'
                    } inline-block min-w-4 max-w-4 min-h-4 max-h-4 bg-white rounded-full`}
            ></span>
        </div>
    );
};

export default ToggleSwitch;
