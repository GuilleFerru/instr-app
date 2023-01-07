import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogAlert = ({ open, setOpenDialog, handleAgree, title, dialogText, agreeButtonText, cancelButtonText, enableExtraButton, handleExtraButton, extraButtonText }) => {

    //const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpenDialog(false)
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button id='agreeButton' onClick={handleAgree} color="primary" autoFocus>
                        {agreeButtonText}
                    </Button>
                    {enableExtraButton &&
                        <Button id='extraButton'  onClick={handleExtraButton} color="primary">
                            {extraButtonText}
                        </Button>
                    }
                    <Button id='cancelButton' onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogAlert;
