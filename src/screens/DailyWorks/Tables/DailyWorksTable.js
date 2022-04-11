import React, { useState, useContext, useEffect, useCallback } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../components/commonComponents/MuiTable/theme';
import { axiosGet, axiosPost, axiosPut, axiosDelete } from '../../../Services/Axios.js';
import { dailyWorksDefault } from '../../../Services/defaultTables.js';
import { makeStyles } from "@material-ui/core/styles";
import { dailyWorksTableStyle } from './DailyWorksTableStyle';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable';
import { DateContext } from '../../../context/DateContext';
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { datePicker } from '../../../Services/DatePickers';
import { MySearchBar } from '../../../components/commonComponents/Controls/SearchBar';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => dailyWorksTableStyle(theme));
const baseUrl = process.env.REACT_APP_API_URL;


export const DailyWorksTable = _props => {
    const classes = useStyles();
    const history = useHistory();
    const { date, getNewDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    const [reloadButton, setReloadButton] = useState(true);

    // const [dayWork, setDayWork] = useState(dayWorks)
    const { handleDatePicker } = muiTableCommonActions(data, setData, getNewDate);

    const getData = useCallback((url) => {
        axiosGet(url).then(data => {
            const { dayWorks, columns } = data;
            if (data) {
                dayWorks === undefined ? setData([]) : setData(dayWorks);
                columns === undefined ? setDataColumns([dailyWorksDefault]) : setDataColumns(columns);
            }
        }).catch(_err => {
            history.push('/error');
        });
    },[history]);



    useEffect(() => {
        let cancel = false;
        if (!cancel) {
            getData(`${baseUrl}/dailyWork/get/${date}`);

        }



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


        return () => {
            cancel = true
        }

    }, [date, getData]);



    const rowAdd = (newRow, resolve) => {
        const updatedRows = [...data, newRow];
        setData(updatedRows);
        // setDayWork(dayWorksUpdate(updatedRows));
        const newDayWork = newRow;
        // le agrego la fecha de inicio y lo envio al servidor
        newDayWork.beginDate = date;
        axiosPost(`${baseUrl}/dailyWork/create`, newDayWork);
        resolve();
    }

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        updatedRows[index] = updatedRow;
        const updatedWork = updatedRow;
        axiosPut(`${baseUrl}/dailyWork/update/${date}`, { updatedWork })
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
        axiosPut(`${baseUrl}/dailyWork/updateBulk/${date}`, { newDailyWorks })
        resolve();
    }

    const deleteRow = (selectedRow, resolve) => {
        const index = selectedRow.tableData.id
        const updatedRows = [...data]
        updatedRows.splice(index, 1)
        setData(updatedRows)
        axiosDelete(`${baseUrl}/dailyWork/delete`, { id: selectedRow._id });
        resolve();
    }

    const searchData = (value) => {
        if (value) {
            getData(`${baseUrl}/dailyWork/searchBy/${value}`);
        } else {
            getData(`${baseUrl}/dailyWork/get/${date}`);
        }
        setReloadButton(!reloadButton);
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

            />
        </ThemeProvider>
    </div>
}