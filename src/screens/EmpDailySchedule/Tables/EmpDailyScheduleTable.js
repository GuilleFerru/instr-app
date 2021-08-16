import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { scheduleEmp } from '../../../Services/ScheduleEmp';
import { adicionales } from '../../../Services/Adicionales';
import { shifts } from '../../../Services/Shifts';
import { useDailyScheduleTable } from './UseDailyScheduleTable';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { empDailyScheduleTableStyle } from './EmpDailyScheduleTableStyle'
import DatePicker from '../../../components/commonComponents/Controls/DatePicker';


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
        lookup: { 301: 'Cleri Cattaneo', 303: 'Jorge Reinoso', 649: 'Fabian Monzon', 657: 'Edgardo Heredia', 672: 'Juan Machado', 1151: 'Ezequiel Lopez', 1296: 'Manuel Quiroga', 1297: 'Gabriel Sanchez' },

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

        // lookup: { 1: '05 a 13 hs', 2: '13 a 21 hs', 3: '21 a 05 hs', 4: 'Franco', 5: '08 a 17 hs', }
    },
    // {
    //     field: 'additionals',
    //     title: 'Adicionales',
    //     lookup: adicionales,
    // }
];

const initialAditionalColumn = {
    field: '',
    title: '',
    lookup: adicionales,
}

const useStyles = makeStyles((theme) => empDailyScheduleTableStyle(theme));

export const EmpDailyScheduleTable = props => {
    const classes = useStyles();


    const { data, setData, date, updateRow, bulkUpdate, handleAditional, dataColumns, handleDatePicker } = useDailyScheduleTable(scheduleEmp, initialAditionalColumn, columns);


    return <>
        <MuiTable className={classes.table}
            title={
                <DatePicker
                    name='date'
                    label="Fecha"
                    value={date}
                    onChange={handleDatePicker}
                />
            }
            data={data}
            setData={setData}
            dataColumns={dataColumns}
            updateRow={updateRow}
            handleAditional={handleAditional}
            bulkUpdate = {bulkUpdate}
        />
    </>
}
