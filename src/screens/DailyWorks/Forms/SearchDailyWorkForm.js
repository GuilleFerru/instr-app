import React, { useState } from 'react';
import { CssBaseline, Container, Button, FormGroup, Tooltip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { getYesterday } from '../../../Services/DateUtils';
import { searchDailyWorkFormStyle } from './SearchDailyWorkFormStyle';
import { MyDialog, MyDialogActions } from '../../../components/commonComponents/Dialog/MyDialog';
import DatePicker from '../../../components/commonComponents/Controls/DatePicker';
import { Title } from '../../../components/commonComponents/Title';
import { Switch } from '../../../components/commonComponents/Controls/Switch';
import { Select } from '../../../components/commonComponents/Controls/Select';

const useStyles = makeStyles((theme) => searchDailyWorkFormStyle(theme));


const swicthData = [
    { id: 'plant', label: 'Buscar tareas por planta', name: 'plant' },
    { id: 'attelier', label: 'Buscar tareas por atelier', name: 'attelier' },
    { id: 'manteinance', label: 'Buscar tareas por mantenimiento', name: 'manteinance' },
    { id: 'action', label: 'Buscar tareas por acción', name: 'action' },
    { id: 'complete', label: 'Buscar tareas por estado', name: 'complete' },
];

const initialFValues = {
    plant: false,
    attelier: false,
    manteinance: false,
    action: false,
    complete: false,
}


export const SearchDailyWorkForm = (
    {
        isDialogOpen,
        setIsDialogOpen,
        dailyWorkDataForSearch,
        getDataFromAdvanceSearch
    }) => {

    const classes = useStyles();
    const [startDate, setStartDate] = useState(getYesterday());
    const [endDate, setEndDate] = useState(new Date());
    const [searchFor, setSearchFor] = useState({
        plant: false,
        attelier: false,
        manteinance: false,
        action: false,
        complete: false,
    });

    const [plant, setPlant] = useState('')
    const [attelier, setAttelier] = useState('')
    const [manteinance, setManteinance] = useState('')
    const [action, setAction] = useState('')
    const [complete, setComplete] = useState('')

    const defaultValues = () => {
        setPlant('')
        setAttelier('')
        setManteinance('')
        setAction('')
        setComplete('')
    }

    const resetUnchecked = (name) => {
        switch (name) {
            case 'plant':
                setPlant('')
                break;
            case 'attelier':
                setAttelier('')
                break;
            case 'manteinance':
                setManteinance('')
                break;
            case 'action':
                setAction('')
                break;
            case 'complete':
                setComplete('')
                break;
            default:
                break;
        }
    }

    const handleStartDateInput = event => {
        setStartDate(event.target.value);
    }

    const handleEndDateInput = event => {
        setEndDate(event.target.value);
    }

    const handleSearchFor = (event) => {
        setSearchFor({ ...searchFor, [event.target.name]: event.target.checked });
        event.target.checked === false && resetUnchecked(event.target.name);
    };

    const handlePlantSelect = event => {
        setPlant(event.target.value)
    }

    const handleAttelierSelect = event => {
        setAttelier(event.target.value)
    }

    const handleManteinanceSelect = event => {
        setManteinance(event.target.value)
    }

    const handleActionSelect = event => {
        setAction(event.target.value)
    }

    const handleCompleteSelect = event => {
        setComplete(event.target.value)
    }

    const handleDialogClose = _e => {
        setIsDialogOpen(false);
        setSearchFor(initialFValues);
        defaultValues();

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const searchForData = {
            startDate: startDate,
            endDate: endDate,
            plant: plant,
            attelier: attelier,
            manteinance: manteinance,
            action: action,
            complete: complete,
        }
        getDataFromAdvanceSearch(searchForData);
        setSearchFor(initialFValues);
        setIsDialogOpen(false);
        defaultValues();

    }


    return <MyDialog
        title={<Title value="Buscador de trabajos diarios" variant="button" color="primary" gutterBottom={true} />}
        isOpen={isDialogOpen}
        fullWidth={true}
    >
        <Container component="main" maxWidth="lg" className={classes.root}>
            <CssBaseline />

            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <div className={classes.dateGroup}>
                        <DatePicker
                            name='date'
                            label="Buscar desde"
                            value={startDate}
                            onChange={handleStartDateInput}
                            inputVariant="outlined"
                            margin={"dense"}
                        />
                        <Tooltip title={complete !== 'C' && complete !== '' ? 'Cambiar estado a completo para activar' : ''}>
                            <div>
                                <DatePicker
                                    name='date'
                                    label="Buscar hasta"
                                    value={endDate}
                                    onChange={handleEndDateInput}
                                    inputVariant="outlined"
                                    margin={"dense"}
                                    disabled={complete !== 'C' && complete !== '' ? true : false}
                                />
                            </div>
                        </Tooltip>
                    </div>
                    <Title value="Filtros" variant="subtitle2" color="primary" gutterBottom={true} />
                    <Tooltip title="Para reiniciar un filtro apague y encienda su switch" placement="top">
                        <FormGroup >
                            {swicthData.map(item => (
                                <Switch
                                    key={item.id}
                                    id={item.id}
                                    label={item.label}
                                    name={item.name}
                                    checked={false}
                                    onChange={handleSearchFor}
                                />
                            ))}
                        </FormGroup>
                    </Tooltip>
                    {searchFor.plant &&
                        <Select
                            id={'plant'}
                            label={"Planta"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={dailyWorkDataForSearch[0]}
                            value={plant}
                            setValue={setPlant}
                            handleSelect={handlePlantSelect}
                        />
                    }


                    {searchFor.attelier &&
                        <Select
                            id={'attelier'}
                            label={"Attelier"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={dailyWorkDataForSearch[1]}
                            value={attelier}
                            setValue={setAttelier}
                            handleSelect={handleAttelierSelect}
                        />
                    }
                    {searchFor.manteinance &&
                        <Select
                            id={'manteinance'}
                            label={"Tipo de mantenimiento"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={dailyWorkDataForSearch[2]}
                            value={manteinance}
                            setValue={setManteinance}
                            handleSelect={handleManteinanceSelect}
                        />
                    }
                    {searchFor.action &&
                        <Select
                            id={'action'}
                            label={"Acción"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={dailyWorkDataForSearch[3]}
                            value={action}
                            setValue={setAction}
                            handleSelect={handleActionSelect}
                        />
                    }
                    {searchFor.complete &&
                        <Select
                            id={'complete'}
                            label={"Estado"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={dailyWorkDataForSearch[4]}
                            value={complete}
                            setValue={setComplete}
                            handleSelect={handleCompleteSelect}
                        />
                    }

                    <MyDialogActions>
                        <Button onClick={handleSubmit} color="primary">
                            Buscar
                        </Button>
                        <Button onClick={handleDialogClose} color="primary">
                            Cerrar
                        </Button>
                    </MyDialogActions>
                </form>
            </div>

        </Container>
    </MyDialog >


}