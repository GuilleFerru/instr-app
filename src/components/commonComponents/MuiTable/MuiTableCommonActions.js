export const muiTableCommonActions = (data, setData, getNewDate) => {

    const handleDatePicker = e => {
        getNewDate(e.target.value)
    }

    const rowAdd = (newRow, resolve) => {
        const updatedRows = [...data, newRow];
        setData(updatedRows);
        resolve();
        return ''
    }

    const bulkUpdate = (selectedRows, resolve) => {
        const rows = Object.values(selectedRows);
        const updatedRows = [...data];
        rows.map(row => {
            const index = row.oldData.tableData.id;
            updatedRows[index] = row.newData;
            setData(updatedRows);
            resolve();
            return '';
        })
    }

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        updatedRows[index] = updatedRow;
        return updatedRows;
    }

    // const deleteRow = (selectedRow, resolve) => {
        
    //     const index = selectedRow.tableData.id
    //     console.log(index)
    //     console.log(data)
    //     const updatedRows = [...data]
        
    //     updatedRows.splice(index, 1)
    //     setData(updatedRows)
    //     resolve();
        
    // }

    return {
        handleDatePicker,
        bulkUpdate,
        updateRow,
        rowAdd,
        

    }
}
