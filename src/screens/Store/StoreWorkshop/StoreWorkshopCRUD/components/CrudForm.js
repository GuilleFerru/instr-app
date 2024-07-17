import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Button, Radio, RadioGroup, FormLabel, FormControl, FormControlLabel } from '@material-ui/core';
import { Select } from '../../../../../components/commonComponents/Controls/Select';
import { MyDialog, MyDialogActions } from '../../../../../components/commonComponents/Dialog/MyDialog';
import { Title } from '../../../../../components/commonComponents/Title';
import { crudFormStyle } from './CrudFormStyle';
import { StoreWorkshopCreateForm } from '../StoreWorkshopCreate/StoreWorkshopCreateForm';


const selectArray = (obj) => {
    const array = Object.keys(obj).map(key => ({
        id: key,
        name: obj[key]
    }));
    return array;
}


const useStyles = makeStyles((theme) => crudFormStyle(theme));

export const CrudForm = ({ onSubmit, isCrudDialogOpen, setCrudDialogOpen, types, ubications }) => {

    const classes = useStyles();
    const [select, setSelect] = useState(selectArray(types));
    const [selectValue, setSelectValue] = useState('');
    const [dataFormOpen, setdataFormOpen] = useState({ openForm: false, action: '' });
    const [name, setName] = useState('');
    const [radioValue, setRadioValue] = useState('eqType');

    useEffect(() => {
        updateSelect(radioValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radioValue, types, ubications]);

    const updateSelect = (value) => {
        setSelect(value === 'eqType' ? selectArray(types) : selectArray(ubications));
    };

    const handleRadioChanges = (e) => {
        const value = e.target.value;
        setRadioValue(value);
        updateSelect(value);
    };

    const handleSubmit = (action) => {
        onSubmit(action, selectValue, name, radioValue)
    }

    const handleDialogClose = (action) => {
        if (action === 'closeCrud') {
            setCrudDialogOpen(false);
            setSelectValue('');
        } else if (action === 'closeFormOpen') {
            setdataFormOpen({ openForm: false, action: '' })
            setName('')
        }
    };

    const handleCrud = (action) => {
        if (action === 'add') {
            setdataFormOpen({ openForm: true, action: 'add' })
            setName('')
        } else {
            setdataFormOpen({ openForm: true, action: 'edit' })
            select.map(item => {
                return selectValue === item.id ? setName(item.name) : null
            })
        }
    };

    return <>
        <MyDialog
            title={<Title value='Agregue/Edite/Borre Tipo o Ubicación' variant="button" color="primary" gutterBottom={true} />}
            isOpen={isCrudDialogOpen}
            fullWidth={true}
            maxWidth={'xs'}
        >
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <div>
                    <form className={classes.form} noValidate autoComplete="off"  >
                        <div className={classes.radioGroup}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Seleccione una opción:</FormLabel>
                                <RadioGroup aria-label="crudWorkshop" name={"crudWorkshops"} value={radioValue} onChange={handleRadioChanges}>
                                    <FormControlLabel value={"eqType"} control={<Radio />} label={"Tipo"} />
                                    <FormControlLabel value={"ubication"} control={<Radio />} label={"Ubicación"} />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Select
                            id={radioValue === 'eqType' ? 'types' : 'ubications'}
                            label={radioValue === 'eqType' ? 'Tipos' : 'Ubicaciones'}
                            required={true}
                            autoWidth={false}
                            margin={"dense"}
                            variant={'outlined'}
                            options={select}
                            value={selectValue}
                            setValue={setSelectValue}
                        />
                        {/* disabled={routineId === '' ? true : false} */}
                        <MyDialogActions>
                            <Button color="primary" onClick={() => handleCrud('add')} >
                                Agregar
                            </Button>
                            <Button color="primary" onClick={() => handleCrud('edit')} disabled={selectValue === '' ? true : false}>
                                Editar
                            </Button>
                            <Button color="primary" onClick={() => handleSubmit('delete')} disabled={selectValue === '' ? true : false}>
                                Eliminar
                            </Button>
                            <Button onClick={() => handleDialogClose('closeCrud')} color="primary">
                                Cerrar
                            </Button>
                        </MyDialogActions>
                    </form>
                </div>
            </Container>
        </MyDialog>
        {/* <UbicationAddForm name={name} setName={setName} isUbicacionAddFormOpen={isUbicacionAddFormOpen} handleDialogClose={handleDialogClose} handleSubmit={handleSubmit}> </UbicationAddForm> */}
        <StoreWorkshopCreateForm name={name} setName={setName} dataFormOpen={dataFormOpen} radioValue={radioValue} handleDialogClose={handleDialogClose} handleSubmit={handleSubmit}> </StoreWorkshopCreateForm>
    </>

}