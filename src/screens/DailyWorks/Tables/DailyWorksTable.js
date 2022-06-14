import React, { useState, useEffect } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from 'react-router-dom';
import theme from '../../../components/commonComponents/MuiTable/theme';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable';
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { MySearchBar } from '../../../components/commonComponents/Controls/SearchBar';
import { axiosGet } from '../../../Services/Axios.js';
import { dailyWorksInitialRowData } from '../../../Services/defaultTables.js';
import { formatDate } from '../../../Services/DateUtils.js';
import { datePicker } from '../../../Services/DatePickers';
import { dailyWorksTableStyle } from './DailyWorksTableStyle';
import { SearchDailyWorkForm } from '../Forms/SearchDailyWorkForm';


const useStyles = makeStyles((theme) => dailyWorksTableStyle(theme));
const baseUrl = process.env.REACT_APP_API_URL;


export const DailyWorksTable = ({ allData, dataColumns, getData, date, getNewDate, roomId, socket }) => {
    const location = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const [data, setData] = useState([]);
    const [reloadButton, setReloadButton] = useState(true);
    const [rowIdHighlight, setRowIdHighlight] = useState(undefined)
    const { handleDatePicker, getNewDataBulkEdit } = muiTableCommonActions(getNewDate);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


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
                searchPlaceHolder={'Buscar por Tag, Descripción'}
                enableDuplicateButton={true}
                disableInitialFormData={false}
                initialRowData={dailyWorksInitialRowData}
                rowIdHighlight={rowIdHighlight}
                setRowColor={true}
                pdfTitle={`Tareas diarias ${formatDate(date)}`}
                enableDailyWorkSearchButton={true}
                setIsDialogOpen={setIsDialogOpen}
            />
            <SearchDailyWorkForm isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </ThemeProvider>
    </div>
}