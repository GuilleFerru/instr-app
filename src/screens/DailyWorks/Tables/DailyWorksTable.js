import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { dailyWorksTableStyle } from './DailyWorksTableStyle';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable';
import { DateContext } from '../../../context/DateContext';
import { dayWorks } from '../../../Services/DayWorks';
import { plants } from '../../../Services/Plants';
import { employees } from '../../../Services/Employees';
import { shifts } from '../../../Services/Shifts';
import { actions } from '../../../Services/Actions';
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';


const columns = [
    {
        field: 'id',
        title: 'Numero',
        hidden: true,
    },
    {
        field: 'plant',
        title: 'Planta',
        lookup: plants
    },
    {
        field: 'tag',
        title: 'TAG',
    },
    {
        field: 'fullName',
        title: 'Nombre del Operador',
        lookup: employees,
    },
    {
        field: 'shift',
        title: 'Horario',
        lookup: shifts,
    },
    {
        field: 'action',
        title: 'Acción',
        lookup: actions
    },
    {
        field: 'description',
        title: 'Descripción',
        multiline: true,
        width: '40%'

    },
];


const useStyles = makeStyles((theme) => dailyWorksTableStyle(theme));


export const DailyWorksTable = props => {
    const classes = useStyles();

    // const { data, setData, date, updateRow, bulkUpdate, handleAditional, handleDatePicker, rowAdd } = useDailyWorksTable(dayWorks);

    const [data, setData] = useState(dayWorks[0].works);
    const { date, getNewDate } = useContext(DateContext);
    const [dayWork, setDayWork] = useState(dayWorks)
    const { handleDatePicker } = muiTableCommonActions(data, setData, getNewDate);

    useEffect(() => {
        let cancel = false;
        axios.get(`/dailyWork/get/${date}`).then(res => {

            if (!cancel) {

            } else {
                return;
            }
        });
        return () => {
            cancel = true;
        }
    }, [date]);

    const dayWorksUpdate = (updatedRows) => {
        const updateDayWork = [
            {
                date: [date],
                works: [...updatedRows]
            }
        ];
        return updateDayWork;
    }

    const rowAdd = (newRow, resolve) => {
        const updatedRows = [...data, newRow];
        setData(updatedRows);
        setDayWork(dayWorksUpdate(updatedRows));
        resolve();
    }

    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        updatedRows[index] = updatedRow;
        setDayWork(dayWorksUpdate(updatedRows));
        return updatedRows;
    }

    const bulkUpdate = (selectedRows, resolve) => {
        const rows = Object.values(selectedRows);
        const updatedRows = [...data];
        rows.map(row => {
            const index = row.oldData.tableData.id;
            updatedRows[index] = row.newData;
            setData(updatedRows);
            setDayWork(dayWorksUpdate(updatedRows));
            resolve();
            return ''
        })
    }


    return <>
        <MuiTable className={classes.table}
            title={'Tareas Diarias'}
            data={data}
            setData={setData}
            dataColumns={columns}
            updateRow={updateRow}
            handleAditional={false}
            rowAdd={rowAdd}
            bulkUpdate={bulkUpdate}
            handleDatePicker={handleDatePicker}
            date={date}
            disableAddButton={false}
            disableDeleteButton={false}
            disableOnRowUpdate={false}
            disableOnBulkUpdate={false}
            disableAditionalButton={true}
        />

        <MuiTable className={classes.table}
            title={'Rutinas del día'}
            data={data}
            setData={setData}
            dataColumns={columns}
            updateRow={updateRow}
            handleAditional={false}
            rowAdd={rowAdd}
            bulkUpdate={bulkUpdate}
            handleDatePicker={handleDatePicker}
            date={date}
            disableAddButton={false}
            disableDeleteButton={false}
            disableOnRowUpdate={false}
            disableOnBulkUpdate={false}
            disableAditionalButton={true}
        />
    </>
}