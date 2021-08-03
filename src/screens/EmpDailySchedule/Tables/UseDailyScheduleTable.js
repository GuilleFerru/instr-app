import {useState} from 'react'

export const useDailyScheduleTable = (scheduleEmpOfDay) => {

    const [data, setData] = useState(scheduleEmpOfDay);

    return {
        data,
        setData,
    }
}
