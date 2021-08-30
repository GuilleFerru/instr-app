export const muiTableCommonActions = (data, setData, setDate) => {

    const handleDatePicker = e => {
        // console.log(e.target.value.toDateString())
        setDate(e.target.value.toDateString())
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
            return ''
        })
    }

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        updatedRows[index] = updatedRow;
        return updatedRows;
    }

    return {
        handleDatePicker,
        bulkUpdate,
        updateRow,
        rowAdd

    }
}
