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


    const addAditional = (tableIcons, handleAditional, maxAditionalsReached) => ({
        tooltip: maxAditionalsReached ? 'No se pueden agregar mas adicionales' : 'Agregar Adicional',
        icon: tableIcons.Aditional,
        disabled: maxAditionalsReached,
        isFreeAction: true,
        onClick: () => handleAditional('add') ? handleAditional('add') : null,
    })

    const deleteAditional = (tableIcons, handleAditional, minAditionalReached) => ({
        tooltip: 'Eliminar último adicional',
        icon: tableIcons.DeleteSweep,
        hidden: minAditionalReached,
        isFreeAction: true,
        onClick: () => handleAditional('remove') ? handleAditional('remove') : null,
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

    const goToPlantShutdown = (Link, rowData, ListAltIcon) => ({
        tooltip: 'Ir a tareas de paro',
        icon: () => <Link to={{
            pathname: `/parosDePlanta/tareasParoDePlanta`,
            state: {
                id: rowData._id,
                name: rowData.name,
                beginDate: rowData.beginDate,
                timeSchedule: rowData.timeSchedule,
                complete: rowData.complete,
                from: 'parosDePlanta'
            },
        }} style={{ textDecoration: 'none', color: 'inherit' }}> <ListAltIcon /></Link>,
    })

    const goToPlantShutdownWorksToDo = (Link, WorkOffIcon) => ({
        tooltip: 'Tareas para paro sin asignar',
        isFreeAction: true,
        icon: () => <Link to={{
            pathname: `/parosDePlanta/tareasParoDePlantaSinAsignar`,
        }} style={{ textDecoration: 'none', color: 'inherit' }}> <WorkOffIcon /></Link>,
    })

    const updateShutdownWork = (tableIcons, setIsDialogOpen, setRowData) => ({
        tooltip: 'Actualizar tarea',
        icon: tableIcons.Update,
        onClick: (_evt, rowData) => {
            setIsDialogOpen(true)
            setRowData(rowData)
        },
    })

    const searchDailyWork = (tableIcons, setIsDialogOpen, getDailyWorkDataForSearch) => ({
        tooltip: 'Buscador avanzado',
        isFreeAction: true,
        icon: tableIcons.Search,
        onClick: (_evt) => {
            setIsDialogOpen(true)
            getDailyWorkDataForSearch()
        }
    }
    )

    const generateDailyShift = (tableIcons, setIsDialogOpen) => ({
        tooltip: 'Generar Parte Diario',
        isFreeAction: true,
        icon: tableIcons.DailyShift,
        onClick: (_evt) => {
            setIsDialogOpen(true)
        }
    })

    const createNewRoutine = (tableIcons, setIsDialogOpen) => ({
        tooltip: 'Crear nueva Rutina',
        isFreeAction: true,
        icon: tableIcons.Add,
        onClick: (_evt) => {
            setIsDialogOpen(true)
        }
    })



    return {
        handleDatePicker,
        getNewDataBulkEdit,
        addAditional,
        completeTask,
        watchTask,
        goToDate,
        duplicateRow,
        goToPlantShutdown,
        goToPlantShutdownWorksToDo,
        updateShutdownWork,
        searchDailyWork,
        generateDailyShift,
        deleteAditional,
        createNewRoutine
    }
}
