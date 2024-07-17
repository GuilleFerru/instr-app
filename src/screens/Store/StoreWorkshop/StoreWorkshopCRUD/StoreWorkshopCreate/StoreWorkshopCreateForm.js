import React from "react";
import { CssBaseline, Container, Button } from '@material-ui/core';
import { MyDialog, MyDialogActions } from '../../../../../components/commonComponents/Dialog/MyDialog';
import { Title } from '../../../../../components/commonComponents/Title';
import { Input } from '../../../../../components/commonComponents/Controls/Input';

const setDialogTitle = (radioValue, dataFormOpen) => {
    const actionMap = {
        "eqType": `${dataFormOpen === "add" ? "Agregue un nuevo " : "Edite un "} tipo.`,
        "ubication": `${dataFormOpen === "add" ? "Agregue una nueva " : "Edite una "} ubicación.`,
    }
    if (actionMap[radioValue]) {
        return actionMap[radioValue];
    }
}

export const StoreWorkshopCreateForm = ({ name, setName, dataFormOpen, radioValue, handleDialogClose, handleSubmit }) => {


    return <>
        <MyDialog
            title={<Title value={setDialogTitle(radioValue, dataFormOpen.action)} variant="button" color="primary" gutterBottom={true} />}
            isOpen={dataFormOpen.openForm}
            fullWidth={true}
            maxWidth={'sm'}
        >
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <div>
                    <form noValidate autoComplete="off" onSubmit={(e) => { e.preventDefault() }}>
                        <Input
                            variant={"outlined"}
                            margin={"dense"}
                            required={true}
                            fullWidth={true}
                            id={"name"}
                            label={"Nombre"}
                            name={"name"}
                            type={"input"}
                            placeholder={`${radioValue === "eqType" ? "Válvula - Instrumento" : "Por ej. CP-EST2 -> (CP = Cuarto Previo - EST2 = Estante 2"}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        //error={data.tagError}
                        />


                        {/* disabled={routineId === '' ? true : false} */}
                        <MyDialogActions>
                            <Button color="primary" onClick={() => handleSubmit(`${dataFormOpen.action === "add" ? "add" : "update"}`)}>
                                {`${dataFormOpen.action === "add" ? "Agregar" : "Editar"}`}
                            </Button>
                            <Button color="primary" onClick={() => handleDialogClose('closeFormOpen')}>
                                Cerrar
                            </Button>
                        </MyDialogActions>
                    </form>
                </div>
            </Container>
        </MyDialog>

    </>
}