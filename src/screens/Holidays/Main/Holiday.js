import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { holidayStyle } from './HolidayStyle';
//import { useHistory } from 'react-router-dom';
import theme from '../../../components/commonComponents/MuiTable/theme';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { HolidayScores } from './HolidaysScores/HolidayScores';
import { HolidaySelector } from './HolidaySelector/HolidaySelector';




//const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => holidayStyle(theme));

export const Holiday = ({ data }) => {

    const { socket } = useContext(AuthContext);
    const classes = useStyles();
    const isMounted = useRef(false);
    const [title, setTitle] = useState('');
    const [periodData, setPeriodData] = useState([]);
    const [periodOptions, setPeriodOptions] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);

    useEffect(() => {
        if (isMounted.current) {
            setTitle(data.periodData.periodName);
            setPeriodData(data.periodData);
            setPeriodOptions(data.periodOptions);
            setEmployeeOptions(data.employeeOptions);
        } else {
            isMounted.current = true;
        }
    }, [data]);

    useEffect(() => {
        socket.on('get_holiday_period', (data) => {
            setPeriodData(data.periodData);
            setTitle(data.periodData.periodName);
        });
        socket.on('holiday_leave_room', () => socket.off('holiday_leave_room'));
        return () => { socket.off('get_holiday_data') }
    }, [socket]);



    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <div className={classes.breadcrumb}>
                <Breadcrumbs />
            </div>
            <div className={classes.container}>
                <div>
                    <Typography variant="h5" gutterBottom>
                        Vacaciones del Personal - {title}
                    </Typography>
                </div>
                <HolidayScores periodOptions={periodOptions} periodData={periodData} title={title} />
                <HolidaySelector periodOptions={periodOptions} periodData={periodData} employeeOptions={employeeOptions} />
            </div>
        </ThemeProvider >
    </div >
}
