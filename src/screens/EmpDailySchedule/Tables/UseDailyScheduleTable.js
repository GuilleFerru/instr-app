import { useState, useEffect } from 'react'


export const useDailyScheduleTable = (scheduleEmpOfDay, initialAditionalColumn, columns) => {

    const [data, setData] = useState(scheduleEmpOfDay.employees);
    const [date, setDate] = useState(scheduleEmpOfDay.date);
    const [workedHours, setWorkedHours] = useState(scheduleEmpOfDay.workedHours);
    const [aditionalCount, setAditionalCount] = useState(0);
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


    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];

        if (oldRow.shift !== updatedRow.shift) {
            updatedRow.shift >= 8 && updatedRow.shift <= 15
                ? updatedRow.workedHours = 12 : updatedRow.shift === '16'
                    ? updatedRow.workedHours = 0 : updatedRow.workedHours = 8;
        }
        updatedRow.legajo !== updatedRow.fullName && (updatedRow.legajo = updatedRow.fullName);
        console.log(updatedRow.shift)
        updatedRows[index] = updatedRow;
        console.log(updatedRow)
        return updatedRows;
    }




    const handleAditional = (row) => {

        console.log(data)

        // const aditionalField = `additional_${row.legajo}_${aditionalCount}`;
        // const aditionalTitle = `Adicional ${aditionalCount}`;

        setAditionalCount(aditionalCount + 1)

        const newAditionalObject = {
            field: `additional_${aditionalCount}`,
            title: `Adicional ${aditionalCount}`,
            lookup: initialAditionalColumn.lookup,
        }
        data.map((emp, i) => {
            return emp[`additional_${aditionalCount}`] = ''
        })

        // setNewAditional(newAditionalObject)

        setDataColumns([...dataColumns, newAditionalObject])
        // setDataColumns([...data, `additional_${aditionalCount}`])

        // row[newAditionalObject.field] = 0;

    }

    useEffect(() => {
        console.log(date)

    }, [date])



    return {
        data,
        setData,
        date,
        setDate,
        workedHours,
        setWorkedHours,
        updateRow,
        handleAditional,
        dataColumns,
        handleDatePicker
    }
}
