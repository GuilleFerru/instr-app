import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { alertsStyle } from './AlertsStyle';
import Alert from '../../../../components/Alerts/Alert';


const useStyles = makeStyles((theme) => alertsStyle(theme));

export const Alerts = ({ error, success }) => {

    const classes = useStyles();


    return <div className={classes.containerHeader}>
        <div>
            <Typography variant="h5" gutterBottom>
                Vacaciones del Personal - Periodo 2021-2022
            </Typography>
        </div>
        <div className={classes.alert}>
            < Alert severity='error' title='Error al crear' message='Período ya creado' messageAction='Elija otras fechas' collapse={error} />
        </div>
        <div className={classes.alert}>
            < Alert severity='success' title='Creado con exito' message='Período creado con exito' messageAction='Elija sus vacaciones' collapse={success} />
        </div>
    </div>
}
