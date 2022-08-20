import React, { useState, useEffect, useContext, useRef } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, ButtonGroup, Typography } from '@material-ui/core';
import { holidayScoresStyle } from './HolidayScoresStyle';
import { Select } from '../components/Select';
import ScoreIcon from '@material-ui/icons/Score';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ScoreTable } from './Table/ScoreTable';
import { GenerateNewPeriodForm } from './Form/GenerateNewPeriodForm';
import { Alerts } from '../components/Alerts';
import { axiosPost } from '../../../../Services/Axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';




const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => holidayScoresStyle(theme));

export const HolidayScores = ({ periodOptions, periodData, title }) => {

    const classes = useStyles();
    const history = useHistory();
    const isMounted = useRef(false);
    const { socket } = useContext(AuthContext);
    const [period, setPeriod] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loadingPeriod, setLoadingPeriod] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [scores, setScores] = useState([]);


    useEffect(() => {
        if (isMounted.current) {
            const currentPeriod = periodOptions.find(option => option.name === periodData.periodName).id;
            setPeriod(currentPeriod ? currentPeriod : periodOptions[periodOptions.length - 1].id);
            setScores(periodData.scores);
        } else {
            isMounted.current = true;
        }
    }, [periodData, periodOptions]);

    const generateNewPeriod = (startDate, endDate) => {
        axiosPost(`${baseUrl}/holidays/createPeriod`, { startDate, endDate }).then(res => {
            if (res.error) {
                setError(true)
                setTimeout(() => setError(false), 4000);
            } else {
                setSuccess(true)
                setTimeout(() => setSuccess(false), 4000);
                socket.emit('get_holiday_data', new Date());
            }
            setIsDialogOpen(false);
            setLoadingPeriod(false);
        }).catch(_err => {
            history.push('/error')
        });
    }

    const handleNewPeriodDialogueOpen = () => {
        setIsDialogOpen(true);
    }

    const handleDeleteButton = () => {
        setOpenDeleteDialog(true);
    }

    const handleAgree = () => {
        socket.emit('delete_holiday_period', new Date(), period);
        setOpenDeleteDialog(false);
        setDeleteSuccess(true);
        setTimeout(() => setDeleteSuccess(false), 4000);
    }

    const handleAverageScore = () => {

    }

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
        //socket.emit('get_holiday_period', event.target.value);
        socket.emit('get_holiday_data', undefined, event.target.value);
    }


    return <>
        <div className={classes.containerHeader}>
            <Alerts
                title={'Estas seguro de borrar este período?'}
                error={error}
                success={success}
                deleteSuccess={deleteSuccess}
                openDialog={openDeleteDialog}
                setOpenDialog={setOpenDeleteDialog}
                handleAgree={handleAgree}
                dialogText={`Si borra el ${title} se perderan todos los promedios y todos los días de vacaciones asignados a este período`}
                agreeButtonText={'Borrar'}
            />
        </div>
        <Typography color="inherit" variant="h6" gutterBottom>Puntajes y Promedios</Typography>
        <div className={classes.periodoContainer}>
            <div>
                <Box mb={2}>
                    <Select
                        label={"Seleccione un periodo"}
                        required={true}
                        id={'period-for-score'}
                        autoWidth={true}
                        margin={"dense"}
                        variant={'outlined'}
                        options={periodOptions}
                        value={period}
                        handleChange={handlePeriodChange}
                    />
                </Box>
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical contained primary button group"
                    variant="contained"
                >
                    <Button onClick={handleAverageScore} endIcon={<AssessmentIcon />} >
                        Ver Promedios
                    </Button>
                    <Button onClick={handleNewPeriodDialogueOpen} endIcon={<ScoreIcon />}>
                        Crear nuevo Período
                    </Button>
                    <Button onClick={handleDeleteButton} endIcon={<DeleteForeverIcon />}>
                        Borrar Período
                    </Button>
                </ButtonGroup>
            </div>
            <div className={classes.puntajeTabla}>
                <ScoreTable scores={scores} />
            </div>
            <GenerateNewPeriodForm isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} generateNewPeriod={generateNewPeriod} loadingPeriod={loadingPeriod} />
        </div>
    </>
}
