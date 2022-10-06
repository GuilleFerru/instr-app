import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import { alertsStyle } from './AlertsStyle';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => alertsStyle(theme));

export const Alerts = ({ open, title, severity, setOpenAlert, }) => {

    const classes = useStyles();

    const handleClose = () => {
        setOpenAlert(false);
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return <>
        <div className={classes.alert}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert onClose={handleClose} severity={severity}>
                    {title}
                </Alert>
            </Snackbar>
        </div>
    </>
}
