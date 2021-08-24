import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { myPopoverStyle } from './MyPopoverStyle';
import Popover from '@material-ui/core/Popover';


const useStyles = makeStyles((theme) => myPopoverStyle(theme));

export const MyPopover = (props) => {
    const classes = useStyles();
    const { positionRef, texto } = props;
    const [anchorEl, setAnchorEl] = useState(positionRef);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}>
        <div className={classes.popoverStock}>{texto}</div>
    </Popover>

}

