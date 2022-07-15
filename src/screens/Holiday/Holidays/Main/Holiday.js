import React, {  useEffect } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from '../../../../components/Breadcrumbs/Breadcrumbs';
import { holidayStyle } from './HolidayStyle';




//const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => holidayStyle(theme));

export const Holiday = ({ allData, setDate, date }) => {

    const classes = useStyles();





    useEffect(() => {
        new Promise(resolve => {

            resolve();
        });
    }, [allData]);







    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <div className={classes.breadcrumb}>
                <Breadcrumbs />
            </div>
            <div className={classes.container}>

            </div>
        </ThemeProvider>
    </div>
}
