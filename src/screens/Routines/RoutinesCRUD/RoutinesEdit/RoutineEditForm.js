import React, { useState, useRef, useEffect, useContext } from 'react';
import { DateContext } from '../../../../context/DateContext';
import { routineCrudCommonActions } from '../RoutineCrudCommonActions';
import { axiosPut } from '../../../../Services/Axios.js';
import { makeStyles } from "@material-ui/core/styles";
import { routineEditStyle } from './RoutineEditStyle';
import { RoutineForm } from '../components/RoutineForm.js';
import { useHistory } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => routineEditStyle(theme));

export const RoutineEditForm = ({ data, routine, isDialogOpen, setIsDialogOpen }) => {

    const classes = useStyles();
    const isMounted = useRef(false);
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
    const [active, setActive] = useState(true);
    const [frequency, setFrequency] = useState('');
    const [frequencyError, setFrequencyError] = useState(false);
    const [manteinance, setManteinance] = useState(2);
    const [action, setAction] = useState(2);
    const [showCheckDay, setShowCheckDay] = useState(false);
    const [checkDays, setCheckDays] = useState([]);
    const [checkDaysError, setCheckDaysError] = useState(false);
    const [showOtherCheckDay, setShowOtherCheckDay] = useState(false);
    const [startDay, setStartDay] = useState(new Date());
    const [otherCheckDay, setOtherCheckDay] = useState(null);
    const [otherCheckDayError, setOtherCheckDayError] = useState(false);
    const [complete, setComplete] = useState(true);
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
        showAlert,
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
        setAlert,
    );


    useEffect(() => {
        if (isMounted.current) {
            setNickname(routine.nickname);
            setPlant(routine.plant);
            setAttelier(routine.attelier);
            setTag(routine.tag);
            setDescription(routine.description);
            setTimeSchedule(routine.timeSchedule);
            setActive(routine.active);
            setFrequency(routine.frecuency);
            setManteinance(routine.manteinance);
            setAction(routine.action);
            setCheckDays(routine.checkDays);
            setOtherCheckDay(routine.otherCheckDay);
            setStartDay(routine.startDay);
            setComplete(routine.complete);
        } else {
            isMounted.current = true;
        }
    }, [routine]);


    useEffect(() => {
        if (isMounted.current) {
            if (routine.frecuency >= 1 && routine.frecuency <= 4) {
                enableFrequencyInputs(true)
            } else if (routine.frecuency >= 5) {
                enableFrequencyInputs(false)
            }
        } else {
            isMounted.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frequency, routine.frecuency]);

    const handleDialogClose = _e => {
        errorDefault();
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        !complete && validateInputs(nickname, plant, attelier, tag, frequency, checkDays, otherCheckDay);

        if (complete || (nickname !== '' && plant !== 0 && attelier !== 0 && tag !== '' && frequency !== '' && (checkDays.length > 0 || otherCheckDay !== null))) {
            const newRoutine = {
                routineId: routine.routineId,
                routineScheduleId: routine.routineScheduleId,
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
                nickname: nickname,
                ot: routine.ot,
                active: active,
                complete: complete,
            }
            axiosPut(`${baseUrl}/routine/updateRoutine`, newRoutine).then(res => {
                if (res.data === true) {
                    showAlert('success', 'Rutina actualizada correctamente', 'Se actualizo la rutina', 'Refresque la página para ver los cambios', true);
                } else {
                    showAlert('error', 'Error al actualizar la rutina', 'No se pudo actualizar la rutina', 'Intente nuevamente', true);
                }
                setTimeout(() => { setAlert((prev) => ({ ...prev, collapse: false })) }, 2000);
                setIsDialogOpen(false);
            }).catch(_err => {
                history.push('/error')
            });
        }
        errorDefault();
        //lo uso para que no se recargue la pagina
        handleRoutineDate(new Date());
    }


    return <RoutineForm data={
        {
            alert,
            classes,
            title: complete ? "Rutina completa -- No se pueden editar todos los campos --" : "Editar rutina",
            titleColor: complete ? classes.titleError : classes.titleNormal,
            complete,
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
            active,
            setActive,
            showActive: true,
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
        buttonName="Editar"
    >
    </RoutineForm>
}

