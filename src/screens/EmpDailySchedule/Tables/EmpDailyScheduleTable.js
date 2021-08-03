import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { scheduleEmp } from '../../../Services/ScheduleEmp';
import { useDailyScheduleTable } from './UseDailyScheduleTable';
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { empDailyScheduleTableStyle } from './EmpDailyScheduleTableStyle'

const columns = [
    {
        field: 'id',
        title: 'Numero',
        hidden: true
    },
    {
        field: 'legajo',
        title: 'Legajo',
    },
    {
        field: 'fullName',
        title: 'Nombre Completo',
        lookup: { 301: 'Jorge Reinoso', 303: 'Cleri Cattaneo', 649: 'Fabian Monzon', 657: 'Edgardo Heredia', 672: 'Juan Machado', 1151: 'Ezequiel Lopez' }
    },
    {
        field: 'shift',
        title: 'Horario',
        lookup: { 1: '05 a 13 hs', 2: '13 a 21 hs', 3: '21 a 05 hs', 4: 'Franco', 5: '08 a 17 hs', }
    },
    {
        field: 'workedHours',
        title: 'Horas Trabajas',
        // lookup: { 1: '05 a 13 hs', 2: '13 a 21 hs', 3: '21 a 05 hs', 4: 'Franco', 5: '08 a 17 hs', }
    },
    {
        field: 'additionals',
        title: 'Adicionales',
        lookup: { 0: '', 1: '01 - Enfermo ', 14: 'Llamada - 14', 23: 'Franco - 23', 12: 'Licencia - 12', }
    },
];

const useStyles = makeStyles((theme) => empDailyScheduleTableStyle(theme));

export const EmpDailyScheduleTable = props => {
    const classes = useStyles();

    const { data, setData } = useDailyScheduleTable(scheduleEmp.employees);

    return <MuiTable className={classes.table}
        title= {`Personal del dia ${data.date}`}
        data={data}
        setData={setData}
        columns={columns}
        
    />
}
