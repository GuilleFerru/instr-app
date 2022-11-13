import React, { useState, useEffect, useRef } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { holidayStyle } from './HolidayStyle';
import { formatDate } from '../../../Services/DateUtils';
import theme from '../../../components/commonComponents/MuiTable/theme';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { OverDueRoutine } from '../../../components/OverDueRoutines/OverDueRoutine';
import { HolidayScores } from './HolidaysScores/HolidayScores';
import { HolidaySelector } from './HolidaySelector/HolidaySelector';


const useStyles = makeStyles((theme) => holidayStyle(theme));

export const Holiday = ({ data }) => {

    const classes = useStyles();
    const isMounted = useRef(false);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [periodData, setPeriodData] = useState([]);
    const [periodOptions, setPeriodOptions] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [actualPeriod, setActualPeriod] = useState([]);

    useEffect(() => {
        if (isMounted.current) {
            setTitle(data.periodData.periodName);
            setStartDate(formatDate(data.periodData.startDate));
            setEndDate(formatDate(data.periodData.endDate));
            setPeriodData(data.periodData);
            setPeriodOptions(data.periodOptions);
            setEmployeeOptions(data.employeeOptions);
            setActualPeriod(data.periodOptions.map((period, index) => {
                const actualPeriod = data.periodData.periodName === period.name ? data.periodOptions[index - 1]?.name.slice(7) || '2019-2020' : null;
                return actualPeriod;
            }));

        } else {
            isMounted.current = true;
        }
    }, [data]);


    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <div className={classes.breadcrumb}>
                <Breadcrumbs />
                <OverDueRoutine />
            </div>
            <div className={classes.container}>
                <div>
                    <div className={classes.mainTitles}>
                        <Typography variant="h5" gutterBottom> Vacaciones del Personal </Typography>
                        <Typography variant="overline" >
                            El periodo seleccionado es {actualPeriod} y comprende desde el {startDate} hasta {endDate}.
                        </Typography>
                        <Typography color="inherit" variant="overline">
                            Los puntajes se calcularan para el {title}.
                        </Typography>
                        <Typography color="inherit" variant="overline" gutterBottom>
                            En el selector de vacaciones se muestra el {title} pero se deben anotar las vacaciones correspondientes al Período {actualPeriod}
                        </Typography>
                    </div>
                </div>
                <HolidayScores periodOptions={periodOptions} periodData={periodData} title={title} />
                <HolidaySelector periodOptions={periodOptions} periodData={periodData} employeeOptions={employeeOptions} />
            </div>
        </ThemeProvider >
    </div >
}
