import React from 'react';
import { Typography } from '@material-ui/core';

export const Title = props => {

    const { component, variant, color, value, titleClassName } = props

    return <Typography
        className={titleClassName}
        component={component}
        variant={variant}
        color={color}
        noWrap
    >
        {value}
    </Typography>

}