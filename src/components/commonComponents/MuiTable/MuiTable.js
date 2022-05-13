import React, { useState, useEffect, createRef, useContext } from 'react'
import MaterialTable, { MTableAction } from '@material-table/core';
import { makeStyles } from '@material-ui/core';
import { muiTableStyle } from './MuiTableStyle';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import Badges from '../../Badges/Badges';
import { MTableToolbar } from '@material-table/core';
import { tableIcons } from './tableIcons';
import { Link } from "react-router-dom";
import ListAltIcon from '@material-ui/icons/ListAlt';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DateContext } from '../../../context/DateContext';
import { parseStringToDate } from '../../../Services/DateUtils';

// import { v4 as uuidv4 } from 'uuid';


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
        disableDatePicker,
        CustomSearchBar,
        searchData,
        disableDefaultSearch,
        disableCustomSearch,
        disableReloadDataButton,
        resetData,
        searchPlaceHolder,
        disableDuplicateButton,
        disableInitialFormData,
        initialRowData,
        disableGoToDateButton,
        setRowColor,
        rowIdHighlight
    }) => {

    const positionRef = React.useRef();
    const materialTableRef = createRef();
    //arregla el browser freezing
    const columns = dataColumns.map((column) => {
        return { ...column };
    });
    const [initialFormData, setInitialFormData] = useState(initialRowData);
    const { getNewDate } = useContext(DateContext);
    const [selectedRow, setSelectedRow] = useState(null);
    const classes = useStyles();
    const [progress, setProgress] = useState(true);

    useEffect(() => {
        setRowColor && setSelectedRow(rowIdHighlight);
    }, [rowIdHighlight, setRowColor]);


    useEffect(() => {
        setProgress(true);
        data.length > 0 ? setProgress(false) : setProgress(true);
        const timer = setTimeout(() => setProgress(false), 25000);
        return () => clearTimeout(timer);
    }, [data]);

    return (
        <div ref={positionRef}>
            <MaterialTable
                icons={tableIcons}
                title={title}
                initialFormData={disableInitialFormData ? null : initialFormData}
                data={data}
                tableRef={materialTableRef}
                columns={columns}
                localization={{
                    header: {
                        actions: 'Acciones'
                    },
                    body: {
                        emptyDataSourceMessage: progress ? <CircularProgress size='5rem' color="inherit" /> : 'No existen filas para mostrar',
                        deleteTooltip: 'Borrar Fila',
                        editTooltip: 'Editar Fila',
                        bulkEditTooltip: 'Editar todo',
                        bulkEditApprove: 'Aprobar',
                        bulkEditCancel: 'Cancelar',
                        addTooltip: 'Agregar',
                        filterRow: 'Filtrar por',
                        editRow: {
                            deleteText: 'Esta seguro de borrar esta fila?',
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
                    onRowAdd: disableAddButton ? undefined : (newRow) => {
                        initialFormData && setInitialFormData(initialRowData);
                        return new Promise((resolve, _) => {
                            rowAdd(newRow, resolve);
                        });
                    },
                    onRowAddCancelled: disableAddButton ? undefined : () => {
                        initialFormData && setInitialFormData(initialRowData);
                    },
                    onRowDelete: disableDeleteButton ? undefined : selectedRow => new Promise((resolve, _) => {
                        deleteRow(selectedRow, resolve);
                    }),
                    onRowUpdate: disableOnRowUpdate ? undefined : (updatedRow, oldRow) => new Promise((resolve, _) => {
                        setData(updateRow(updatedRow, oldRow, resolve));
                    }),
                    onBulkUpdate: disableOnBulkUpdate ? undefined : selectedRows => new Promise((resolve, _) => {
                        bulkUpdate(selectedRows, resolve);
                    }),
                }}
                options={{
                    search: disableDefaultSearch ? false : true,
                    padding: 'dense',
                    actionsColumnIndex: -1,
                    actionsCellStyle: { justifyContent: 'flex-end' },
                    addRowPosition: 'first',
                    pageSize: pageSize,
                    pageSizeOptions: [15, 30, 50, 100],
                    selection: disableCheckButton ? undefined : true,
                    grouping: disableGroupingOption ? undefined : true,
                    exportButton: true,
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#8a8a8a' : '#FFF',
                        color: (selectedRow === rowData.tableData.id) ? '#FFF' : '#000',
                        fontStyle: (selectedRow === rowData.tableData.id) ? 'italic' : 'normal',
                    }),
                    headerStyle: {
                        backgroundColor: "#128726",
                        color: "#FFF",
                        fontWeight: 'bold',
                    },
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
                                routineScheduleId: rowData.id,
                                nickname: rowData.nickname,
                                tag: rowData.tag,
                                from: 'rutinas'
                            },
                        }} style={{ textDecoration: 'none', color: 'inherit' }}> <ListAltIcon /></Link>,
                        disabled: disableRoutinesDetails ? disableRoutinesDetails : rowData.complete === 'P' && !/[aeiou]/g.test(rowData.checkDay) ? true : false,
                        hidden: disableRoutinesDetails,
                    }),
                    rowData => ({
                        tooltip: 'Ir a fecha',
                        icon: () => <Link to={{
                            pathname: `/tareasDiarias`,
                            state: {
                                id: rowData.id,
                                from: 'rutinas'
                            },
                        }} style={{ textDecoration: 'none', color: 'inherit' }}> <ListAltIcon /></Link>,
                        onClick: () => getNewDate(parseStringToDate(rowData.beginDate)),
                        //disabled: disableGoToDateButton ? disableRoutinesDetails : rowData.complete === 'P' && !/[aeiou]/g.test(rowData.checkDay) ? true : false,
                        hidden: disableGoToDateButton,
                    }),
                    {
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
                        hidden: disableDuplicateButton,
                    }
                ]}
                components={{
                    Action: (props) => {
                        //If isn't the add action
                        if (
                            typeof props.action === typeof Function ||
                            props.action.tooltip !== "Add"
                        ) {
                            return <MTableAction {...props} />;
                        } else {
                            return <></>;
                        }
                    },
                    Toolbar: props => (
                        <div >
                            <div className={classes.toolbarHeader}>
                                <Breadcrumbs />
                                <Badges />
                            </div>
                            <div className={classes.toolbarBody} >
                                <MTableToolbar {...props} />
                                {disableCustomSearch ? null : (
                                    <CustomSearchBar value={''} searchData={searchData} placeholder={searchPlaceHolder} />
                                )}
                                {disableDatePicker ? null : (
                                    <div className={classes.datePickerContainer}>
                                        {disableReloadDataButton ? null : (
                                            <div className={classes.reloadDataButton}>
                                                <IconButton color="primary" aria-label="reload-button" component="span"
                                                    onClick={() => resetData()}>
                                                    <CachedIcon />
                                                </IconButton>
                                            </div>
                                        )}
                                        <div className={classes.datePicker}>
                                            {datepicker}
                                        </div>
                                    </div>
                                )}
                            </div>
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


