import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Button, Radio, RadioGroup, FormLabel, FormControl, FormControlLabel } from '@material-ui/core';
import { MyDialog, MyDialogActions } from '../../../../../components/commonComponents/Dialog/MyDialog';
import { Input } from '../../../../../components/commonComponents/Controls/Input';
import { SelectTwo as Select } from '../../../../../components/commonComponents/Controls/SelectTwo';
import { employeeUpdateFormStyle } from './EmployeeUpdateFormStyle';
import { parseStringToHtmlInputType } from '../../../../../Services/DateUtils.js';

const initialForm = {
    legajo: 0,
    nombre: "",
    apellido: "",
    puesto: "",
    categoria: "",
    shift: 0,
    schedule: 0,
    sector: "",
    condicion: "",
    shiftType: "",
    holidayDays: 0,
    hireDate: new Date()
};


const radioOptions = [
    {
        type: "radio",
        name: "Horario",
        label: "Turno",
        value: "rotativeShift",
    },
    {
        type: "radio",
        name: "Horario",
        label: "Diurno",
        value: "dailyShift",
    }

]





const useStyles = makeStyles((theme) => employeeUpdateFormStyle(theme));

export const EmployeeUpdateForm = ({ employee, auxData, isDialogOpen, handleDialog, handleUpdate, title }) => {

    const classes = useStyles();
    const [form, setForm] = useState(initialForm);


    useEffect(() => {
        setForm({
            "Legajo": employee?.legajo,
            "Nombre": employee?.nombre,
            "Apellido": employee?.apellido,
            "Fecha de Ingreso": parseStringToHtmlInputType(employee?.hireDate),
            "Puesto": employee?.puesto,
            "Categoria": employee?.categoria,
            "Horario": employee?.shiftType,
            "Turno": employee?.shiftType === 'rotativeShift' ? employee?.shift : employee?.shift,
            "Días de vacaciones": employee?.holidayDays
        });

    }, [employee]);


    const handleChanges = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(form);
        handleDialog(false);
    }

    return <><MyDialog
        title={title}
        isOpen={isDialogOpen}
        fullWidth={true}
    >
        <Container component="main" maxWidth="lg" >
            <CssBaseline />

            <div >
                <form noValidate autoComplete="off" className={classes.form} >
                    {Object.keys(form).map((item, i) => {
                        if (item === "Horario") {
                            return <div key={i} className={classes.radioGroup}>
                                <FormControl component="fieldset" key={i}>
                                    <FormLabel component="legend">Horario</FormLabel>
                                    {radioOptions.map((radio, i) => {
                                        return <RadioGroup key={i} aria-label="shiftType" name={item} value={form[item]} onChange={handleChanges}>
                                            <FormControlLabel value={radio.value} control={<Radio />} label={radio.label} />
                                        </RadioGroup>
                                    })}
                                </FormControl>
                            </div>
                        } else if (item === "Turno") {
                            return <Select
                                key={i}
                                variant={"outlined"}
                                margin={"dense"}
                                autoWidth={true}
                                id={item}
                                name={item}
                                label={item}
                                value={form[item]}
                                handleChange={handleChanges}
                                options={auxData}
                            />
                        } else {
                            return (
                                <Input
                                    disabled={item === "Legajo" ? true : false}
                                    key={i}
                                    variant={"outlined"}
                                    margin={"dense"}
                                    name={item}
                                    label={item}
                                    value={form[item]}
                                    type={item === "Legajo" || item === "Días de vacaciones" ? "number" : "text" && item === "Fecha de Ingreso" ? "date" : "text"}
                                    onChange={setForm}
                                />
                            )
                        }
                    })}
                    <MyDialogActions>
                        <Button onClick={() => handleDialog(false)} color="primary">
                            Cerrar
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Enviar
                        </Button>
                    </MyDialogActions>
                </form>
            </div>
        </Container>
    </MyDialog>
    </>
}
