import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { alertsStyle } from './AlertsStyle';
import Alert from '../../../../components/Alerts/Alert';
import DialogAlert from '../../../../components/commonComponents/Dialog/DialogAlert';



const useStyles = makeStyles((theme) => alertsStyle(theme));

export const Alerts = ({ title, error, success, deleteSuccess, openDeleteDialog, setOpenDeleteDialog, handleAgree }) => {

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
                open={openDeleteDialog}
                setOpenDialog={setOpenDeleteDialog}
                handleAgree={handleAgree}
                title='Estas seguro de borrar este período?'
                dialogText={`Si borra el ${title} se perderan todos los promedios y todos los días de vacaciones asignados a este período`}
            />
        </div>
    </>
}
