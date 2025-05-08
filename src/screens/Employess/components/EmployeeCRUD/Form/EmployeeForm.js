import React, { useState, useEffect } from 'react';
import { AlertSnackbar } from '../../../../../components/Alerts/AlertNormal';
import { makeStyles } from "@material-ui/core/styles";
import { parseStringToHtmlInputType } from '../../../../../Services/DateUtils.js';
import { CssBaseline, Container, Button, Switch, FormControlLabel, Box } from '@material-ui/core';
import { MyDialog, MyDialogActions } from '../../../../../components/commonComponents/Dialog/MyDialog';
import { employeeFormStyle } from './EmployeeFormStyle';
import { SelectTwo as Select } from '../../../../../components/commonComponents/Controls/SelectTwo';
import { Input } from '../../../../../components/commonComponents/Controls/Input';
import { CustomRadioGroup } from '../../../../../components/commonComponents/Controls/CustomRadioGroup';



const radioOptions = [
    {
        label: "Turno",
        value: "rotativeShift",
    },
    {
        label: "Diurno",
        value: "dailyShift",
    }
]

const useStyles = makeStyles((theme) => employeeFormStyle(theme));

export const EmployeeForm = ({
    title,
    isDialogOpen,
    auxData,
    employee,
    handleDialog,
    handleCrud
}) => {

    const classes = useStyles();
    const [form, setForm] = useState([]);
    const [openAlertError, setOpenAlertError] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);

    useEffect(() => {
        setForm([
            {
                id: "legajo",
                name: "legajo",
                label: "Legajo",
                value: employee ? employee?.legajo : "",
                type: "number",
                disabled: employee ? true : false,
            },
            {
                id: "nombre",
                name: "nombre",
                label: "Nombre",
                value: employee ? employee?.nombre : "",
                type: "text",
                disabled: false,
            },
            {
                id: "apellido",
                name: "apellido",
                label: "Apellido",
                value: employee ? employee?.apellido : "",
                type: "text",
                disabled: false,
            },
            {
                id: "puesto",
                name: "puesto",
                label: "Puesto",
                value: employee ? employee?.puesto : "",
                type: "text",
                disabled: false,
            },
            {
                id: "categoria",
                name: "categoria",
                label: "Categoria",
                value: employee ? employee?.categoria : "",
                type: "text",
                disabled: false,
            },
            {
                id: "condicion",
                name: "condicion",
                label: "Condicion",
                value: employee ? employee?.condicion : "",
                type: "text",
                disabled: false,
            },
            {
                id: "shift",
                name: "shift",
                label: "Horario",
                value: employee ? employee?.shiftType : "",
            },

            {
                id: "turno",
                name: "turno",
                label: "Turno",
                value: employee ? (employee?.shiftType === 'rotativeShift' ? employee?.shift : employee?.shift) : "",
            },
            {
                id: "holidayDays",
                name: "holidays",
                label: "Dias de vacaciones",
                value: employee ? employee?.holidayDays : 0,
                type: "number",
                disabled: false,
            },
            {
                id: "hireDate",
                name: "hireDate",
                label: "Fecha de contratacion",
                value: parseStringToHtmlInputType(employee ? employee?.hireDate : new Date().toLocaleDateString()),
                type: "date",
                hidden: true,
            },
            {
                id: "status",
                name: "status",
                label: "Activo",
                checked: employee ? employee?.status : true,
            },
        ]);
    }, [employee]);


    const handleChanges = (e) => {
        const { name, value, checked } = e.target;
        setForm((prev) => {
            return prev.map((item) => {
                if (item.name === name) {
                    if (name === "status") {
                        return { ...item, checked: checked }
                    } else {
                        return { ...item, value: value }
                    }
                }
                return item;
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((form[6].value === "rotativeShift" && form[7].value >= 5) || (form[6].value === "dailyShift" && form[7].value <= 4)) {
            setOpenAlertError(true);
        } else {
            handleCrud(form);
            setOpenAlertError(false);
            setOpenAlertSuccess(true);
            handleDialog(false);
        }
    }

    const handleCloseAlert = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlertSuccess(false);
        setOpenAlertError(false);
    };


    return <>
        <AlertSnackbar open={openAlertError} handleClose={handleCloseAlert} message="El turno no coincide con el tipo de horario" severity="error" />
        <AlertSnackbar open={openAlertSuccess} handleClose={handleCloseAlert} message="Datos actualizados correctamente" severity="success" />
        <MyDialog
            title={title}
            isOpen={isDialogOpen}
            fullWidth={true}
        >
            <Container component="main" maxWidth="lg" >
                <CssBaseline />
                <div >
                    <form noValidate autoComplete="off" className={classes.form} >
                        {
                            form.map((item, i) => {

                                if (item.id === "shift") {
                                    return (
                                        <CustomRadioGroup
                                            key={i}
                                            label={item.label}
                                            name={item.name}
                                            value={item.value}
                                            options={radioOptions}
                                            onChange={handleChanges}
                                        />
                                    )
                                } else if (item.id === "status") {
                                    return (
                                        <Box>
                                            <Box className={classes.statusBox}>Estado</Box>
                                            <FormControlLabel
                                                key={i}
                                                control={
                                                    <Switch
                                                        id={item.id}
                                                        name={item.name}
                                                        checked={item.checked}
                                                        onChange={handleChanges}
                                                    />
                                                }
                                                label={item.label}
                                            />
                                        </Box>
                                    )
                                } else if (item.id === "turno") {
                                    return <Select
                                        key={i}
                                        variant={"outlined"}
                                        margin={"dense"}
                                        autoWidth={true}
                                        id={item.id}
                                        name={item.name}
                                        label={item.label}
                                        value={item.value}
                                        handleChange={handleChanges}
                                        options={auxData}
                                    />
                                } else {
                                    return <Input
                                        key={i}
                                        variant={"outlined"}
                                        margin={"dense"}
                                        name={item.name}
                                        label={item.label}
                                        value={item.value}
                                        type={item.type}
                                        disabled={item.disabled}
                                        hidden={item.hidden}
                                        onChange={handleChanges}
                                    />
                                }
                            })}
                        <MyDialogActions>
                            <Button onClick={() => {
                                handleDialog(false)
                                handleCloseAlert()
                            }} color="primary">
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
