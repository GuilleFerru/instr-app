import React, { useState } from 'react'
import { CssBaseline, Container, Button } from '@material-ui/core';
import { employeeAditionalFormStyle } from './EmployeeAditionalFormStyle';
import { MyDialog, MyDialogActions } from '../../../../components/commonComponents/Dialog/MyDialog';
import DatePicker from '../../../../components/commonComponents/Controls/DatePicker';
import { Title } from '../../../../components/commonComponents/Title';
import { SelectTwo } from '../../../../components/commonComponents/Controls/SelectTwo';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => employeeAditionalFormStyle(theme));

export const EmployeeAditionalForm = ({ setIsAditionalDialogOpen, isAditionalDialogOpen, aditionals, aditionalData, setAditionalData, addAditional }) => {

    const classes = useStyles();
    const [aditionalError, setAditionalError] = useState(false);

    const handleAditional = event => {
        event.target.name !== '' && setAditionalError(false);
        setAditionalData({
            ...aditionalData,
            aditional: event.target.value
        })
    }

    const handleAditionalDate = event => {
        event.target.name === 'startDate' ?
            setAditionalData({
                ...aditionalData,
                startDate: event.target.value,
            }) : setAditionalData({
                ...aditionalData,
                endDate: event.target.value
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (aditionalData.aditional === '') {
            setAditionalError(true);
        } else {
            setAditionalError(false);
            addAditional();
        }
    }

    return <>
        <MyDialog
            title={<Title value="Agregar adicional a Empleado" variant="button" color="primary" gutterBottom={true} />}
            isOpen={isAditionalDialogOpen}
            fullWidth={true}
        >
            <Container component="main" maxWidth="lg" className={classes.root}>
                <CssBaseline />
                <div className={classes.paper}>
                    <form className={classes.form}  >
                        <div className={classes.aditional}>
                            <SelectTwo
                                id={'aditionals'}
                                label={"Adicional"}
                                required={true}
                                autoWidth={true}
                                margin={"dense"}
                                variant={'outlined'}
                                error={aditionalError}
                                options={aditionals}
                                value={aditionalData.aditional}
                                handleChange={handleAditional}
                            //handleSelect={handlePlantSelect}
                            />
                        </div>
                        <div className={classes.dateGroup}>
                            <DatePicker
                                name='startDate'
                                label="Desde"
                                value={aditionalData.startDate}
                                onChange={handleAditionalDate}
                                inputVariant="outlined"
                                margin={"dense"}
                            />
                            <DatePicker
                                name='endDate'
                                label="Hasta"
                                value={aditionalData.endDate}
                                onChange={handleAditionalDate}
                                inputVariant="outlined"
                                margin={"dense"}
                            />
                        </div>
                        <MyDialogActions>
                            <Button onClick={() => setIsAditionalDialogOpen(false)} color="primary">
                                Cerrar
                            </Button>
                            <Button onClick={handleSubmit} color="primary">
                                Agregar Novedad
                            </Button>
                        </MyDialogActions>
                    </form>
                </div>
            </Container>
        </MyDialog >
    </>
}
