import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { axiosPost, axiosPut, axiosDelete } from '../../../Services/Axios.js';
import { dailyWorksDefault } from '../../../Services/defaultTables.js';
import { makeStyles } from "@material-ui/core/styles";
import { dailyWorksTableStyle } from './DailyWorksTableStyle';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable';
import { DateContext } from '../../../context/DateContext';
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { datePicker } from '../../../Services/DatePickers'




const useStyles = makeStyles((theme) => dailyWorksTableStyle(theme));


export const DailyWorksTable = props => {
    const classes = useStyles();

    const { date, getNewDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);

    // const [dayWork, setDayWork] = useState(dayWorks)
    const { handleDatePicker } = muiTableCommonActions(data, setData, getNewDate);

    useEffect(() => {
        let cancel = false;
        axios.get(`/dailyWork/get/${date}`).then(res => {
            const { dayWorks, columns } = res.data;

            if (!cancel) {
                dayWorks === undefined ? setData([]) : setData(dayWorks);
                columns === undefined ? setDataColumns([dailyWorksDefault]) : setDataColumns(columns);
            } else {
                return;
            }
        });
        return () => {
            cancel = true;
        }
    }, [date]);

    // const dayWorksUpdate = (updatedRows) => {
    //     const updateDayWork = [
    //         {
    //             date: [date],
    //             works: [...updatedRows]
    //         }
    //     ];
    //     return updateDayWork;
    // }

    const rowAdd = (newRow, resolve) => {
        const updatedRows = [...data, newRow];
        setData(updatedRows);
        // setDayWork(dayWorksUpdate(updatedRows));
        const newDayWork = newRow;
        // le agrego la fecha de inicio y lo envio al servidor
        newDayWork.beginDate = date;
        axiosPost(`/dailyWork/create`, newDayWork);
        resolve();
    }

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        updatedRows[index] = updatedRow;
        const updatedWork = updatedRow;
        axiosPut(`/dailyWork/update/${date}`, { updatedWork })
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
        axiosPut(`/dailyWork/updateBulk/${date}`, { newDailyWorks })
        resolve();
    }

    const deleteRow = (selectedRow, resolve) => {
        const index = selectedRow.tableData.id
        const updatedRows = [...data]
        updatedRows.splice(index, 1)
        setData(updatedRows)
        axiosDelete(`/dailyWork/delete`, { id: selectedRow._id });
        resolve();

    }


    return <>
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
            handleSelection={false}
            disableViewDailyWorksRoutine={true}
            handleDailyWorksRoutine={false}
        />
    </>
}