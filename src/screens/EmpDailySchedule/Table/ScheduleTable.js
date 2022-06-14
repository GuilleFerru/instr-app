import React, { useState, useEffect } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../components/commonComponents/MuiTable/theme';
import { scheduleEmpDefault } from '../../../Services/defaultTables.js';
import { formatDate } from '../../../Services/DateUtils.js';
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { scheduleTableStyle } from './ScheduleTableStyle'
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { datePicker } from '../../../Services/DatePickers';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => scheduleTableStyle(theme));

export const ScheduleTable = ({ allData, roomId, date, getNewDate, socket }) => {

    const classes = useStyles();
    const history = useHistory();
    const [data, setData] = useState([]);
    const [aditionals, setAditionals] = useState({});
    const [aditionalCount, setAditionalCount] = useState(1);
    const { handleDatePicker, getNewDataBulkEdit } = muiTableCommonActions(getNewDate);
    const [dataColumns, setDataColumns] = useState([]);


    useEffect(() => {
        setData([])
        new Promise(resolve => {
            setTimeout(resolve, 300);
        }).then(() => {
            setData(allData.schedule ? allData.schedule : []);
            setDataColumns(allData.columns ? allData.columns : [scheduleEmpDefault]);
            setAditionals(allData.aditionals ? allData.aditionals : {});
            allData.columns !== undefined && allData.columns.length > 5 ?
                setAditionalCount(parseInt((allData.columns[allData.columns.length - 2].field).match(/\d+/)[0]) + 1) :
                setAditionalCount(1);
        });
    }, [allData])


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
                    enableAditionalButton={true}
                    disableDeleteButton={false}
                    disableOnRowUpdate={false}
                    disableOnBulkUpdate={false}
                    dataColumns={dataColumns}
                    updateRow={updateRow}
                    bulkUpdate={bulkUpdate}
                    deleteRow={deleteRow}
                    handleAditional={handleAditional}
                    enablePaging={true}
                    pageSize={15}
                    pageSizeOptions={[15, 20]}
                    date={date}
                    disableDatePicker={false}
                    pdfTitle={`Personal ${formatDate(date)}`}

                />
            </ThemeProvider>
        </div>
    </>
}