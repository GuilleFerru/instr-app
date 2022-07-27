import React, { useState } from 'react';
import { CssBaseline, Container, Button, Tooltip, CircularProgress, Fade } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { initOfHolidayPeriod, endOfHolidayPeriod } from '../../../../../Services/DateUtils';
import { generateDailyShiftFormStyle } from './GenerateDailyShiftFormStyle';
import { MyDialog, MyDialogActions } from '../../../../../components/commonComponents/Dialog/MyDialog';
import DatePicker from '../../../../../components/commonComponents/Controls/DatePicker';
import { Title } from '../../../../../components/commonComponents/Title';


const useStyles = makeStyles((theme) => generateDailyShiftFormStyle(theme));

// const checkDatesDifference = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     const compareDates = startDate.getTime() > endDate.getTime();
//     if (diffDays > 31 || compareDates) {
//         return false;
//     } else if (diffDays < 31 || compareDates) {
//         return true;
//     }
// }




export const GenerateNewPeriodForm = (
    {
        isDialogOpen,
        setIsDialogOpen,
        generateNewPeriod,
        loadingPeriod
    }) => {

    const classes = useStyles();
    const [startDate, setStartDate] = useState(initOfHolidayPeriod());
    const [endDate, setEndDate] = useState(endOfHolidayPeriod());
    //const [isValid, setIsValid] = useState(true);



    const handleDialogClose = _e => {
        setIsDialogOpen(false);
    };

    const handleStartDateInput = event => {
        //setIsValid(checkDatesDifference(event.target.value, endDate))
        setStartDate(event.target.value);
    }

    const handleEndDateInput = event => {
        //setIsValid(checkDatesDifference(startDate, event.target.value))
        setEndDate(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        generateNewPeriod(startDate, endDate);
    }


    return <>
        {loadingPeriod ?
            <Fade in={true} timeout={2000}>
                <div className={classes.circularProgressContainer}>
                    <CircularProgress size={75} color='inherit'></CircularProgress>
                </div>
            </Fade>
            :
            <MyDialog
                title={<Title value="Crear nuevo período" variant="button" color="primary" gutterBottom={true} />}
                isOpen={isDialogOpen}
                fullWidth={true}
            >
                <Container component="main" maxWidth="lg" className={classes.root}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <form className={classes.form} onSubmit={handleSubmit} >
                            <div className={classes.dateGroup}>
                                <DatePicker
                                    name='date'
                                    label="Desde"
                                    value={startDate}
                                    onChange={handleStartDateInput}
                                    inputVariant="outlined"
                                    margin={"dense"}
                                />
                                <DatePicker
                                    name='date'
                                    label="Hasta"
                                    value={endDate}
                                    onChange={handleEndDateInput}
                                    inputVariant="outlined"
                                    margin={"dense"}
                                />
                            </div>
                            <MyDialogActions>
                                <Tooltip title="Click para generar nuevo período" placement="top">
                                    <Button onClick={handleSubmit} color="primary">
                                        Crear
                                    </Button>
                                </Tooltip>
                                <Button onClick={handleDialogClose} color="primary">
                                    Cerrar
                                </Button>
                            </MyDialogActions>
                        </form>
                    </div>
                </Container>
            </MyDialog >
        }
    </>

}