import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert as MuiAlert, AlertTitle } from '@material-ui/lab';
import { Collapse } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },

    },
    alert: {
        webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
        boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
        borderRadius: '10px'
    }
}));

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
