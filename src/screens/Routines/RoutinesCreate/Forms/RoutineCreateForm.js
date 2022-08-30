import React, { useRef, useState, useEffect } from 'react';
import { axiosPost } from '../../../../Services/Axios.js';
import { CssBaseline, Container, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { routineCreateFormStyle } from './RoutineCreateFormStyle';
import { MyDialog, MyDialogActions } from '../../../../components/commonComponents/Dialog/MyDialog';
import { Select } from '../../../../components/commonComponents/Controls/Select';
import { Title } from '../../../../components/commonComponents/Title';
import { Input } from '../../../../components/commonComponents/Controls/Input';
import { AutoComplete } from '../components/AutoComplete';
import { AutoCompleteCheckBox } from '../components/AutoCompleteCheckBox';
import DatePicker from '../../../../components/commonComponents/Controls/DatePicker';
import { useHistory } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => routineCreateFormStyle(theme));





export const RoutineCreateForm = ({ data, isDialogOpen, setIsDialogOpen }) => {

    const classes = useStyles();
    const history = useHistory();
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState(false);
    const [plant, setPlant] = useState(0);
    const [plantError, setPlantError] = useState(false);
    const [attelier, setAttelier] = useState(0);
    const [attelierError, setAttelierError] = useState(false);
    const tag = useRef();
    const [tagError, setTagError] = useState(false);
    const description = useRef();
    const [timeSchedule, setTimeSchedule] = useState(5);
    const [frequency, setFrequency] = useState('');
    const [frequencyError, setFrequencyError] = useState(false);
    const [manteinance, setManteinance] = useState(2);
    const [action, setAction] = useState(2);
    const [showCheckDay, setShowCheckDay] = useState(false);
    const [checkDays, setCheckDays] = useState([]);
    const [checkDaysError, setCheckDaysError] = useState(false);
    const [showOtherCheckDay, setShowOtherCheckDay] = useState(false);
    const [startDay, setStartDay] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [otherCheckDay, setOtherCheckDay] = useState(null);
    const [otherCheckDayError, setOtherCheckDayError] = useState(false);



    const handleOtherCheckDay = event => {
        setOtherCheckDay(event.target.value);
        setStartDay(new Date(new Date(event.target.value).getFullYear(), new Date(event.target.value).getMonth(), 1));
    }

    useEffect(() => {
        if (frequency >= 1 && frequency <= 4) {
            setOtherCheckDay(null)
            setShowCheckDay(true);
            setShowOtherCheckDay(false);
            setStartDay(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
        } else if (frequency >= 5) {
            setCheckDays([]);
            setShowCheckDay(false);
            setShowOtherCheckDay(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frequency]);


    const handleDialogClose = _e => {
        setNicknameError(false);
        setPlantError(false);
        setAttelierError(false);
        setTagError(false);
        setIsDialogOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        nickname === '' ? setNicknameError(true) : setNicknameError(false);
        plant === 0 ? setPlantError(true) : setPlantError(false);
        attelier === 0 ? setAttelierError(true) : setAttelierError(false);
        tag.current.value === '' ? setTagError(true) : setTagError(false);
        frequency === '' ? setFrequencyError(true) : setFrequencyError(false);
        checkDays.length === 0 ? setCheckDaysError(true) : setCheckDaysError(false);
        otherCheckDay === null ? setOtherCheckDayError(true) : setOtherCheckDayError(false);

        if (nickname !== '' && plant !== 0 && attelier !== 0 && tag.current.value !== '' && frequency !== '' && (checkDays.length > 0 || otherCheckDay !== null)) {
            const newRoutine = {
                plant: plant,
                attelier: attelier,
                tag: tag.current.value,
                timeSchedule: timeSchedule,
                frecuency: frequency,
                manteinance: manteinance,
                action: action,
                description: description.current.value,
                checkDays: checkDays && checkDays.map(item => item.id),
                otherCheckDay: otherCheckDay,
                startDay: startDay,
                filePath: '',
                nickname: nickname
            }
            axiosPost(`${baseUrl}/routine/create`, newRoutine).then(res => {
                setIsDialogOpen(false);
            }).catch(err => {
                history.push('/error')
            });
        }
    }




    return <MyDialog
        title={<Title value="Crear una nueva Rutina" variant="button" color="primary" gutterBottom={true} />}
        isOpen={isDialogOpen}
        fullWidth={true}
        maxWidth={'sm'}
    >
        <Container component="main" maxWidth="lg" className={classes.root}>
            <CssBaseline />

            <div className={classes.paper}>
                <form className={classes.form} noValidate autoComplete="off"  >
                    <AutoComplete
                        label={"Nombre de la rutina"}
                        name="nickname"
                        autoCompleteId="autocomplete-nickname"
                        value={nickname}
                        setValue={setNickname}
                        options={data.nicknames}
                        placeholder="Ingrese o seleccione un nombre para la rutina"
                        width="97.5%"
                        error={nicknameError}

                    />
                    <Select
                        id={'plant'}
                        label={"Planta"}
                        required={true}
                        autoWidth={true}
                        margin={"dense"}
                        variant={'outlined'}
                        options={data.plants}
                        value={plant}
                        setValue={setPlant}
                        error={plantError}

                    />
                    <Select
                        id={'attelier'}
                        label={"Attelier"}
                        required={true}
                        autoWidth={true}
                        margin={"dense"}
                        variant={'outlined'}
                        options={data.attelieres}
                        value={attelier}
                        setValue={setAttelier}
                        className={classes.textField}
                        error={attelierError}
                    />
                    <Input
                        variant={"outlined"}
                        margin={"dense"}
                        required={true}
                        id="tag"
                        label="Tag"
                        name={"tag"}
                        autoComplete={"tag"}
                        type={"text"}
                        inputRef={tag}
                        error={tagError}

                    />
                    <Input
                        variant={"outlined"}
                        margin={"dense"}
                        required={true}
                        placeholder="Rutina (frecuencia) según RG-44-XXX"
                        id="description"
                        label="Descripción"
                        name="description"
                        autoComplete="description"
                        type="text"
                        inputRef={description}
                    />
                    <Select
                        id={'timeSchedule'}
                        label={"Horario de ejecución"}
                        required={true}
                        autoWidth={true}
                        margin={"dense"}
                        variant={'outlined'}
                        options={data.timeSchedules}
                        value={timeSchedule}
                        setValue={setTimeSchedule}
                    />

                    <Select
                        id={'manteinance'}
                        label={"Tipo de mantenimiento"}
                        required={true}
                        autoWidth={true}
                        margin={"dense"}
                        variant={'outlined'}
                        options={data.manteinances}
                        value={manteinance}
                        setValue={setManteinance}
                    />
                    <Select
                        id={'action'}
                        label={"Acción"}
                        required={true}
                        autoWidth={true}
                        margin={"dense"}
                        variant={'outlined'}
                        options={data.actions}
                        value={action}
                        setValue={setAction}
                    />
                    <Select
                        id={'frequency'}
                        label={"Frecuencia de ejecución"}
                        required={true}
                        autoWidth={true}
                        margin={"dense"}
                        variant={'outlined'}
                        options={data.frequencies}
                        value={frequency}
                        setValue={setFrequency}
                        error={frequencyError}
                    />

                    {showCheckDay ? (
                        <AutoCompleteCheckBox
                            value={checkDays}
                            setValue={setCheckDays}
                            label={"Días de ejecución"}
                            placeholder="Seleccione los días de ejecución"
                            width="97.5%"
                            error={checkDaysError}
                        />
                    ) : ''}
                    {showOtherCheckDay ? (
                        <DatePicker
                            name='date'
                            label="Fecha de chequeo"
                            value={otherCheckDay}
                            onChange={handleOtherCheckDay}
                            inputVariant="outlined"
                            margin={"dense"}
                            error={otherCheckDayError}
                        />
                    ) : ''}
                    <MyDialogActions>
                        <Button color="primary" onClick={handleSubmit} >
                            Crear
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