import React, { useState, useContext, useEffect } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../components/commonComponents/MuiTable/theme';
import { axiosGet } from '../../../Services/Axios.js';
import { dailyWorksDefault, dailyWorksInitialRowData } from '../../../Services/defaultTables.js';
import { makeStyles } from "@material-ui/core/styles";
import { dailyWorksTableStyle } from './DailyWorksTableStyle';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable';
import { DateContext } from '../../../context/DateContext';
import { AuthContext } from '../../../context/AuthContext';
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { datePicker } from '../../../Services/DatePickers';
import { MySearchBar } from '../../../components/commonComponents/Controls/SearchBar';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => dailyWorksTableStyle(theme));
const baseUrl = process.env.REACT_APP_API_URL;


export const DailyWorksTable = _props => {
    const classes = useStyles();
    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const { date, getNewDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [roomId, setRoomId] = useState(0);
    const [dataColumns, setDataColumns] = useState([]);
    const [reloadButton, setReloadButton] = useState(true);

    // const [dayWork, setDayWork] = useState(dayWorks)
    const { handleDatePicker } = muiTableCommonActions(getNewDate);




    // const getData = useCallback((url) => {
    //     axiosGet(url).then(data => {
    //         const { dayWorks, columns } = data;
    //         if (data) {
    //             dayWorks === undefined ? setData([]) : setData(dayWorks);
    //             columns === undefined ? setDataColumns([dailyWorksDefault]) : setDataColumns(columns);
    //         }
    //     }).catch(_err => {
    //         history.push('/error');
    //     });
    // }, [history]);



    const getData = (data) => {
        setData([])
        
        const { dayWorks, columns } = data;
        if (data) {
            dayWorks === undefined ? setData([]) : setData(dayWorks);
            columns === undefined ? setDataColumns([dailyWorksDefault]) : setDataColumns(columns);
        }
    };

    useEffect(() => {
        let cancel = false;
        if (socket) {
            socket.emit('get_daily_works', date);
            socket.on('get_daily_works', (data) => {
                cancel = false;
                if (!cancel) {
                    getData(data);
                    setRoomId(date);
                    socket.emit('daily_works_join_room', date);
                } else {
                    return;
                }
            });
            // console.log('useEffect')
            // axiosGet(`${baseUrl}/dailyWork/get/${date}`).then(data => {
            //     const { dayWorks, columns } = data;
            //     if (!cancel) {
            //         if (data) {
            //             dayWorks === undefined ? setData([]) : setData(dayWorks);
            //             columns === undefined ? setDataColumns([dailyWorksDefault]) : setDataColumns(columns);
            //         }
            //     } else {
            //         console.log('useEffect error')
            //         return;
            //     }
            // }).catch(_err => {
            //     console.log('useEffect error')
            //     history.push('/error');
            // });
            socket.emit('daily_works_leave_room', roomId);
            socket.on('daily_works_leave_room', () => socket.off('daily_works_leave_room'));

            return () => {
                socket.off('get_daily_works');
                cancel = true
            }
        } else {
            history.push('/error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);



    const rowAdd = (newRow, resolve) => {

        const updatedRows = [...data, newRow];
        setData(updatedRows);
        // setDayWork(dayWorksUpdate(updatedRows));
        const newDayWork = newRow;
        // le agrego la fecha de inicio y lo envio al servidor
        newDayWork.beginDate = date;
        socket ? socket.emit('create_daily_work', newDayWork, roomId) : history.push('/error');
        // axiosPost(`${baseUrl}/dailyWork/create`, newDayWork);
        resolve();
    }

    const updateRow = (updatedRow, oldRow) => {

        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        updatedRows[index] = updatedRow;
        const updatedWork = updatedRow;
        socket ? socket.emit('update_daily_work', date, updatedWork, roomId) : history.push('/error');
        // axiosPut(`${baseUrl}/dailyWork/update/${date}`, { updatedWork })
        return updatedRows;
    }

    const bulkUpdate = (selectedRows, resolve) => {
        const rows = Object.values(selectedRows);
        const updatedRows = [...data];

        rows.map(work => {
            const index = work.oldData.tableData.id;
            updatedRows[index] = work.newData;
            setData(updatedRows);
            return ''
        })
        const newDailyWorks = updatedRows;
        socket ? socket.emit('bulk_update_daily_work', date, newDailyWorks, roomId) : history.push('/error');
        // axiosPut(`${baseUrl}/dailyWork/updateBulk/${date}`, { newDailyWorks })
        resolve();
    }

    const deleteRow = (selectedRow, resolve) => {
        // const index = selectedRow.tableData.id
        // const updatedRows = [...data]
        // updatedRows.splice(index, 1)
        // setData(updatedRows)
        socket ? socket.emit('delete_daily_work', date, selectedRow._id, roomId) : history.push('/error');
        // axiosDelete(`${baseUrl}/dailyWork/delete`, date, { id: selectedRow._id });
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

    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <MuiTable className={classes.table}
                data={data}
                setData={setData}
                title={'TAREAS DIARIAS'}
                datepicker={datePicker(date, handleDatePicker)}
                disableCheckButton={true}
                disableAditionalButton={true}
                disableAddButton={false}
                disableDeleteButton={false}
                disableOnRowUpdate={false}
                disableOnBulkUpdate={false}
                dataColumns={dataColumns}
                rowAdd={rowAdd}
                updateRow={updateRow}
                bulkUpdate={bulkUpdate}
                deleteRow={deleteRow}
                handleAditional={false}
                pageSize={15}
                disableGroupingOption={false}
                date={date}
                handleRoutineSchedule={false}
                disableRoutinesDetails={true}
                disableCompleteTaskButton={true}
                disableDatePicker={false}
                CustomSearchBar={MySearchBar}
                searchData={searchData}
                disableDefaultSearch={true}
                disableCustomSearch={false}
                disableReloadDataButton={reloadButton}
                resetData={searchData}
                searchPlaceHolder={'Buscar por Tag, Descripción'}
                disableDuplicateButton={false}
                disableInitialFormData={false}
                initialRowData={dailyWorksInitialRowData}
            />
        </ThemeProvider>
    </div>
}