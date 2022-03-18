import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { MTableToolbar } from 'material-table';
import { tableIcons } from './tableIcons';
import { Link } from "react-router-dom";
import ListAltIcon from '@material-ui/icons/ListAlt';
import CircularProgress from '@material-ui/core/CircularProgress';

export const MuiTable = (
    {
        data,
        setData,
        title,
        datepicker,
        disableCheckButton,
        disableAditionalButton,
        disableAddButton,
        disableDeleteButton,
        disableOnRowUpdate,
        disableOnBulkUpdate,
        dataColumns,
        rowAdd,
        updateRow,
        bulkUpdate,
        deleteRow,
        handleAditional,
        pageSize,
        disableGroupingOption,
        handleRoutineSchedule,
        disableRoutinesDetails,
        disableCompleteTaskButton,
        disableDatePicker
    }) => {
    const positionRef = React.useRef();

    //arregla el browser freezing
    const columns = dataColumns.map((column) => {
        return { ...column };
    });

    const [selectedRow, setSelectedRow] = useState(null);
    // const [selectionEnable, setSelectionEnable] = useState(false);
    // const history = useHistory();
    // history.location.state = {
    //     selectedRow: selectedRow,
    //     selectionEnable: selectionEnable
    // }

    useEffect(() => {
        // console.log(data)
    }, [data])


    return (
        <div ref={positionRef}>
            <MaterialTable
                icons={tableIcons}
                title={title}
                data={data}
                columns={columns}
                localization={{
                    header: {
                        actions: 'Acciones'
                    },
                    body: {
                        emptyDataSourceMessage: <CircularProgress size='5rem' color="inherit" />,
                        deleteTooltip: 'Borrar Fila',
                        editTooltip: 'Editar Fila',
                        bulkEditTooltip: 'Editar todo',
                        bulkEditApprove: 'Aprobar',
                        bulkEditCancel: 'Cancelar',
                        addTooltip: 'Agregar',
                        filterRow: 'Filtrar por',
                        editRow: {
                            deleteText: 'Esta seguro de borrar esta fila?'
                        }
                    },
                    grouping: {
                        placeholder: 'Arrastre para agrupar',
                        groupedBy: 'Agrupado por'
                    },
                    toolbar: {
                        searchTooltip: 'Buscar',
                        searchPlaceholder: 'Buscar',
                        nRowsSelected: '{0} fila(s) seleccionada(s)',
                    },
                    pagination: {
                        labelRowsSelect: 'filas',
                        labelDisplayedRows: '{count} de {from}-{to}',
                        firstTooltip: 'Primera página',
                        previousTooltip: 'Página anterior',
                        nextTooltip: 'Próxima página',
                        lastTooltip: 'Última página'
                    }
                }}
                editable={{
                    onRowAdd: disableAddButton ? undefined : (newRow) => new Promise((resolve, _) => {
                        rowAdd(newRow, resolve);
                    }),
                    onRowDelete: disableDeleteButton ? undefined : selectedRow => new Promise((resolve, _) => {
                        deleteRow(selectedRow, resolve);
                    }),
                    onRowUpdate: disableOnRowUpdate ? undefined : (updatedRow, oldRow) => new Promise((resolve, _) => {
                        setData(updateRow(updatedRow, oldRow));
                        resolve();
                    }),
                    onBulkUpdate: disableOnBulkUpdate ? undefined : selectedRows => new Promise((resolve, _) => {
                        bulkUpdate(selectedRows, resolve);
                    })
                }}
                options={{
                    actionsColumnIndex: -1,
                    actionsCellStyle: { justifyContent: 'flex-end' },
                    addRowPosition: 'first',
                    pageSize: pageSize,
                    pageSizeOptions: [15, 30, 50, 100],
                    selection: disableCheckButton ? undefined : true,
                    // selectionProps: rowData => ({
                    //     // disabled: (rowData.checkDay !== undefined && /[aeiou]/g.test(rowData.checkDay)) || (rowData.complete === 'C'),
                    //     color: 'primary',
                    // }),
                    grouping: disableGroupingOption ? undefined : true,
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                    }),
                }}
                // onSelectionChange={(rows) => {
                //     const checkBoxStatus = rows.some((row) => {
                //         const result = (row.checkDay !== undefined && /[aeiou]/g.test(row.checkDay)) || (row.complete === 'C');
                //         return result
                //     });
                //     setSelectionEnable(checkBoxStatus);
                // }}
                actions={[
                    rowData => ({
                        tooltip: 'Completar Tarea',
                        icon: tableIcons.Complete,
                        onClick: (evt, data) => handleRoutineSchedule(data) ? handleRoutineSchedule(data) : null,
                        hidden: disableCompleteTaskButton ? true : (rowData.checkDay !== undefined && /[aeiou]/g.test(rowData.checkDay)) || (rowData.complete === 'C')
                    }),
                    // {
                    //     tooltip: 'Completar Tarea',
                    //     icon: tableIcons.Complete,
                    //     onClick: (evt, data) => handleSelection(data) ? handleSelection(data) : null,
                    //     disabled: selectionEnable,
                    //     hidden: selectionEnable
                    // },
                    {
                        tooltip: 'Agregar Adicional',
                        icon: tableIcons.Aditional,
                        isFreeAction: true,
                        onClick: () => handleAditional() ? handleAditional() : null,
                        disabled: disableAditionalButton,
                        hidden: disableAditionalButton,
                    },
                    // {
                    //     icon: () => <Link to={`/tareasDiarias/`} style={{ textDecoration: 'none', color: 'inherit' }}> <ListAltIcon  /></Link>,
                    //     tooltip: 'Ver mas',
                    //     onClick: (evt, data) => handleDailyWorksRoutine(data) ? handleDailyWorksRoutine(data) : null,
                    //     disabled: disableViewDailyWorksRoutine,
                    //     hidden: disableViewDailyWorksRoutine,

                    // },
                    rowData => ({
                        tooltip: 'Ver mas',
                        icon: () => <Link to={{
                            pathname: `/rutinasDetalles`,
                            state: {
                                routineScheduleId: rowData._id,
                                from: 'rutinas'
                            },
                        }} style={{ textDecoration: 'none', color: 'inherit' }}> <ListAltIcon /></Link>,
                        // onClick: {rowData},
                        disabled: disableRoutinesDetails,
                        hidden: disableRoutinesDetails,
                    }),

                    // {
                    //     icon: tableIcons.ListAll,
                    //     tooltip: 'Ver mas',
                    //     onClick: (evt, routineScheduleId) => history.push(`/tareasDiarias/${routineScheduleId[0]._id}`, { data: routineScheduleId }),
                    //     disabled: disableViewDailyWorksRoutine,
                    //     hidden: disableViewDailyWorksRoutine,
                    // }

                ]}
                components={{
                    Toolbar: props => (
                        <div>
                            <MTableToolbar {...props} />
                            {disableDatePicker ? '' : (
                                <div style={{ padding: '0 8px 0px 24px' }}>
                                    {datepicker}
                                </div>
                            )}
                        </div>

                    ),
                    // EditField: props => (
                    //     <MTableEditField
                    //         {...props}
                    //         multiline={props.columnDef.type === "string" || undefined}
                    //     />
                    // )
                }}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}

            />
        </div>
    );
}


