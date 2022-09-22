import React, { createContext, useState } from 'react';
export const DateContext = createContext();
export const DateComponentContext = props => {

    const [date, setDate] = useState(new Date());
    const [routineDate, setRoutineDate] = useState(null);

    const getNewDate = (newDate) => {
        setDate(newDate);
    }
    const handleRoutineDate = (newRoutineDate) => {
        setRoutineDate(newRoutineDate);
    }

    return <DateContext.Provider value={{ date, getNewDate, handleRoutineDate, routineDate }}>
        {props.children}
    </DateContext.Provider>
}


