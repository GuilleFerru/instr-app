import React, { useState, useEffect, useContext } from 'react';
import { DateContext } from '../../../../context/DateContext';
import { routineCrudCommonActions } from '../RoutineCrudCommonActions';
import { axiosPost } from '../../../../Services/Axios.js';
import { makeStyles } from "@material-ui/core/styles";
import { routineCreateFormStyle } from './RoutineCreateFormStyle';
import { RoutineForm } from '../components/RoutineForm.js';
import { useHistory } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => routineCreateFormStyle(theme));

export const RoutineCreateForm = ({ data, isDialogOpen, setIsDialogOpen }) => {

    const classes = useStyles();
    const history = useHistory();
    const { handleRoutineDate } = useContext(DateContext);
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState(false);
    const [plant, setPlant] = useState(0);
    const [plantError, setPlantError] = useState(false);
    const [attelier, setAttelier] = useState(0);
    const [attelierError, setAttelierError] = useState(false);
    const [tag, setTag] = useState('');
    const [tagError, setTagError] = useState(false);
    const [description, setDescription] = useState('');
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
    const [alert, setAlert] = useState({
        severity: 'success',
        title: '',
        message: '',
        messageAction: '',
        collapse: false
    })

    const {
        handleTagInput,
        handleDescriptionInput,
        errorDefault,
        handleOtherCheckDay,
        validateInputs,
        enableFrequencyInputs,
        showAlert
    } = routineCrudCommonActions(
        setTag,
        setDescription,
        setNicknameError,
        setPlantError,
        setAttelierError,
        setTagError,
        setFrequencyError,
        setCheckDaysError,
        setOtherCheckDayError,
        setIsDialogOpen,
        setOtherCheckDay,
        setStartDay,
        setShowCheckDay,
        setShowOtherCheckDay,
        setCheckDays,
        setAlert
    );


    useEffect(() => {
        if (frequency >= 1 && frequency <= 4) {
            enableFrequencyInputs(true)
            setStartDay(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
        } else if (frequency >= 5) {
            enableFrequencyInputs(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frequency]);

    const handleDialogClose = _e => {
        errorDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateInputs(nickname, plant, attelier, tag, frequency, checkDays, otherCheckDay);
        if (nickname !== '' && plant !== 0 && attelier !== 0 && tag !== '' && frequency !== '' && (checkDays.length > 0 || otherCheckDay !== null)) {
            const newRoutine = {
                plant: plant,
                attelier: attelier,
                tag: tag,
                timeSchedule: timeSchedule,
                frecuency: frequency,
                manteinance: manteinance,
                action: action,
                description: description,
                checkDays: checkDays && checkDays.map(item => item.id),
                otherCheckDay: otherCheckDay,
                startDay: startDay,
                filePath: '',
                nickname: nickname
            }
            axiosPost(`${baseUrl}/routine/create`, newRoutine).then(res => {
                if (res === true) {
                    showAlert('success', 'Rutina creada', 'La rutina se ha creado correctamente', 'Refresque la página para ver los cambios', true);
                } else {
                    showAlert('error', 'Error al crear la rutina', 'Ha ocurrido un error al crear la rutina', 'Intente no repetir el TAG', true);
                }
                setTimeout(() => { setAlert((prev) => ({ ...prev, collapse: false })) }, 2000);
                setIsDialogOpen(false);

            }).catch(_err => {
                history.push('/error')
            });
            //lo uso para que no se recargue la pagina
            handleRoutineDate(new Date());
        }
    }


    return <RoutineForm data={
        {
            alert,
            classes,
            title: "Crear una nueva Rutina",
            titleColor: classes.titleNormal,
            complete: false,
            isDialogOpen,
            nickname,
            setNickname,
            nicknames: data.nicknames,
            nicknameError,
            plant,
            setPlant,
            plants: data.plants,
            plantError,
            attelier,
            attelieres: data.attelieres,
            setAttelier,
            attelierError,
            tag,
            handleTagInput,
            tagError,
            description,
            handleDescriptionInput,
            timeSchedule,
            setTimeSchedule,
            timeSchedules: data.timeSchedules,
            manteinance,
            setManteinance,
            manteinances: data.manteinances,
            action,
            setAction,
            actions: data.actions,
            showActive: false,
            frequency,
            setFrequency,
            frequencies: data.frequencies,
            frequencyError,
            showCheckDay,
            checkDays,
            setCheckDays,
            checkDaysError,
            showOtherCheckDay,
            otherCheckDay,
            handleOtherCheckDay,
            otherCheckDayError,
            setStartDay,
            setOtherCheckDay,
            handleSubmit,
            handleDialogClose,
        }}
        buttonName="Crear"
    >
    </RoutineForm>

}