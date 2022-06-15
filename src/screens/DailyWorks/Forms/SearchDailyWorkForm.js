import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Button, FormGroup } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
//import { AuthContext } from '../../../context/AuthContext';
import { searchDailyWorkFormStyle } from './SearchDailyWorkFormStyle';
import { MyDialog, MyDialogActions } from '../../../components/commonComponents/Dialog/MyDialog';
import { Title } from '../../../components/commonComponents/Title';
import DatePicker from '../../../components/commonComponents/Controls/DatePicker';
import { Switch } from '../../../components/commonComponents/Controls/Switch';

const useStyles = makeStyles((theme) => searchDailyWorkFormStyle(theme));

export const SearchDailyWorkForm = (
    {
        rowData,
        tableData,
        isDialogOpen,
        setIsDialogOpen
    }) => {

    const classes = useStyles();
    // const history = useHistory();
    // const { socket } = useContext(AuthContext);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    //const [isComplete, setIsComplete] = useState(false);
    const [searchFor, setSearchFor] = useState({
        plant: false,
        attelier: false,
        manteinance: false,
        action: false,
        complete: false,
    });


    useEffect(() => {
        //console.log(searchFor)
    }, [searchFor]);

    const handleStartDateInput = event => {
        setStartDate(event.target.value);
    }

    const handleEndDateInput = event => {
        setEndDate(event.target.value);
    }


    const handleSearchFor = (event) => {
        setSearchFor({ ...searchFor, [event.target.name]: event.target.checked });
    };


    const handleDialogClose = _e => {
        setIsDialogOpen(false);
        setSearchFor({
            plant: false,
            attelier: false,
            manteinance: false,
            action: false,
            complete: false,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsDialogOpen(false);

    }

    const swicthData = [
        { id: 'plant', label: 'Buscar tareas por planta', name: 'plant' },
        { id: 'attelier', label: 'Buscar tareas por atelier', name: 'attelier' },
        { id: 'manteinance', label: 'Buscar tareas por mantenimiento', name: 'manteinance' },
        { id: 'action', label: 'Buscar tareas por acción', name: 'action' },
        { id: 'complete', label: 'Buscar tareas por completado', name: 'complete' },
    ];


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
                        <DatePicker
                            name='date'
                            label="Buscar hasta"
                            value={endDate}
                            onChange={handleEndDateInput}
                            inputVariant="outlined"
                            margin={"dense"}
                        />
                    </div>
                    <Title value="Filtros" variant="subtitle2" color="primary" gutterBottom={true} />
                    <FormGroup >
                        {swicthData.map(item => (
                            <Switch
                                key={item.id}
                                label={item.label}
                                name={item.name}
                                checked={false}
                                onChange={handleSearchFor}
                            />
                        ))}
                    </FormGroup>
                    {/* 
                    {workStatus && <FormGroup >
                        <span>En construccion</span>
                    </FormGroup>
                    } */}
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