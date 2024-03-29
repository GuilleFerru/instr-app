import React from 'react';
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';

export const MyDialogActions = (props) => {

    const children = props.children;

    return <DialogActions>
        {children}
    </DialogActions>
}

export const MyDialog = (props) => {
    const {
        isOpen = false,
        title = "My Dialog",
        children,
        fullWidth,
        maxWidth
        //...rest
    } = props;


    return <Dialog open={isOpen} fullWidth={fullWidth} maxWidth={maxWidth} >
        <DialogTitle>{title}</DialogTitle>
        {children}
    </Dialog>

}

