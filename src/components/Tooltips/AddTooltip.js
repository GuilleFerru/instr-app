import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(1),
    },
}));

export const AddTooltip = ({ title, size, color, placement, handleTooltip }) => {
    const classes = useStyles();


    return (
        <Tooltip title={title} aria-label={title} placement={placement}>
            <Fab size={size} color={color} className={classes.fab} onClick={() => handleTooltip()} >
                <AddIcon />
            </Fab>
        </Tooltip >
    );
}

