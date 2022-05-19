import React, { useState, useEffect, createRef, useContext } from 'react'
import MaterialTable, { MTableAction } from '@material-table/core';
import { makeStyles } from '@material-ui/core';
import { muiTableStyle } from './MuiTableStyle';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import { MTableToolbar } from '@material-table/core';
import { tableIcons } from './tableIcons';
import { Link } from "react-router-dom";
import ListAltIcon from '@material-ui/icons/ListAlt';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import { DateContext } from '../../../context/DateContext';
import { parseStringToDate } from '../../../Services/DateUtils';
import { ExportPdf } from '@material-table/exporters';
import { OverDueRoutine } from '../../OverDueRoutines/OverDueRoutine';
import { LoadDataTable } from '../../LoadDataTable/LoadDataTable';
import { muiTableCommonActions } from './MuiTableCommonActions';
import { tableLocalization } from './tableLocalization';

const useStyles = makeStyles((theme) => muiTableStyle(theme));

export const MuiTable = (
    {
        data,
        setData,
        title,
        datepicker,
        disableCheckButton,
        enableAditionalButton,
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
        enableRoutinesDetails,
        enableCompleteTaskButton,
        disableDatePicker,
        CustomSearchBar,
        searchData,
        disableDefaultSearch,
        disableCustomSearch,
        disableReloadDataButton,
        resetData,
        searchPlaceHolder,
        enableDuplicateButton,
        disableInitialFormData,
        initialRowData,
        enableGoToDateButton,
        setRowColor,
        rowIdHighlight,
        pdfTitle,
        monthAndYear,
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

    const { addAditional, completeTask, watchTask, goToDate, duplicateRow } = muiTableCommonActions(getNewDate);

    useEffect(() => {
        setRowColor && setSelectedRow(rowIdHighlight);
    }, [rowIdHighlight, setRowColor]);

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
                    exportMenu: [{
                        label: 'Exportar a PDF',
                        exportFunc: (cols, datas) => ExportPdf(cols, datas, pdfTitle)
                    }],
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
                    enableAditionalButton && addAditional(tableIcons, handleAditional),
                    enableDuplicateButton && duplicateRow(tableIcons, materialTableRef, setInitialFormData),
                    enableCompleteTaskButton && (rowData => (completeTask(tableIcons, handleRoutineSchedule, rowData))),
                    enableRoutinesDetails && (rowData => (watchTask(rowData, Link, monthAndYear, ListAltIcon))),
                    enableGoToDateButton && (rowData => (goToDate(Link, rowData, ListAltIcon, parseStringToDate))),


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
                                <OverDueRoutine />
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


