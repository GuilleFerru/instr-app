import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { axiosPut } from '../../../Services/Axios.js';
import { scheduleEmpDefault } from '../../../Services/defaultTables.js';
import { DateContext } from '../../../context/DateContext';
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { scheduleTableStyle } from './ScheduleTableStyle'
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { datePicker } from '../../../Services/DatePickers'



const useStyles = makeStyles((theme) => scheduleTableStyle(theme));

export const ScheduleTable = props => {

    const classes = useStyles();
    const { date, getNewDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [aditionals, setAditionals] = useState({});
    const [aditionalCount, setAditionalCount] = useState(1);
    const { handleDatePicker } = muiTableCommonActions(data, setData, getNewDate);
    const [dataColumns, setDataColumns] = useState([]);


    useEffect(() => {
        let cancel = false;
        axios.get(`/schedule/get/${date}`).then(res => {
            const { schedule, aditionals, columns } = res.data;
            if (!cancel) {
                schedule === undefined ? setData([]) : setData(schedule);
                columns === undefined ? setDataColumns(scheduleEmpDefault) : setDataColumns(columns)
                aditionals === undefined ? setAditionals({}) : setAditionals(aditionals);
                columns !== undefined && columns.length > 5 ? setAditionalCount(parseInt((columns[columns.length - 2].field).match(/\d+/)[0]) + 1) : setAditionalCount(1);
            } else {
                return;
            }
        });
        return () => {
            cancel = true;
        }
    }, [date]);

    const bulkUpdate = (selectedRows, resolve) => {
        const rows = Object.values(selectedRows);
        const updatedRows = [...data];
        rows.map(emp => {
            const index = emp.oldData.tableData.id;
            compareOldAndNewData(emp.oldData, emp.newData);
            updatedRows[index] = emp.newData;
            setData(updatedRows);
            resolve();
            return ''
        })
        const newSchedule = updatedRows;
        axiosPut(`/schedule/update/${date}`, { newSchedule })
    }

    // MEJORAR ESTO
    const compareOldAndNewData = (oldData, newData) => {

        if (oldData.timeSchedule !== newData.timeSchedule) {
            newData.timeSchedule >= 7 && newData.timeSchedule <= 14 ? newData.workedHours = 12 : newData.timeSchedule === 4 ? newData.workedHours = 0 : newData.workedHours = 8;
        }
        newData.legajo !== newData.fullName && (newData.legajo = newData.fullName);
    }

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        compareOldAndNewData(oldRow, updatedRow);
        updatedRows[index] = updatedRow;
        const newSchedule = updatedRows;
        axiosPut(`/schedule/update/${date}`, { newSchedule })
        return updatedRows;
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
        axiosPut(`/schedule/update/columns/${date}`, { newColumns })
        setDataColumns([...dataColumns, adictionanlSelect, aditionalInput]);
    }


    return <div className={classes.table}>
        <MuiTable
            
            
            // data={data}
            // date={date}
            // setData={setData}
            // dataColumns={dataColumns}
            // pageSize={15}
            // updateRow={updateRow}
            // handleAditional={handleAditional}
            // bulkUpdate={bulkUpdate}
            // handleSelection={false}
            // handleDatePicker={handleDatePicker}
            // deleteRow={false}
            // disableGroupingOption = {false}
            // disableCheckButton={true}
            // disableAddButton={true}
            // disableDeleteButton={false}
            // disableOnRowUpdate={false}
            // disableOnBulkUpdate={false}
            // disableAditionalButton={false}


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
            deleteRow={false}
            handleAditional={handleAditional}
            pageSize={15}
            disableGroupingOption={true}
            date={date}
            handleSelection={false}
        />
    </div>

}