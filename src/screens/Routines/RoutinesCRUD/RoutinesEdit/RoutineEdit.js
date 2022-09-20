import React, { useState } from 'react';
import { axiosGetBody } from '../../../../Services/Axios.js';
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Button } from '@material-ui/core';
import { MyDialog, MyDialogActions } from '../../../../components/commonComponents/Dialog/MyDialog';
import { Select } from '../../../../components/commonComponents/Controls/Select';
import { Title } from '../../../../components/commonComponents/Title';
import { routineEditStyle } from './RoutineEditStyle';
import { RoutineEditForm } from './RoutineEditForm';

import { useHistory } from 'react-router-dom';


const baseUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => routineEditStyle(theme));

export const RoutineEdit = ({ data, isDialogOpen, setIsDialogOpen }) => {

    const classes = useStyles();
    const history = useHistory();
    const [routineId, setRoutineId] = useState('');
    const [routine, setRoutine] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const handleDialogClose = _e => {
        setIsDialogOpen(false);
        setRoutineId('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosGetBody(`${baseUrl}/routine/getDataForRoutineEdit/routineId`, { params: { routineId } }).then(data => {
            setRoutine(data);
            setEditDialogOpen(true);
            setIsDialogOpen(false);
            setRoutineId('');
        }).catch(_err => {
            history.push('/error');
        });

    }

    return <>
        <MyDialog
            title={<Title value='Seleccione la rutina a editar' variant="button" color="primary" gutterBottom={true} />}
            isOpen={isDialogOpen}
            fullWidth={true}
            maxWidth={'xs'}
        >
            <Container component="main" maxWidth="lg" className={classes.root}>
                <CssBaseline />
                <div className={classes.paper}>
                    <form className={classes.form} noValidate autoComplete="off"  >
                        <Select
                            id={'rutina'}
                            label={"Rutina"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={data.tags}
                            value={routineId}
                            setValue={setRoutineId}
                        />
                        <MyDialogActions>
                            <Button color="primary" onClick={handleSubmit} >
                                Editar
                            </Button>
                            <Button onClick={handleDialogClose} color="primary">
                                Cerrar
                            </Button>
                        </MyDialogActions>
                    </form>
                </div>
            </Container>
        </MyDialog >
        <RoutineEditForm data={data} routine={routine} isDialogOpen={editDialogOpen} setIsDialogOpen={setEditDialogOpen}  ></RoutineEditForm>
    </>
}











