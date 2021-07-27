import React from 'react';
import { Typography } from '@material-ui/core';

export const Title = props => {

    const { component, variant, color, value } = props

    return <Typography
        component={component}
        variant={variant}
        color={color}
        noWrap
    >
        {value}
    </Typography>

}