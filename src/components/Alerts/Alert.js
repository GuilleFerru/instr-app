import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { alertsStyle } from './AlertsStyle';
import { Alert as MuiAlert, AlertTitle } from '@material-ui/lab';
import { Collapse } from '@material-ui/core';


const useStyles = makeStyles((theme) => alertsStyle(theme));

export default function Alert({ severity, title, message, messageAction, collapse }) {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Collapse in={collapse}>
                <MuiAlert severity={severity} className={classes.alert}>
                    <AlertTitle>{title}</AlertTitle>
                    {message} — <strong>{messageAction}</strong>
                </MuiAlert>
            </Collapse>
        </div >
    );
}
