import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { scheduleEmp } from '../../../Services/ScheduleEmp';
import { adicionales } from '../../../Services/Adicionales';
import { shifts } from '../../../Services/Shifts';
import { employees } from '../../../Services/Employees';
import { useDailyScheduleTable } from './UseDailyScheduleTable';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { empDailyScheduleTableStyle } from './EmpDailyScheduleTableStyle'
// import DatePicker from '../../../components/commonComponents/Controls/DatePicker';


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
        lookup: employees,
    },
    {
        field: 'shift',
        title: 'Horario',
        lookup: shifts,

    },
    {
        field: 'workedHours',
        title: 'Horas Trabajadas',
        align: 'left',
        type: 'numeric',
    },
];



const useStyles = makeStyles((theme) => empDailyScheduleTableStyle(theme));

export const EmpDailyScheduleTable = props => {
    const classes = useStyles();
    const { data, setData, date, updateRow, bulkUpdate, handleAditional, dataColumns, handleDatePicker } = useDailyScheduleTable(scheduleEmp, adicionales, columns);

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
            date={date}
            onRowAddActive = {false}

        />
    </>
}
