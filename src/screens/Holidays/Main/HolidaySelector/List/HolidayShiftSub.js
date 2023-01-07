import React from 'react';
import { CssBaseline, Container, Button } from '@material-ui/core';
import { MyDialog, MyDialogActions } from '../../../../../components/commonComponents/Dialog/MyDialog';
import { Title } from '../../../../../components/commonComponents/Title';
import { SelectTwo } from '../../../../../components/commonComponents/Controls/SelectTwo';
import { holidayShiftSubStyle } from './HolidayShiftSubStyle';
import { makeStyles } from "@material-ui/core/styles";




const useStyles = makeStyles((theme) => holidayShiftSubStyle(theme));

export const HolidayShiftSub = ({ isHolidayShiftSubDialogOpen, setIsHolidayShiftSubDialogOpen, substitutes, substitute, setSubstitute, setOnLoading, staticDateArray,handleSubmitSubstitute }) => {

    const classes = useStyles();


    const handleSubstitute = event => {
        setSubstitute(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSubmitSubstitute()
    }

    return <>
        <MyDialog
            title={<Title value="Agregar relevante de turno" variant="button" color="primary" gutterBottom={true} />}
            isOpen={isHolidayShiftSubDialogOpen}
            fullWidth={true}
        >
            <Container component="main" maxWidth="lg" className={classes.root}>
                <CssBaseline />
                <div className={classes.paper}>
                    <form className={classes.form}  >
                        <SelectTwo
                            id={'substitutes'}
                            label={"Relevantes"}
                            required={true}
                            autoWidth={false}
                            margin={"dense"}
                            variant={'outlined'}
                            options={substitutes.filter(substitute => substitute.employeeCondition === 'Afiliado' && substitute.shiftType === 'dailyShift')}
                            value={substitute}
                            handleChange={handleSubstitute}
                        //handleSelect={handlePlantSelect}
                        />
                        <MyDialogActions>
                            <Button onClick={() => setIsHolidayShiftSubDialogOpen(false)} color="primary">
                                Cerrar
                            </Button>
                            <Button onClick={handleSubmit} color="primary">
                                Agregar relevante
                            </Button>
                        </MyDialogActions>
                    </form>
                </div>
            </Container>
        </MyDialog >
    </>
}
