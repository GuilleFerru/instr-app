import React from "react";
import { CssBaseline, Container, Button } from '@material-ui/core';
import { MyDialog, MyDialogActions } from '../../../../../components/commonComponents/Dialog/MyDialog';
import { Title } from '../../../../../components/commonComponents/Title';
import { Input } from '../../../../../components/commonComponents/Controls/Input';

export const UbicationAddForm = ({ name, setName, isUbicacionAddFormOpen, handleDialogClose, handleSubmit }) => {


    return <>
        <MyDialog
            title={<Title value='Agregue una nueva Ubicación' variant="button" color="primary" gutterBottom={true} />}
            isOpen={isUbicacionAddFormOpen}
            fullWidth={true}
            maxWidth={'sm'}
        >
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <div>
                    <form noValidate autoComplete="off"  >
                        <Input
                            variant={"outlined"}
                            margin={"dense"}
                            required={true}
                            fullWidth={true}
                            id={"name"}
                            label={"Nombre"}
                            name={"name"}
                            type={"input"}
                            placeholder={"Por ej. CP-EST2 -> (CP = Cuarto Previo - EST2 = Estante 2"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        //error={data.tagError}
                        />


                        {/* disabled={routineId === '' ? true : false} */}
                        <MyDialogActions>
                            <Button color="primary" onClick={() => handleSubmit('add')}>
                                Agregar
                            </Button>
                            <Button color="primary" onClick={() => handleDialogClose('closeAdd')}>
                                Cerrar
                            </Button>
                        </MyDialogActions>
                    </form>
                </div>
            </Container>
        </MyDialog>

    </>
}