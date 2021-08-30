import { useState, useEffect } from 'react'
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';


export const useDailyWorksTable = (dayWorks) => {

    const [data, setData] = useState(dayWorks[0].works);
    const [date, setDate] = useState(dayWorks[0].date);
    const [dayWork, setDayWork] = useState(dayWorks)
    const { handleDatePicker, bulkUpdate} = muiTableCommonActions(data, setData, setDate);


    const dayWorksUpdate = (updatedRows) => {
        const updateDayWork = [
            {
                date: date,
                works: [...updatedRows]
            }
        ];
        return updateDayWork;
    }

    const rowAdd = (newRow, resolve) => {
        const updatedRows = [...data, newRow];
        setData(updatedRows);
        setDayWork(dayWorksUpdate(updatedRows));
        resolve();
    }

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        updatedRows[index] = updatedRow;
        setDayWork(dayWorksUpdate(updatedRows));
        return updatedRows;
    }


    useEffect(() => {
        console.log(dayWork);
    }, [dayWork])


    return {
        data,
        setData,
        date,
        setDate,
        updateRow,
        bulkUpdate,
        handleDatePicker,
        rowAdd
    }
}
