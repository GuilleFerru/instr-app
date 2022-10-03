import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { alertsStyle } from './AlertsStyle';
import Alert from '../../../components/Alerts/Alert';
import DialogAlert from '../../../components/commonComponents/Dialog/DialogAlert';



const useStyles = makeStyles((theme) => alertsStyle(theme));

export const Alerts = ({ title, dialogText, error, success, deleteSuccess, openDialog, setOpenDialog, handleAgree, agreeButtonText, enableExtraButton = false, handleExtraButton, extraButtonText, fullWidth }) => {

    const classes = useStyles();

    return <>
        <div className={classes.alert}>
            < Alert severity='error' title='Error al crear' message='Período ya creado' messageAction='Elija otras fechas' collapse={error} />
        </div>
        <div className={classes.alert}>
            < Alert severity='success' title='Creado con exito' message='Período creado con exito' messageAction='Elija sus vacaciones' collapse={success} />
        </div>
        <div className={classes.alert}>
            < Alert severity='info' title='Borrado con exito' message='Período borrado con exito' messageAction='Se seleccionara el período anterior' collapse={deleteSuccess} />
        </div>
        <div className={classes.alert}>
            < DialogAlert
                fullWidth={fullWidth}
                title={title}
                open={openDialog}
                setOpenDialog={setOpenDialog}
                handleAgree={handleAgree}
                dialogText={dialogText}
                agreeButtonText={agreeButtonText}
                enableExtraButton={enableExtraButton}
                handleExtraButton={handleExtraButton}
                extraButtonText={extraButtonText}
            />
        </div>
    </>
}
