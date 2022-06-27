import React, { useState } from 'react';
import { CssBaseline, Container, Button, Tooltip, CircularProgress, Card, Fade, CardContent } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { initOfDailyShift, endOfDailyShift } from '../../../Services/DateUtils';
import { generateDailyShiftFormStyle } from './GenerateDailyShiftFormStyle';
import { MyDialog, MyDialogActions } from '../../../components/commonComponents/Dialog/MyDialog';
import DatePicker from '../../../components/commonComponents/Controls/DatePicker';
import { Title } from '../../../components/commonComponents/Title';


const useStyles = makeStyles((theme) => generateDailyShiftFormStyle(theme));


export const GenerateDailyShiftForm = (
    {
        isDialogOpen,
        setIsDialogOpen,
        generateDailyShift,
        loadingExcel
    }) => {

    const classes = useStyles();
    const [startDate, setStartDate] = useState(initOfDailyShift());
    const [endDate, setEndDate] = useState(endOfDailyShift());


    const handleDialogClose = _e => {
        setIsDialogOpen(false);
    };

    const handleStartDateInput = event => {
        setStartDate(event.target.value);
    }

    const handleEndDateInput = event => {
        setEndDate(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        generateDailyShift(startDate, endDate);
        //setIsDialogOpen(false);
    }


    return <>
        {loadingExcel ?

            <Card className={classes.circularProgressContainer}>
                <CardContent>
                    <Fade in={true} timeout={2000}>
                        <div className={classes.circularProgress}>
                            <CircularProgress size={100}></CircularProgress>
                        </div>
                    </Fade>
                </CardContent>
            </Card>

            :
            <MyDialog
                title={<Title value="Generar parte diario en Excel" variant="button" color="primary" gutterBottom={true} />}
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
                                    //minDate={initOfDailyShift()}
                                    maxDate={endOfDailyShift()}
                                    onChange={handleStartDateInput}
                                    inputVariant="outlined"
                                    margin={"dense"}
                                />
                                <DatePicker
                                    name='date'
                                    label="Hasta"
                                    value={endDate}
                                    //minDate={initOfDailyShift()}
                                    maxDate={endOfDailyShift()}
                                    onChange={handleEndDateInput}
                                    inputVariant="outlined"
                                    margin={"dense"}
                                />
                            </div>
                            <MyDialogActions>
                                <Tooltip title="NO FUNCIONA TODAVIA" placement="top">
                                    <Button onClick={handleSubmit} color="primary">
                                        Generar Parte Diario
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