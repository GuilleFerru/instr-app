import React, { useState, useEffect } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from 'react-router-dom';
import theme from '../../../components/commonComponents/MuiTable/theme';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable';
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { MySearchBar } from '../../../components/commonComponents/Controls/SearchBar';
import { axiosGet, axiosGetBody } from '../../../Services/Axios.js';
import { dailyWorksInitialRowData } from '../../../Services/defaultTables.js';
import { formatDate } from '../../../Services/DateUtils.js';
import { datePicker } from '../../../Services/DatePickers';
import { dailyWorksTableStyle } from './DailyWorksTableStyle';
import { SearchDailyWorkForm } from '../Forms/SearchDailyWorkForm';
import { AlertSnackbar } from '../../../components/Alerts/AlertNormal';


const useStyles = makeStyles((theme) => dailyWorksTableStyle(theme));
const baseUrl = process.env.REACT_APP_API_URL;


export const DailyWorksTable = ({ allData, dataColumns, getData, date, getNewDate, roomId, socket, disableButtons }) => {
    const location = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const [data, setData] = useState([]);
    const [reloadButton, setReloadButton] = useState(true);
    const [rowIdHighlight, setRowIdHighlight] = useState(undefined)
    const { handleDatePicker, getNewDataBulkEdit } = muiTableCommonActions(getNewDate);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dailyWorkDataForSearch, setDailyWorkDataForSearch] = useState([]);


    useEffect(() => {
        try {
            const { id } = location.state;
            id && setRowIdHighlight(id);
        } catch (error) { }
    }, [location])

    useEffect(() => {
        setData([]);
        new Promise((resolve) => {
            setTimeout(resolve, 200);
        }).then(() => {
            setData(allData);
        });
    }, [allData])

    const rowAdd = (newRow, resolve) => {
        const newDayWork = newRow;
        // le agrego la fecha de inicio y lo envio al servidor
        newDayWork.beginDate = date;
        socket ? socket.emit('create_daily_work', newDayWork, roomId) : history.push('/error');
        resolve();
    }

    const updateRow = (newData, oldData, resolve) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = newData;
        socket ? socket.emit('update_daily_work', date, newData, roomId) : history.push('/error');
        resolve();
        return dataUpdate;
    }

    const bulkUpdate = (changes, resolve) => {
        const copyData = [...data];
        const dataUpdate = getNewDataBulkEdit(changes, copyData);
        setData(dataUpdate);
        socket ? socket.emit('bulk_update_daily_work', date, dataUpdate, roomId) : history.push('/error');
        resolve();
    }

    const deleteRow = (selectedRow, resolve) => {
        socket ? socket.emit('delete_daily_work', date, selectedRow, roomId) : history.push('/error');
        resolve();
    }

    const searchData = (value) => {
        if (value) {
            axiosGet(`${baseUrl}/dailyWork/searchBy/${value}`).then(data => {
                getData(data);
                setReloadButton(false);
            }).catch(_err => {
                history.push('/error');
            });
        } else {
            axiosGet(`${baseUrl}/dailyWork/get/${date}`).then(data => {
                getData(data);
                setReloadButton(true);
            }).catch(_err => {
                history.push('/error');
            });
        }
    }

    const getDailyWorkDataForSearch = () => {
        axiosGet(`${baseUrl}/dailyWork/dataForSearch`).then(data => {
            setDailyWorkDataForSearch(data);
        }).catch(_err => {
            history.push('/error');
        });
    }

    const getDataFromAdvanceSearch = (dataForSearch) => {
        axiosGetBody(`${baseUrl}/dailyWork/searchAdvance/dataForSearch`, { params: { dataForSearch } }).then(data => {
            getData(data);
            setReloadButton(false);
        }).catch(_err => {
            history.push('/error');
        });
    }

    const completeDayRoutines = () => {
        const dayRoutines = data.filter((el) => el.routineScheduleId !== null && el.action === 2 && el.complete !== 'C');
        socket ? socket.emit('complete_day_routines', date, dayRoutines, roomId) : history.push('/error');
    }

    const handleCloseAlert = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    };

    return <ThemeProvider theme={theme}>
        <MuiTable className={classes.table}
            data={data}
            setData={setData}
            title={'TAREAS DIARIAS'}
            datepicker={datePicker(date, handleDatePicker)}
            disableAddButton={disableButtons}
            disableDeleteButton={disableButtons}
            disableOnRowUpdate={false}
            disableOnBulkUpdate={disableButtons}
            disableColumnButton={false}
            dataColumns={dataColumns}
            rowAdd={rowAdd}
            updateRow={updateRow}
            bulkUpdate={bulkUpdate}
            deleteRow={deleteRow}
            enablePaging={true}
            pageSize={20}
            pageSizeOptions={[20, 30, 50]}
            disableGroupingOption={false}
            date={date}
            disableDatePicker={false}
            CustomSearchBar={MySearchBar}
            searchData={searchData}
            disableCustomSearch={false}
            disableReloadDataButton={reloadButton}
            resetData={searchData}
            searchPlaceHolder={'Buscar por TAG, OT ó Descripción'}
            enableDuplicateButton={true}
            disableInitialFormData={false}
            initialRowData={dailyWorksInitialRowData}
            rowIdHighlight={rowIdHighlight}
            setRowColor={true}
            pdfTitle={`Tareas diarias ${formatDate(date)}`}
            enableDailyWorkSearchButton={true}
            setIsDialogOpen={setIsDialogOpen}
            getDailyWorkDataForSearch={getDailyWorkDataForSearch}
            disableGoToTodayButton={false}
            enableCompleteDayRoutinesButton={!disableButtons}
            handleCompleteDayRoutines={completeDayRoutines}
        />
        <AlertSnackbar open={disableButtons} handleClose={handleCloseAlert} message={'Vaya a Tareas -> Rutinas y haga click en Generar rutinas'} severity={'warning'}  />
        <SearchDailyWorkForm isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} dailyWorkDataForSearch={dailyWorkDataForSearch} getDataFromAdvanceSearch={getDataFromAdvanceSearch} />
    </ThemeProvider>

}