import React, { createContext, useState } from 'react';

export const DateContext = createContext();

export const DateComponentContext = props => {

    const [date, setDate] = useState(new Date());

    const getNewDate = (newDate) => {
        setDate(newDate);
    }
    
    // useEffect(() => {
    //     console.log('DateComponentContext: useEffect', date);
    // }, [date]);

    return <DateContext.Provider value={{ date, getNewDate }}>
        {props.children}
    </DateContext.Provider>
}


// new Date().toLocaleString("es-AR", {dateStyle: 'short'})