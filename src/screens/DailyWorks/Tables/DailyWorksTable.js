import React, { useState, useContext, useEffect } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../components/commonComponents/MuiTable/theme';
import { axiosGet } from '../../../Services/Axios.js';
import { dailyWorksDefault, dailyWorksInitialRowData } from '../../../Services/defaultTables.js';
import {formatDate} from '../../../Services/DateUtils.js';
import { makeStyles } from "@material-ui/core/styles";
import { dailyWorksTableStyle } from './DailyWorksTableStyle';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable';
import { DateContext } from '../../../context/DateContext';
import { AuthContext } from '../../../context/AuthContext';
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { datePicker } from '../../../Services/DatePickers';
import { MySearchBar } from '../../../components/commonComponents/Controls/SearchBar';
import { useHistory, useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => dailyWorksTableStyle(theme));
const baseUrl = process.env.REACT_APP_API_URL;


export const DailyWorksTable = _props => {
    const location = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const { date, getNewDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [roomId, setRoomId] = useState(0);
    const [dataColumns, setDataColumns] = useState([]);
    const [reloadButton, setReloadButton] = useState(true);
    const [rowIdHighlight, setRowIdHighlight] = useState(undefined)
    const { handleDatePicker, getNewDataBulkEdit } = muiTableCommonActions(getNewDate);


    useEffect(() => {
        try {
            const { id } = location.state;
            id && setRowIdHighlight(id);
        } catch (error) { }
    }, [location])

    const getData = (data) => {
        setData([]);
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

    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <MuiTable className={classes.table}
                data={data}
                setData={setData}
                title={'TAREAS DIARIAS'}
                datepicker={datePicker(date, handleDatePicker)}
                disableAddButton={false}
                disableDeleteButton={false}
                disableOnRowUpdate={false}
                disableOnBulkUpdate={false}
                dataColumns={dataColumns}
                rowAdd={rowAdd}
                updateRow={updateRow}
                bulkUpdate={bulkUpdate}
                deleteRow={deleteRow}
                enablePaging={true}
                pageSize={15}
                disableGroupingOption={false}
                date={date}
                disableDatePicker={false}
                CustomSearchBar={MySearchBar}
                searchData={searchData}
                disableCustomSearch={false}
                disableReloadDataButton={reloadButton}
                resetData={searchData}
                searchPlaceHolder={'Buscar por Tag, Descripción'}
                enableDuplicateButton={true}
                disableInitialFormData={false}
                initialRowData={dailyWorksInitialRowData}
                rowIdHighlight={rowIdHighlight}
                setRowColor={true}
                pdfTitle={`Tareas diarias ${formatDate(date)}`}
            />
        </ThemeProvider>
    </div>
}