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


    const addAditional = (tableIcons, handleAditional) => ({
        tooltip: 'Agregar Adicional',
        icon: tableIcons.Aditional,
        isFreeAction: true,
        onClick: () => handleAditional() ? handleAditional() : null,

    })

    const completeTask = (tableIcons, handleRoutineSchedule, rowData) => ({
        tooltip: 'Completar Tarea',
        icon: tableIcons.Complete,
        onClick: (evt, data) => handleRoutineSchedule(data) ? handleRoutineSchedule(data) : null,
        hidden: (rowData.checkDay !== undefined && /[aeiou]/g.test(rowData.checkDay)) || (rowData.complete === 'C')
    })

    const watchTask = (rowData, Link, monthAndYear, ListAltIcon) => ({
        tooltip: rowData.complete === 'P' && !/[aeiou]/g.test(rowData.checkDay) ? 'Debe completar la tarea' : 'Ver mas',
        icon: () => <Link to={{
            pathname: `/rutinas/rutinasDetalles`,
            state: {
                routineScheduleId: rowData.id,
                nickname: rowData.nickname,
                tag: rowData.tag,
                monthAndYear: monthAndYear,
                from: 'rutinas'
            },
        }} style={{ textDecoration: 'none', color: 'inherit' }}> <ListAltIcon /></Link>,
        disabled: rowData.complete === 'P' && !/[aeiou]/g.test(rowData.checkDay) ? true : false,
    })

    const goToDate = (Link, rowData, ListAltIcon, parseStringToDate) => ({
        tooltip: 'Ir a fecha',
        icon: () => <Link to={{
            pathname: `/tareasDiarias`,
            state: {
                id: rowData.id,
                from: 'rutinas'
            },
        }} style={{ textDecoration: 'none', color: 'inherit' }}> <ListAltIcon /></Link>,
        onClick: () => getNewDate(parseStringToDate(rowData.beginDate)),
    })

    const duplicateRow = (tableIcons, materialTableRef, setInitialFormData) => ({
        tooltip: 'Duplicar fila',
        icon: tableIcons.Duplicate,
        onClick: (_evt, rowData) => {
            const materialTable = materialTableRef.current;
            const { tableData, id, tag, ...dataRest } = rowData
            setInitialFormData({
                id: 0,
                tag: '',
                ...dataRest
            });
            materialTable.dataManager.changeRowEditing();
            materialTable.setState({
                ...materialTable.dataManager.getRenderState(),
                showAddRow: true,
            });
        },

    })

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
        addAditional,
        completeTask,
        watchTask,
        goToDate,
        duplicateRow
        // bulkUpdate,
        // updateRow,
        // rowAdd,


    }
}
