import { useState, useEffect } from 'react'


export const useDailyWorksTable = (dayWorks) => {

    const [data, setData] = useState(dayWorks.works);
    const [date, setDate] = useState(dayWorks.date);
    
   

    const handleDatePicker = e => {
        setDate(e.target.value.toDateString())
    }

    const compareOldAndNewData = (oldData, newData) => {
        if (oldData.shift !== newData.shift) {
            newData.shift >= 8 && newData.shift <= 15
                ? newData.workedHours = 12 : newData.shift === '16'
                    ? newData.workedHours = 0 : newData.workedHours = 8;
        }
        newData.legajo !== newData.fullName && (newData.legajo = newData.fullName);
    }

    const bulkUpdate = (selectedRows, resolve) => {
        const rows = Object.values(selectedRows);
        const updatedRows = [...data];
        rows.map(emp => {
            const index = emp.oldData.tableData.id;
            compareOldAndNewData(emp.oldData, emp.newData);
            updatedRows[index] = emp.newData;
            setData(updatedRows);
            resolve();
            return ''
        })
    }

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        compareOldAndNewData(oldRow, updatedRow)
        updatedRows[index] = updatedRow;
        return updatedRows;
    }




    // const handleAditional = () => {

    //     setAditionalCount(aditionalCount + 1)

    //     const adictionanlSelect = {
    //         field: `additional_${aditionalCount}`,
    //         title: `Adicional ${aditionalCount}`,
    //         lookup: adicionales,
    //         align: 'right',
    //     }
    //     const aditionalInput = {
    //         field: `additional_${aditionalCount}_info`,
    //         title: `Anexo ${aditionalCount}`,
    //         align: 'left',
    //     }

    //     setDataColumns([...dataColumns, adictionanlSelect, aditionalInput])

    // }

    useEffect(() => {

        // console.log(data)
    }, [])



    return {
        data,
        setData,
        date,
        setDate,
        updateRow,
        bulkUpdate,
        
        handleDatePicker
    }
}
