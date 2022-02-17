import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DateContext } from '../../../context/DateContext';
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { scheduleTableStyle } from './ScheduleTableStyle'
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { options } from '../../../Services/Axios.js'


const createColumns = (employeesLookup, timeScheduleLookup) => {
    const columns = [
        {
            field: 'id',
            title: 'Numero',
            hidden: true,
        },
        {
            field: 'legajo',
            title: 'Legajo',
            editable: 'never',
        },
        {
            field: 'fullName',
            title: 'Nombre Completo',
            lookup: employeesLookup,
        },
        {
            field: 'timeSchedule',
            title: 'Horario',
            lookup: timeScheduleLookup,

        },
        {
            field: 'workedHours',
            title: 'Horas Trabajadas',
            align: 'left',
            type: 'numeric',
        },
    ];
    return columns;
}

const reduceForLookUp = (arr) => {
    return arr.reduce((acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
    }, {});
}

const useStyles = makeStyles((theme) => scheduleTableStyle(theme));

export const ScheduleTable = props => {

    const classes = useStyles();
    const { date, getNewDate } = useContext(DateContext);
    const [data, setData] = useState([]);
    const [, setEmployeesLookup] = useState({});
    const [, setTimeScheduleLookup] = useState({});
    const [aditionals, setAditionals] = useState({});
    const [aditionalCount, setAditionalCount] = useState(1);
    const { handleDatePicker } = muiTableCommonActions(data, setData, getNewDate);
    const [dataColumns, setDataColumns] = useState([]);

    useEffect(() => {
        console.log(date)
        let cancel = false;
        axios.get(`/schedule/get/${date}`).then(res => {
            const { date, schedule, employeesForSchedule, timeSchedule, aditionals } = res.data;
            const timeScheduleLookup = reduceForLookUp(timeSchedule);
            const employeesLookup = reduceForLookUp(employeesForSchedule);
            const aditionalsLookup = reduceForLookUp(aditionals);

            if (!cancel) {
                setData(schedule);
                setEmployeesLookup(employeesLookup);
                setTimeScheduleLookup(timeScheduleLookup);
                setAditionals(aditionalsLookup);
                const columns = createColumns(employeesLookup, timeScheduleLookup)
                setDataColumns(columns);
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
    }

    const compareOldAndNewData = (oldData, newData) => {
        if (oldData.shift !== newData.shift) {
            newData.shift >= 8 && newData.shift <= 15
                ? newData.workedHours = 12 : newData.shift === '16'
                    ? newData.workedHours = 0 : newData.workedHours = 8;
        }
        newData.legajo !== newData.fullName && (newData.legajo = newData.fullName);
    }

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        compareOldAndNewData(oldRow, updatedRow)
        updatedRows[index] = updatedRow;
        const newSchedule = updatedRows;

        axios.put(`/schedule/update/${date}`, { newSchedule }, options).then(_res => {
        }).catch(err => {
            console.log(err)
        })
        return updatedRows;



    }

    const handleAditional = () => {
        setAditionalCount(aditionalCount + 1)
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

        setDataColumns([...dataColumns, adictionanlSelect, aditionalInput])
    }

    return <>
        <MuiTable className={classes.table}
            title={'PERSONAL'}
            data={data}
            setData={setData}
            dataColumns={dataColumns}
            updateRow={updateRow}
            handleAditional={handleAditional}
            bulkUpdate={bulkUpdate}
            handleDatePicker={handleDatePicker}
            deleteRow={false}
            date={date}
            disableAddButton={true}
            disableDeleteButton={false}
            disableOnRowUpdate={false}
            disableOnBulkUpdate={false}
            disableAditionalButton={false}
        />
    </>
}