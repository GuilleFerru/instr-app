import React, { useState, useEffect, createRef, useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import MaterialTable, { MTableAction } from '@material-table/core';
import { makeStyles, Typography } from '@material-ui/core';
import { muiTableStyle } from './MuiTableStyle';
import { MTableToolbar } from '@material-table/core';
import { tableIcons } from './tableIcons';
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import BackupIcon from '@material-ui/icons/Backup';
import TodayIcon from '@material-ui/icons/Today';
import { DateContext } from '../../../context/DateContext';
import { parseStringToDate } from '../../../Services/DateUtils';
import { ExportPdfButton } from './exportPdf';
import { LoadDataTable } from '../../LoadDataTable/LoadDataTable';
import { muiTableCommonActions } from './MuiTableCommonActions';
import { tableLocalization } from './tableLocalization';



const useStyles = makeStyles((theme) => muiTableStyle(theme));

export const MuiTable = (
    {
        data,
        setData,
        title,
        subTitle,
        disableSubTitle = true,
        datepicker,
        disableCheckButton = true,
        enableAditionalButton = false,
        disableAddButton = true,
        disableDeleteButton = true,
        disableOnRowUpdate = true,
        disableOnBulkUpdate = true,
        dataColumns,
        rowAdd,
        updateRow,
        bulkUpdate,
        deleteRow,
        handleAditional,
        pageSize,
        disableGroupingOption = true,
        handleRoutineSchedule,
        enableRoutinesDetails = false,
        enableCompleteTaskButton = false,
        disableDatePicker = true,
        CustomSearchBar,
        searchData,
        disableDefaultSearch = true,
        disableCustomSearch = true,
        disableReloadDataButton = true,
        disableColumnButton = true,
        disableExportMenu = true,
        resetData,
        searchPlaceHolder,
        enableDuplicateButton = false,
        disableInitialFormData = true,
        initialRowData,
        enableGoToDateButton = false,
        setRowColor = false,
        rowIdHighlight,
        pdfTitle,
        monthAndYear,
        enableGoToPlantShutdown = false,
        enableGoToPlantShutdownWorksToDoButton = false,
        enableUpdateShutdownWorkButton = false,
        setIsDialogOpen = false,
        setRoutineEditDialogOpen = false,
        setRowData,
        enablePaging = false,
        enableDetailPanel = false,
        detailPanel,
        disableToolbar = false,
        headerStyleBackgroundColor = "#069999",
        pageSizeOptions = [10, 15, 20, 25, 50],
        enableDailyWorkSearchButton = false,
        getDailyWorkDataForSearch,
        enableGenerateDailyShiftButton = false,
        enableDeleteAditionalButton = false,
        maxAditionalsReached = false,
        minAditionalReached = false,
        enableCreateNewRoutineButton = false,
        enableEditRoutineButton = false,
        routineDate = null,
        enableAddToClaimItemButton = false,
        handleAddToClaimItem,
        itemsToClaimQty,
        enableClaimItemsButton = false,
        handleClaimItems,
        enableFiltering = false,
        enableDeleteClaimItemsButton = false,
        handleDeleteClaimedItems,
        enableLoadNewStoreItemsButton = false,
        handleLoadNewStoreItems,
        disableGoToTodayButton = true,
        enableCompleteDayRoutinesButton = false,
        handleCompleteDayRoutines,
        enableCrudStoreWorkshopUbication = false,
        setCrudSWorkshopUbicOpen,
        enableCreateMonthRoutine = false,
        handleCreateMonthRoutine,
    }) => {

    const positionRef = React.useRef();
    const materialTableRef = createRef();

    //arregla el browser freezing
    const columns = dataColumns.map((column) => {
        return { ...column };
    });

    const { user } = useContext(AuthContext);
    const [initialFormData, setInitialFormData] = useState(initialRowData);
    const { getNewDate } = useContext(DateContext);
    const [selectedRow, setSelectedRow] = useState(null);
    const classes = useStyles();
    const {
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
        createNewRoutine,
        editRoutine,
        addToClaimItem,
        claimItems,
        deleteClaimItems,
        loadNewStoreItems,
        completeDayRoutines,
        crudStoreWorkshopUbication,
        createMonthRoutine } = muiTableCommonActions(getNewDate, user);

    useEffect(() => {
        setRowColor && setSelectedRow(rowIdHighlight);
    }, [rowIdHighlight, setRowColor]);

    const actions = [
        (enableAditionalButton && addAditional(tableIcons, handleAditional, maxAditionalsReached)),
        (enableDeleteAditionalButton && deleteAditional(tableIcons, handleAditional, minAditionalReached)),
        (enableDuplicateButton && duplicateRow(tableIcons, materialTableRef, setInitialFormData)),
        (enableCompleteTaskButton && (rowData => (completeTask(tableIcons, handleRoutineSchedule, rowData)))),
        (enableRoutinesDetails && (rowData => (watchTask(rowData, Link, monthAndYear, ListAltIcon, routineDate)))),
        (enableGoToDateButton && (rowData => (goToDate(Link, rowData, ListAltIcon, parseStringToDate)))),
        (enableGoToPlantShutdown && (rowData => (goToPlantShutdown(Link, rowData, ListAltIcon)))),
        (enableGoToPlantShutdownWorksToDoButton && goToPlantShutdownWorksToDo(Link, WorkOffIcon)),
        (enableUpdateShutdownWorkButton && updateShutdownWork(tableIcons, setIsDialogOpen, setRowData)),
        (enableDailyWorkSearchButton && searchDailyWork(tableIcons, setIsDialogOpen, getDailyWorkDataForSearch)),
        (enableGenerateDailyShiftButton && generateDailyShift(tableIcons, setIsDialogOpen)),
        (enableCreateNewRoutineButton && createNewRoutine(tableIcons, setIsDialogOpen)),
        (enableEditRoutineButton && editRoutine(tableIcons, setRoutineEditDialogOpen)),
        (enableAddToClaimItemButton && (rowData => addToClaimItem(tableIcons, handleAddToClaimItem, rowData))),
        (enableClaimItemsButton && claimItems(tableIcons, handleClaimItems, itemsToClaimQty)),
        (enableDeleteClaimItemsButton && deleteClaimItems(tableIcons, handleDeleteClaimedItems, itemsToClaimQty)),
        (enableLoadNewStoreItemsButton && loadNewStoreItems(IconButton, BackupIcon, handleLoadNewStoreItems)),
        (enableCompleteDayRoutinesButton && completeDayRoutines(tableIcons, handleCompleteDayRoutines)),
        (enableCrudStoreWorkshopUbication && crudStoreWorkshopUbication(tableIcons, setCrudSWorkshopUbicOpen)),
        (enableCreateMonthRoutine && createMonthRoutine(tableIcons, handleCreateMonthRoutine))
    ].filter(Boolean);

    return (
        <div ref={positionRef} className={classes.table}>
            <MaterialTable
                icons={tableIcons}
                title={title}
                initialFormData={disableInitialFormData ? null : initialFormData}
                data={data}
                tableRef={materialTableRef}
                columns={columns}
                localization={tableLocalization(LoadDataTable, data)}
                detailPanel={enableDetailPanel ? [detailPanel] : null}
                editable={{
                    onRowAdd: disableAddButton || user.userType === 'user' ? undefined : (newRow) => {
                        initialFormData && setInitialFormData(initialRowData);
                        return new Promise((resolve, _) => {
                            rowAdd(newRow, resolve);
                        });
                    },
                    onRowAddCancelled: disableAddButton || user.userType === 'user' ? undefined : () => {
                        initialFormData && setInitialFormData(initialRowData);
                    },
                    onRowDelete: disableDeleteButton || user.userType === 'user' ? undefined : selectedRow => new Promise((resolve, _) => {
                        deleteRow(selectedRow, resolve);
                    }),
                    onRowUpdate: disableOnRowUpdate || user.userType === 'user' ? undefined : (updatedRow, oldRow) => new Promise((resolve, _) => {
                        setData(updateRow(updatedRow, oldRow, resolve));
                    }),
                    onBulkUpdate: disableOnBulkUpdate || user.userType === 'user' ? undefined : selectedRows => new Promise((resolve, _) => {
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
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: pageSizeOptions,
                    selection: disableCheckButton ? undefined : true,
                    grouping: disableGroupingOption ? undefined : true,
                    exportAllData: true,
                    exportMenu: [ExportPdfButton(pdfTitle, disableExportMenu)],
                    columnsButton: disableColumnButton ? false : true,
                    //exportButton: disableExportMenu ? false : true,
                    paging: enablePaging,
                    filtering: enableFiltering,
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#8a8a8a' : '#FFF',
                        color: (selectedRow === rowData.tableData.id) ? '#FFF' : '#000',
                        fontStyle: (selectedRow === rowData.tableData.id) ? 'italic' : 'normal',
                    }),
                    headerStyle: {
                        backgroundColor: headerStyleBackgroundColor,
                        color: "#FFF",
                        fontWeight: 'bold',
                    }
                }}
                actions={actions}
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
                        <div className={classes.toolbarBody} >
                            {disableToolbar ? null : (
                                <MTableToolbar {...props} />
                            )}
                            {disableSubTitle ? null : (
                                <Typography variant="overline" id="tableTitle" className={classes.subTitle}> {subTitle} </Typography>
                            )}

                            {disableCustomSearch ? null : (
                                <CustomSearchBar value={''} searchData={searchData} placeholder={searchPlaceHolder} />
                            )}
                            {disableDatePicker ? null : (

                                <div className={classes.datePickerContainer}>
                                    {disableReloadDataButton ? null : (
                                        <div className={classes.reloadDataButton}>
                                            <IconButton color="primary" aria-label="reload-button" component="span" onClick={() => resetData()}>
                                                <CachedIcon />
                                            </IconButton>
                                        </div>
                                    )}

                                    <div className={classes.datePicker}>
                                        {datepicker}
                                        {disableGoToTodayButton ? null : (
                                            <Tooltip title="Ir a Hoy" placement="bottom" >
                                                <IconButton color="default" aria-label="go-today" onClick={() => getNewDate(new Date())}>
                                                    <TodayIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )

                    // EditField: props => (
                    //     <MTableEditField
                    //         {...props}
                    //         multiline={props.columnDef.type === "string" || undefined}
                    //     />
                    // )
                }}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            />
        </div >
    );
}
