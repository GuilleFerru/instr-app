import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { employeetStyle } from './EmployeeStyle';
import { parseStringToDate } from '../../../../Services/DateUtils';
import { Card, CardHeader, CardContent, CardActions, Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';




const getTimeOfService = (date) => {
    const today = new Date();
    const dateOfService = parseStringToDate(date);
    const timeOfService = today - dateOfService;
    const yearsOfService = Math.floor(timeOfService / (1000 * 60 * 60 * 24 * 365));
    const monthsOfService = Math.floor((timeOfService % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    return `
        ${yearsOfService} ${yearsOfService.toString().length > 1 ? 'años' : 'año'}  y  
        ${monthsOfService} ${monthsOfService === 1 ? 'mes' : 'meses'}
        `;
}


export const Employee = ({ employee, handleAditionalDialog, aditionalData, setAditionalData, handleEmployeeEdit, user }) => {

    const useStyles = makeStyles((theme) => employeetStyle(theme, employee));
    const classes = useStyles();

    const handleEmployee = () => {
        handleEmployeeEdit(employee);
    }

    const handleAditional = () => {
        handleAditionalDialog(true);
        setAditionalData({
            ...aditionalData,
            legajo: employee.legajo,
        })
    }

    const data = [
        {
            "Legajo": employee.legajo
        },
        {
            "Fecha de Ingreso": employee.hireDate
        },
        {
            "Antiguedad": getTimeOfService(employee.hireDate)
        },
        {
            "Condición": employee.condicion
        },
        {
            "Turno": employee.shiftType === 'rotativeShift' ? `Rotativo ${employee.shift}` : `Diurno de ${employee.schedule}`
        },
        {
            "Días de vacaciones": employee.holidayDays
        },
        {
            "Activo": employee?.status ? 'Si' : 'No'
        },
    ]

    return <>
        <Card className={classes.root} >
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {employee.nombre.charAt(0)}{employee.apellido.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${employee.nombre} ${employee.apellido}`}
                subheader={`${employee.puesto} ${employee.categoria}`}
            />
            <CardContent>
                {data.map((item, i) => {
                    return (
                        <Typography key={i} variant="body2" color="textSecondary" component="p">
                            {Object.keys(item)}: {Object.values(item)}
                        </Typography>
                    )
                })}
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="Editar" placement="left-start">
                    <span>
                        <IconButton aria-label="edit employee" onClick={handleEmployee} disabled={user?.userType === 'user'}>
                            <EditIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Agregar novedad" placement="right-start" >
                    <span>
                        <IconButton aria-label="add news" onClick={handleAditional} disabled={user?.userType === 'user'}>
                            <PostAddIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </CardActions>
        </Card>
    </>
}


