import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

import { TextField, TextareaAutosize } from '@material-ui/core';
import { dailyWorksTableStyle } from './DailyWorksTableStyle'
import { useDailyWorksTable } from './UseDailyWorksTable'
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { dayWorks } from '../../../Services/DayWorks';
import { plants } from '../../../Services/Plants';
import { actions } from '../../../Services/Actions';


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

    const { data, setData, date, updateRow, bulkUpdate, handleAditional, handleDatePicker } = useDailyWorksTable(dayWorks);


    return <>
        <MuiTable className={classes.table}
            title={'Tareas Diarias'}
            data={data}
            setData={setData}
            dataColumns={columns}
            updateRow={updateRow}
            handleAditional={handleAditional}
            bulkUpdate={bulkUpdate}
            handleDatePicker={handleDatePicker}
            date={date}
        />
    </>
}