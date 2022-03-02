import React from 'react';
import Interval from 'react-interval-rerender'
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import { dateTimeStyle } from './DateTimeStyle';
import { Title } from '../commonComponents/Title';

const useStyles = makeStyles((theme) => dateTimeStyle(theme));

export const DateTime = () => {
    const classes = useStyles();

    return <Box className={classes.container}>
        <Title
            component={'h1'}
            variant={'h6'}
            color={'inherit'}
            value={<Interval delay={1000}>{() => new Date().toLocaleString("es-Ar")}</Interval>}
        />

    </Box>
}


