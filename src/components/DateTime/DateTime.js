import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import { dateTimeStyle } from './DateTimeStyle';
import { Title } from '../commonComponents/Title';

const useStyles = makeStyles((theme) => dateTimeStyle(theme));

export const DateTime = () => {
    const classes = useStyles();
    const [time, setTime] = useState(new Date().toLocaleString());

    const updateTime = () => {
        setTime(new Date().toLocaleString())
    }

    setInterval(updateTime, 1000)

    return <Box className={classes.container}>
        <Title
            component={'h1'}
            variant={'h6'}
            color={'inherit'}
            value={time}
        />
    </Box>
}


