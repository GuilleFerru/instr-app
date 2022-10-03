import React, { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { storeReclaimsEmailStyle } from './StoreReclaimsEmailStyle';
import { TextareaAutosize, Container, CssBaseline, Button, Tooltip } from '@material-ui/core';
import { Title } from '../../../../components/commonComponents/Title';
import { MyDialog, MyDialogActions } from '../../../../components/commonComponents/Dialog/MyDialog';


const useStyles = makeStyles((theme) => storeReclaimsEmailStyle(theme));


export const StoreReclaimsEmail = ({ itemsToClaim, handleSubmit, setValues, values, openSendMailDialog, setOpenSendMailDialog, handleCopyText }) => {

    const classes = useStyles();

    useEffect(() => {
        setValues({
            message: `Estimado Fernando, \nHabría que reponer los siguientes ítems con stock cero:\n${itemsToClaim.map(item => {
                return `Ítem: ${item.item}. Descripción: ${item.description}. Cantidad: ${item.claimedQty}.\n`
            }).join('')}Gracias.\nSaludos.`
        })
    }, [itemsToClaim, setValues])

    const handleChange = (event) => {
        setValues({
            message: event.target.value
        });
    };

    const handleDialogClose = _e => {
        setOpenSendMailDialog(false);
    };

    return <MyDialog
        title={<Title value="Reclamar Items Stock cero" variant="button" color="primary" gutterBottom={true} />}
        isOpen={openSendMailDialog}
        fullWidth={true}
        maxWidth="md"
    >
        <Container component="main" maxWidth="lg" className={classes.root}>
            <CssBaseline />
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)} >
                <TextareaAutosize
                    id="outlined-textarea"
                    multiline="true"
                    value={values.message}
                    onChange={handleChange}
                //variant="outlined"
                />
            </form>
        </Container>

        <MyDialogActions>
            <Tooltip title="Copia el texto y marca los items como reclamados" placement="top" interactive>
                <Button onClick={handleCopyText} color="primary">
                    Copiar Texto
                </Button>
            </Tooltip>
            <Button onClick={handleSubmit} color="primary" disabled>
                Enviar email
            </Button>
            <Button onClick={handleDialogClose} color="primary">
                Cerrar
            </Button>
        </MyDialogActions>
    </MyDialog>

}