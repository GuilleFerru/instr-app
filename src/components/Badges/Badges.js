import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Badge as MUIBadges, Tooltip } from '@material-ui/core';

import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));

const Badges = ({ qty, tooltip, color }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MUIBadges color={color} badgeContent={
                <Tooltip title={tooltip}>
                    <span>{qty}</span>
                </Tooltip>
            }>
                <ScheduleIcon />
            </MUIBadges>
        </div>
    );
}

export default Badges;