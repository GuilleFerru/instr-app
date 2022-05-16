import React, { useState, useEffect, useContext } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../components/commonComponents/MuiTable/theme';
// import { axiosPut } from '../../../Services/Axios.js';
import { scheduleEmpDefault } from '../../../Services/defaultTables.js';
import { formatDate } from '../../../Services/DateUtils.js';
import { DateContext } from '../../../context/DateContext';
import { AuthContext } from '../../../context/AuthContext';
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { scheduleTableStyle } from './ScheduleTableStyle'
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
// import { mainListActions } from '../../../components/Navbar/Drawer/MainListItems/MainListActions'
import { datePicker } from '../../../Services/DatePickers';
import { MySearchBar } from '../../../components/commonComponents/Controls/SearchBar';
import { useHistory } from 'react-router-dom';

// const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => scheduleTableStyle(theme));

export const ScheduleTable = _props => {

    const classes = useStyles();
    const { socket } = useContext(AuthContext);
    const { date, getNewDate } = useContext(DateContext);
    const history = useHistory();
    const [data, setData] = useState([]);
    const [aditionals, setAditionals] = useState({});
    const [aditionalCount, setAditionalCount] = useState(1);
    const [roomId, setRoomId] = useState(0);
    const { handleDatePicker, getNewDataBulkEdit } = muiTableCommonActions(getNewDate);
    const [dataColumns, setDataColumns] = useState([]);
    // const { handleLeaveRoom } = mainListActions(setRoomId);

    useEffect(() => {
        let cancel = false;
        if (socket) {
            socket.emit('get_schedule', date);
            socket.on('get_schedule', (data) => {
                cancel = false;
                if (!cancel) {
                    const { schedule, aditionals, columns, id } = data;
                    schedule === undefined ? setData([]) : setData(schedule);
                    columns === undefined ? setDataColumns(scheduleEmpDefault) : setDataColumns(columns)
                    aditionals === undefined ? setAditionals({}) : setAditionals(aditionals);
                    columns !== undefined && columns.length > 5 ? setAditionalCount(parseInt((columns[columns.length - 2].field).match(/\d+/)[0]) + 1) : setAditionalCount(1);
                    id !== undefined ? setRoomId(id) : setRoomId(0);
                    socket.emit('schedule_join_room', id);
                } else {
                    return;
                }
            })
            socket.emit('schedule_leave_room', roomId);
            socket.on('schedule_leave_room', () => socket.off('schedule_leave_room'));
            return () => {
                socket.off('get_schedule');
                cancel = true;
            }
        } else {
            history.push('/error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);



    // useEffect(() => {
    //     socket.on('updateSchedule', (data) => {
    //         let cancel = false;
    //         if (!cancel) {
    //             setData(data);
    //         } else {
    //             return;
    //         }
    //         return () => {
    //             cancel = true;
    //             socket.off('updateSchedule');
    //         }
    //     });

    //     socket.on('updateScheduleColumns', (data, aditionalCount) => {
    //         let cancel = false;
    //         if (!cancel) {
    //             setAditionalCount(aditionalCount);
    //             setDataColumns(data);
    //         } else {
    //             return;
    //         }
    //         return () => {
    //             cancel = true;
    //             socket.off('updateScheduleColumns');
    //         }
    //     });
    // });



    const bulkUpdate = (changes, resolve) => {
        const copyData = [...data];
        const dataUpdate = getNewDataBulkEdit(changes, copyData);
        socket ? socket.emit('update_schedule', date, dataUpdate, roomId) : history.push('/error');
        setData(dataUpdate);
        resolve();
        return dataUpdate;

        // const rows = Object.values(selectedRows);
        // const updatedRows = [...data];
        // rows.map(emp => {
        //     const index = emp.oldData.tableData.id;
        //     compareOldAndNewData(emp.oldData, emp.newData);
        //     updatedRows[index] = emp.newData;
        //     setData(updatedRows);
        //     return ''
        // })
        // const newSchedule = updatedRows;
        // socket ? socket.emit('update_schedule', date, newSchedule, roomId) : history.push('/error');

    }

    // MEJORAR ESTO
    // const compareOldAndNewData = (oldData, newData) => {

    //     if (oldData.timeSchedule !== newData.timeSchedule) {
    //         newData.timeSchedule >= 7 && newData.timeSchedule <= 14 ? newData.workedHours = 12 : newData.timeSchedule === 4 ? newData.workedHours = 0 : newData.workedHours = 8;
    //     }
    //     newData.legajo !== newData.fullName && (newData.legajo = newData.fullName);
    // }

    const updateRow = (newData, oldData, resolve) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = newData;
        socket ? socket.emit('update_schedule', date, dataUpdate, roomId) : history.push('/error');
        setData([...dataUpdate]);
        resolve();
        return dataUpdate;

        // const index = oldRow.tableData.id;
        // const updatedRows = [...data];
        // //compareOldAndNewData(oldRow, updatedRow);
        // updatedRows[index] = updatedRow;
        // const newSchedule = updatedRows;
        // console.log(newSchedule);
        // socket ? socket.emit('update_schedule', date, newSchedule, roomId) : history.push('/error');
        // return updatedRows;
    }

    const handleAditional = () => {

        if (dataColumns.length > 5) {
            const getNumberOfAditionals = parseInt((dataColumns[dataColumns.length - 2].field).match(/\d+/)[0]) + 1;
            setAditionalCount(getNumberOfAditionals + 1);
        } else {
            setAditionalCount(aditionalCount + 1);
        }

        const adictionanlSelect = {
            field: `additional_${aditionalCount}`,
            title: `Adicional ${aditionalCount}`,
            lookup: aditionals,
            align: 'left',
        }
        const aditionalInput = {
            field: `additional_${aditionalCount}_info`,
            title: `Anexo ${aditionalCount}`,
            align: 'left',
        }
        const newColumns = [...dataColumns, adictionanlSelect, aditionalInput];
        socket ? socket.emit('update_schedule_columns', date, newColumns, roomId) : history.push('/error');

    }

    const deleteRow = (oldData, resolve) => {
        const dataDelete = [...data];
        const target = dataDelete.find((el) => el.id === oldData.tableData.id);
        const index = dataDelete.indexOf(target);
        dataDelete.splice(index, 1);
        const dataToDelete = {
            date: date,
            dataDelete: dataDelete,
        }
        socket ? socket.emit('delete_schedule', date, dataToDelete, roomId) : history.push('/error');
        setData([...dataDelete]);
        resolve();
    }


    return <>
        <div className={classes.table}>
            <ThemeProvider theme={theme}>
                <MuiTable
                    data={data}
                    setData={setData}
                    title={'PERSONAL'}
                    datepicker={datePicker(date, handleDatePicker)}
                    disableCheckButton={true}
                    disableAditionalButton={false}
                    disableAddButton={true}
                    disableDeleteButton={false}
                    disableOnRowUpdate={false}
                    disableOnBulkUpdate={false}
                    dataColumns={dataColumns}
                    rowAdd={false}
                    updateRow={updateRow}
                    bulkUpdate={bulkUpdate}
                    deleteRow={deleteRow}
                    handleAditional={handleAditional}
                    pageSize={15}
                    disableGroupingOption={true}
                    date={date}
                    handleRoutineSchedule={false}
                    disableRoutinesDetails={true}
                    disableCompleteTaskButton={true}
                    disableDatePicker={false}
                    CustomSearchBar={MySearchBar}
                    searchData={false}
                    disableDefaultSearch={true}
                    disableCustomSearch={true}
                    disableReloadDataButton={true}
                    disableDuplicateButton={true}
                    disableInitialFormData={true}
                    disableGoToDateButton={true}
                    pdfTitle={`Personal ${formatDate(date)}`}
                // initialRowData={{}}
                />
            </ThemeProvider>
        </div>
    </>
}