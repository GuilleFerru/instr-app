import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, ButtonGroup, Typography } from '@material-ui/core';
import { holidayScoresStyle } from './HolidayScoresStyle';
import { Select } from '../../../../components/commonComponents/Controls/Select';
import ScoreIcon from '@material-ui/icons/Score';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ScoreTable from './Table/ScoreTable';
import { GenerateNewPeriodForm } from './Form/GenerateNewPeriodForm';
import { axiosPost } from '../../../../Services/Axios';
import { useHistory } from 'react-router-dom';




const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => holidayScoresStyle(theme));

export const HolidayScores = ({ periodOptions, setError, setSuccess }) => {

    const classes = useStyles();
    const history = useHistory();


    //const [periodOptions, setPeriodOptions] = useState([{ 'id': '', 'name': 'Seleccione un periodo' }]);
    const [periodScore, setPeriodScore] = useState('');

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loadingPeriod, setLoadingPeriod] = useState(false);
    // const [error, setError] = useState(false);
    // const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     new Promise(resolve => {
    //         setPeriodOptions(allData.periodsForSelectForm);
    //         resolve();
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);


    const generateNewPeriod = (startDate, endDate) => {
        axiosPost(`${baseUrl}/holidays/createPeriod`, { startDate, endDate }).then(res => {
            if (res.error) {
                setError(true)
                setTimeout(() => setError(false), 4000);
            } else {
                setSuccess(true)
                setTimeout(() => setSuccess(false), 4000);
                // setPeriodOptions(allData.periodsForSelectForm);
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

    const handlePeriodScoreSelect = event => {
        setPeriodScore(event.target.value)
    }

    const handleAverageScore = () => {

    }

    return <>
        <Typography color="inherit" variant="h6" gutterBottom>Puntajes y Promedios</Typography>
        <div className={classes.periodoContainer}>
            <div>
                <Box mb={2}>
                    <Select
                        label={""}
                        required={true}
                        id={'period-for-score'}
                        autoWidth={true}
                        margin={"dense"}
                        variant={'outlined'}
                        options={periodOptions}
                        value={periodScore}
                        setValue={setPeriodScore}
                        handleSelect={handlePeriodScoreSelect}
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
                </ButtonGroup>
            </div>
            <div className={classes.puntajeTabla}>
                <ScoreTable />
            </div>
            <GenerateNewPeriodForm isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} generateNewPeriod={generateNewPeriod} loadingPeriod={loadingPeriod} />
        </div>
    </>
}
