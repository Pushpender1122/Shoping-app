import React, { createContext, useState } from 'react'
export const SerachlistProvider = createContext();
const SearchContext = ({ children }) => {
    const [serachList, setSearchList] = useState('');
    return (
        <SerachlistProvider.Provider value={{
            serachList,
            setSearchList
        }}>
            {children}
        </SerachlistProvider.Provider>
    )
}

export default SearchContext
