import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


export const AlertClose = ({ open, setOpen, title, text, alternativeText }) => {
    return <>
        <Collapse in={open}>
            < Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                <AlertTitle>{title}</AlertTitle>
                {text} — <strong>{alternativeText}</strong>
            </Alert>
        </Collapse>
    </>
}
