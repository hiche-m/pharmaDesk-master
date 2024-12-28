import React, { useEffect, useState } from "react";

const SettingsInput = ({ label, placeholder, onChange, value = '', flexible = false, large = false, obscure = false }) => {

    const handleOnChange = (val) => {
        if (onChange) {
            onChange(val);
        }
    }

    return (<div className="flex flex-col space-y-2 py-2">
        {label && (<span className="text- font-medium">{label}</span>)}
        {large ?
            (<textarea className={`bg-lightShapes p-2 outline-none rounded-md ${flexible ? '' : 'w-40'} resize-none`} placeholder={placeholder} value={value ? value : ''} onChange={(event) => handleOnChange(event.target.value)} />)
            : (<input className={`bg-lightShapes p-2 outline-none rounded-md ${flexible ? '' : 'w-40'}`} placeholder={placeholder} value={value ? value : ''} onChange={(event) => handleOnChange(event.target.value)} type={obscure ? 'password' : 'text'} />)}
    </div>);
}

export default SettingsInput;