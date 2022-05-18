import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Badge as MUIBadges, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));

const Badges = ({ qty, tooltip, color, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MUIBadges color={color} badgeContent={
                <Tooltip title={tooltip}>
                    <span>{qty}</span>
                </Tooltip>
            }>
                {children}
            </MUIBadges>
        </div>
    );
}

export default Badges;