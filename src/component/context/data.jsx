import React, { createContext, useContext, useState } from "react";
export const idProvider = createContext();
const Dataprovider = ({ children }) => {
    const [id, setid] = useState('');
    return (
        <idProvider.Provider value={{
            id,
            setid

        }}>
            {children}
        </idProvider.Provider>
    )
}

export default Dataprovider