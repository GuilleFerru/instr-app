import React, { useState, useEffect, useContext } from 'react';
import { CssBaseline, Container, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from '../../../../context/AuthContext';
import { updateShutdowWorksFormStyle } from './UpdateShutdowWorksFormStyle';
import DatePicker from '../../../../components/commonComponents/Controls/DatePicker';
import { MyDialog, MyDialogActions } from '../../../../components/commonComponents/Dialog/MyDialog';
import { Input } from '../../../../components/commonComponents/Controls/Input';
import { Select } from '../../../../components/commonComponents/Controls/Select';
import {formatDate} from '../../../../Services/DateUtils';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => updateShutdowWorksFormStyle(theme));

const maxDateForDailyWork = () => {
    const date = new Date();
    const y = date.getFullYear()
    const m = date.getMonth();
    const lastDay = new Date(y, m + 1, 0);
    return lastDay;
}

const completeOptions = [
    { id: 'C', name: 'Completo' },
    { id: 'E', name: 'En ejecución' },
    { id: 'P', name: 'Pendiente' },
    { id: 'R', name: 'Demorado' },
]

export const UpdateShutdowWorksForm = (
    {
        rowData,
        tableData,
        isDialogOpen,
        setIsDialogOpen
    }) => {

    const classes = useStyles();
    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const [tag, setTag] = useState('');
    const [ot, setOt] = useState('');
    const [action, setAction] = useState([{ 'id': '', 'name': '' }]);
    const [beginDate, setBeginDate] = useState('');
    const [workToDo, setWorkToDo] = useState('');
    const [description, setDescription] = useState('');
    const [complete, setComplete] = useState([{ 'id': '', 'name': '' }]);

    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
        setTag(rowData.tag);
        setOt(rowData.ot);
        setAction(rowData.action);
        setBeginDate(rowData.beginDate ? new Date(rowData.beginDate).toISOString() : new Date().toISOString());
        setWorkToDo(rowData.workToDo);
        setDescription(rowData.description);
        setComplete(rowData.complete);
        setMaxDate(rowData.beginDate ? maxDateForDailyWork(rowData.beginDate) : new Date().toISOString());
    }, [rowData]);


    const handleDialogClose = _e => {
        setIsDialogOpen(false);
    };

    const handleTagInput = event => {
        setTag(event.target.value);
    }

    const handleOtInput = event => {
        setOt(event.target.value);
    }

    const handleActionSelect = (event) => {
        setAction(event.target.value);
    };

    const handleBeginDateInput = event => {
        setBeginDate(event.target.value);
    }

    const handleWorkToDoInput = event => {
        setWorkToDo(event.target.value);
    }

    const handleDescriptionInput = event => {
        setDescription(event.target.value);
    }

    const handleCompleteSelect = (event) => {
        setComplete(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const oldData = rowData
        const newData = {
            ...rowData,
            tag: tag,
            ot: ot,
            action: action,
            beginDate: beginDate,
            workToDo: workToDo,
            description: description,
            complete: complete,
            //,
        }
        setIsDialogOpen(false);
        socket ? socket.emit('update_plant_shutdown_work', { newData, oldData }) : history.push('/error');
    }

    return <MyDialog
        title="Actualizar tarea"
        isOpen={isDialogOpen}
        fullWidth={true}
    >
        <Container component="main" maxWidth="lg" className={classes.root}>
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Input
                        variant={"outlined"}
                        margin={"dense"}
                        required={true}
                        fullWidth={true}
                        id={"tag"}
                        label={"Tag del equipo"}
                        name={"tag"}
                        autoFocus={true}
                        type={"input"}
                        value={tag}
                        onChange={handleTagInput}
                    />
                    <Input
                        variant={"outlined"}
                        margin={"dense"}
                        fullWidth={true}
                        id={"ot"}
                        label={"OT"}
                        name={"tag"}
                        autoFocus={true}
                        type={"input"}
                        value={ot}
                        onChange={handleOtInput}
                    />
                    <Select
                        label={"Acción"}
                        required={true}
                        autoWidth={true}
                        margin={"dense"}
                        variant={'outlined'}
                        options={tableData.actions}
                        value={action}
                        setValue={setAction}
                        handleSelect={handleActionSelect}
                    />
                    <DatePicker
                        name='date'
                        label="Fecha"
                        value={beginDate}
                        onChange={handleBeginDateInput}
                        inputVariant="outlined"
                        margin={"dense"}
                        maxDate={maxDate}
                        maxDateMessage={`La fecha no puede ser mayor al ${formatDate(maxDate)}`}
                    />
                    <Input
                        variant={"outlined"}
                        margin={"dense"}
                        required={true}
                        fullWidth={true}
                        id={"workToDo"}
                        label={"Trabajo a realizar"}
                        name={"workToDo"}
                        autoFocus={true}
                        type={"input"}
                        multiline={3}
                        value={workToDo}
                        onChange={handleWorkToDoInput}
                    />
                    <Input
                        variant={"outlined"}
                        margin={"dense"}
                        required={true}
                        fullWidth={true}
                        id={"description"}
                        label={"Trabajo realizado"}
                        name={"description"}
                        autoFocus={true}
                        type={"input"}
                        multiline={3}
                        value={description}
                        onChange={handleDescriptionInput}
                    />
                    <Select
                        label={"Estado"}
                        required={true}
                        autoWidth={true}
                        margin={"dense"}
                        variant={'outlined'}
                        options={completeOptions}
                        value={complete}
                        setValue={setComplete}
                        handleSelect={handleCompleteSelect}
                    />
                    <MyDialogActions>
                        <Button onClick={handleSubmit} color="primary">
                            Actualizar
                        </Button>
                        <Button onClick={handleDialogClose} color="primary">
                            Cerrar
                        </Button>
                    </MyDialogActions>
                </form>
            </div>
        </Container>
    </MyDialog>


}