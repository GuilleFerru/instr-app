import React, { useState } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import { holidayStyle } from './HolidayStyle';
//import { useHistory } from 'react-router-dom';
import theme from '../../../components/commonComponents/MuiTable/theme';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { Alerts } from './components/Alerts';
import { HolidayScores } from './HolidaysScores/HolidayScores';
import { HolidaySelector } from './HolidaySelector/HolidaySelector';




//const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => holidayStyle(theme));

export const Holiday = ({ data }) => {

    const classes = useStyles();
    //const history = useHistory();

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);




    // useEffect(() => {
    //     new Promise(resolve => {

    //         resolve();
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);



    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <div className={classes.breadcrumb}>
                <Breadcrumbs />
            </div>
            <div className={classes.container}>
                <Alerts error={error} success={success} />
                <HolidayScores periodOptions={data.periodOptions} setError={setError} setSuccess={setSuccess} />
                <HolidaySelector periodOptions={data.periodOptions} employeeOptions={data.employeeOptions} />
            </div>
        </ThemeProvider >
    </div >
}
