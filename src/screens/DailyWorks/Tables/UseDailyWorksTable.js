import { useState, useEffect } from 'react'
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';


export const useDailyWorksTable = (dayWorks) => {

    const [data, setData] = useState(dayWorks[0].works);
    const [date, setDate] = useState(dayWorks[0].date);
    const [dayWork, setDayWork] = useState(dayWorks)
    const { handleDatePicker} = muiTableCommonActions(data, setData, setDate);


    const dayWorksUpdate = (updatedRows) => {
        
        const updateDayWork = [
            {
                date: [date],
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

    const bulkUpdate = (selectedRows, resolve) => {
        const rows = Object.values(selectedRows);
        const updatedRows = [...data];
        rows.map(row => {
            const index = row.oldData.tableData.id;
            updatedRows[index] = row.newData;
            setData(updatedRows);
            setDayWork(dayWorksUpdate(updatedRows));
            resolve();
            return ''
        })
    }

    return {
        data,
        setData,
        date,
        setDate,
        updateRow,
        bulkUpdate,
        handleDatePicker,
        rowAdd,
    }
}
