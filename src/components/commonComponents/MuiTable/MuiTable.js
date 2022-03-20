import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core';
import {muiTableStyle} from './MuiTableStyle';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import Badges from '../../Badges/Badges';
import { MTableToolbar } from 'material-table';
import { tableIcons } from './tableIcons';
import { Link } from "react-router-dom";
import ListAltIcon from '@material-ui/icons/ListAlt';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => muiTableStyle(theme));

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
    const classes = useStyles();

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
                    grouping: disableGroupingOption ? undefined : true,
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                    }),
                }}
                actions={[
                    rowData => ({
                        tooltip: 'Completar Tarea',
                        icon: tableIcons.Complete,
                        onClick: (evt, data) => handleRoutineSchedule(data) ? handleRoutineSchedule(data) : null,
                        hidden: disableCompleteTaskButton ? true : (rowData.checkDay !== undefined && /[aeiou]/g.test(rowData.checkDay)) || (rowData.complete === 'C')
                    }),
                    {
                        tooltip: 'Agregar Adicional',
                        icon: tableIcons.Aditional,
                        isFreeAction: true,
                        onClick: () => handleAditional() ? handleAditional() : null,
                        disabled: disableAditionalButton,
                        hidden: disableAditionalButton,
                    },
                    rowData => ({
                        tooltip: rowData.complete === 'P' && !/[aeiou]/g.test(rowData.checkDay) ? 'Debe completar la tarea' : 'Ver mas',
                        icon: () => <Link to={{
                            pathname: `/rutinas/rutinasDetalles`,
                            state: {
                                routineScheduleId: rowData._id,
                                nickname: rowData.nickname,
                                tag: rowData.tag,
                                from: 'rutinas'
                            },
                        }} style={{ textDecoration: 'none', color: 'inherit' }}> <ListAltIcon /></Link>,
                        disabled: disableRoutinesDetails ? disableRoutinesDetails : rowData.complete === 'P' && !/[aeiou]/g.test(rowData.checkDay) ? true : false,
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
                            <div className={classes.toolbar}>
                                <Breadcrumbs />
                                <Badges />
                            </div>
                            <MTableToolbar {...props} />
                            {disableDatePicker ? '' : (
                                <div className={classes.datepicker}>
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


