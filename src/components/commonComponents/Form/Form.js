import React from 'react'
import { makeStyles } from '@material-ui/core';
import { formStyle } from './FormStyle';

const useStyles = makeStyles((theme) => formStyle(theme));

export const Form = (props) => {
    const classes = useStyles();
    return <form className={classes.container} autoComplete="off">
        {props.children}
    </form>


}