import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop as MUIBackdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

const Backdrop = ({ open }) => {
    const classes = useStyles();
    return (
        <MUIBackdrop open={open} className={classes.backdrop} >
            <CircularProgress color="inherit" />
        </MUIBackdrop>
    );
}

export default Backdrop;


