import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { employeetStyle } from './EmployeeStyle';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => employeetStyle(theme));

export const Employee = ({ employee, handleDialog, handleEmployeeEdit }) => {

    const classes = useStyles();

    const handleEmployee = () => {
        handleDialog(true);
        handleEmployeeEdit(employee);
    }


    const data = [
        {
            "Legajo": employee.legajo
        },
        {
            "Fecha de Ingreso": employee.hireDate
        },
        {
            "Antiguedad": `${Math.floor(((new Date().getTime() - new Date(employee.hireDate).getTime()) / 1000) / 60 / 60 / 24 / 365)} años`
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
    ]

    return <>
        <Card className={classes.root}>
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
                    <IconButton aria-label="edit employee" onClick={handleEmployee} disabled>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Agregar novedad" placement="right-start">
                    <IconButton aria-label="add news" disabled>
                        <PostAddIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>

    </>
}


