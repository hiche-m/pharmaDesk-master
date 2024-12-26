import React, { useState } from "react";

const SettingsInput = ({ label, placeholder, onChange, flexible = false, initialValue = '', large = false }) => {
    const [value, setValue] = useState(initialValue);
    const handleOnChange = (value) => {
        setValue(value);
        if (onChange) {
            onChange(value);
        }
    }
    return (<div className="flex flex-col space-y-2 py-2">
        {label && (<span className="text- font-medium">{label}</span>)}
        {large ?
            (<textarea className={`bg-lightShapes p-2 outline-none rounded-md ${flexible ? '' : 'w-40'} resize-none`} placeholder={placeholder} value={value} onChange={(event) => handleOnChange(event.target.value)} />)
            : (<input className={`bg-lightShapes p-2 outline-none rounded-md ${flexible ? '' : 'w-40'}`} placeholder={placeholder} value={value} onChange={(event) => handleOnChange(event.target.value)} />)}
    </div>);
}

export default SettingsInput;