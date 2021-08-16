import { useState, useEffect } from 'react'


export const useDailyScheduleTable = (scheduleEmpOfDay, initialAditionalColumn, columns) => {

    const [data, setData] = useState(scheduleEmpOfDay.employees);
    const [date, setDate] = useState(scheduleEmpOfDay.date);
    const [workedHours, setWorkedHours] = useState(scheduleEmpOfDay.workedHours);
    const [aditionalCount, setAditionalCount] = useState(1);
    const [dataColumns, setDataColumns] = useState(columns);
    // const [aditionalField, setAditionalField] = useState('');
    // const [aditionalTitle, setAditionalTitle] = useState('');

    // const renderColumns = [
    //     dataColumns.map(data => {
    //         return {
    //             field: data.field,
    //             title: data.title,
    //             render: rowData =>
    //                 (<div style={{ minWidth: data.field === "columnToChange" ? "250px" : null, paddingLeft: "10px" }}>  {rowData[data.field]}  </div>)
    //         };
    //     })
    // ]

    // setDataColumns(
    //     renderColumns
    // )

    const handleDatePicker = e => {
        setDate(e.target.value.toDateString())
    }

    const compareOldAndNewData = (oldData, newData) => {

        // try{
        //     console.log(newData.aditional_1)
        // }catch (error){
        //     console.log(error)
        // }

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
            compareOldAndNewData(emp.oldData,emp.newData);
            updatedRows[index] = emp.newData;
            setData(updatedRows);
            resolve();
            return ''
        })
    }

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        compareOldAndNewData(oldRow,updatedRow)
        updatedRows[index] = updatedRow;
        return updatedRows;
    }




    const handleAditional = () => {

        setAditionalCount(aditionalCount + 1)

        const newAditionalObject = {
            field: `additional_${aditionalCount}`,
            title: `Adicional ${aditionalCount}`,
            lookup: initialAditionalColumn.lookup,
        }
        setDataColumns([...dataColumns, newAditionalObject])

        // const dataAditional = `additional_${aditionalCount}`;

        // const updatedData = data.map(emp => ({...emp, dataAditional}))

        // setData(updatedData)

        // setNewAditional(newAditionalObject)

        // setDataColumns([...data, `additional_${aditionalCount}`])

        // row[newAditionalObject.field] = 0;

    }

    useEffect(() => {

        // console.log(data)
    }, [])



    return {
        data,
        setData,
        date,
        setDate,
        workedHours,
        setWorkedHours,
        updateRow,
        bulkUpdate,
        handleAditional,
        dataColumns,
        handleDatePicker
    }
}
