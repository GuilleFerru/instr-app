export const muiTableCommonActions = (getNewDate) => {

    const handleDatePicker = e => {
        getNewDate(e.target.value)
    }

    const getNewDataBulkEdit = (changes, copyData) => {
        const keys = Object.keys(changes);
        keys.forEach(id => {
            if (changes[id] && changes[id].newData) {
                const targetData = copyData.find((elem) => elem.id === id);
                if (targetData) {
                    const newTargetData = copyData.indexOf(targetData);
                    copyData[newTargetData] = changes[id].newData;
                }
            }
        });
        return copyData;
    }

    // const rowAdd = (newRow, resolve) => {
    //     const updatedRows = [...data, newRow];
    //     setData(updatedRows);
    //     resolve();
    //     return ''
    // }

    // const bulkUpdate = (selectedRows, resolve) => {
    //     const rows = Object.values(selectedRows);
    //     const updatedRows = [...data];
    //     rows.map(row => {
    //         const index = row.oldData.tableData.id;
    //         updatedRows[index] = row.newData;
    //         setData(updatedRows);
    //         resolve();
    //         return '';
    //     })
    // }

    // const updateRow = (updatedRow, oldRow) => {
    //     const index = oldRow.tableData.id;
    //     const updatedRows = [...data];
    //     updatedRows[index] = updatedRow;
    //     return updatedRows;
    // }

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
        getNewDataBulkEdit,
        // bulkUpdate,
        // updateRow,
        // rowAdd,


    }
}
