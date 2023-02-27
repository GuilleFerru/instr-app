import React, { useState, useEffect, useRef, useContext, useReducer } from 'react';
import { axiosPost } from '../../../../Services/Axios.js';
import { TYPES } from '../../../../actions/holidayEmpActions';
import { AuthContext } from '../../../../context/AuthContext';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Button } from '@material-ui/core';
import { holidaySelectorStyle } from './HolidaySelectorStyle';
import { Select } from '../components/Select';
import StaticDateRangePicker from '../../../../components/commonComponents/Controls/StaticDateRangePicker';
import MoreIcon from '@material-ui/icons/More';
import SaveIcon from '@material-ui/icons/Save';
import Backdrop from '../../../../components/Backdrop/Backdrop';
import { AlertClose } from '../components/AlertClose';
import { Alerts } from '../components/Alerts';
import { HolidayDetails } from './List/HolidayDetails';
import { holidayEmpReducer, holidayEmpInitialState } from '../../../../reducers/holidayEmpReducer';
import { HolidayShiftSub } from './List/HolidayShiftSub';
import { NextEmpHoliday } from './List/NextEmpHoliday.js';

const useStyles = makeStyles((theme) => holidaySelectorStyle(theme));
const baseUrl = process.env.REACT_APP_API_URL;

const staticDateArrayDefault = [
    {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        color: '#069999',
    }
]

const calculateTakenDays = (staticDateArray) => {
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.round((staticDateArray[0].endDate - staticDateArray[0].startDate) / oneDay) + 1;
}

const dataToSave = (
    employee,
    employeeName,
    employeeCondition,
    period,
    staticDateArray,
    createSchedule,
    setTakenDays,
    setDisplayedName,
    setStaticDateArray,
    setOpenDialog,
    socket,
    setOnLoading,
    substitute = null
) => {

    const empNewDataHoliday = {
        employee: employee,
        employeeName: employeeName,
        employeeCondition: employeeCondition,
        periodId: period,
        startDate: staticDateArray[0].startDate,
        endDate: staticDateArray[0].endDate,
        createSchedule: createSchedule,
        substitute: substitute,
    }
    setTakenDays(calculateTakenDays(staticDateArray));
    setDisplayedName(employeeName)
    setStaticDateArray(staticDateArrayDefault);
    setOpenDialog(false);
    setOnLoading(true);
    socket.emit('create_employee_holiday', empNewDataHoliday);
}


export const HolidaySelector = ({ periodOptions, periodData, employeeOptions, nextEmpHoliday }) => {

    const isMounted = useRef(false);
    const classes = useStyles();
    const { user, socket } = useContext(AuthContext);
    const [state, dispatch] = useReducer(holidayEmpReducer, holidayEmpInitialState);
    const { employee, employeeName, employeeCondition, leftDays, shiftType } = state;
    const [period, setPeriod] = useState('');
    const [periodName, setPeriodName] = useState('');
    const [succesAdd, setSuccesAdd] = useState(false);
    const [displayedName, setDisplayedName] = useState('');
    const [takenDays, setTakenDays] = useState('0')
    const [staticDateArray, setStaticDateArray] = useState(staticDateArrayDefault);
    const [openDialog, setOpenDialog] = useState(false);
    const [employeeDetails, setEmployeeDetails] = useState([{}]);
    const [holidayDetailDialog, setHolidayDetailDialog] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const [onLoading, setOnLoading] = useState(false);
    const [shiftSubstitute, setShiftSubstitute] = useState(false);
    const [isHolidayShiftSubDialogOpen, setIsHolidayShiftSubDialogOpen] = useState(false);
    const [substitute, setSubstitute] = useState('');



    useEffect(() => {
        if (isMounted.current) {
            const currentPeriod = periodOptions.find(option => option.name === periodData.periodName);
            setPeriod(currentPeriod.id);
            setPeriodName(currentPeriod.name);
            dispatch({ type: TYPES.TOOGLE_PERIOD, payload: employeeOptions });
        } else {
            isMounted.current = true;
        }
    }, [employeeOptions, periodData, periodOptions]);

    useEffect(() => {
        if (isMounted.current) {
            const listener = () => {
                setSuccesAdd(true);
                setOnLoading(false);
            }
            socket.on('create_employee_holiday', listener);
            return () => { socket.off('create_employee_holiday', listener) }
        } else {
            isMounted.current = true;
        }
    }, [socket]);


    const handlePeriodChange = (event) => {
        socket.emit('get_holiday_data', undefined, event.target.value);
    }

    const handleEmployeeChange = event => {
        dispatch({ type: TYPES.TOOGLE_EMP_OPTIONS, payload: employeeOptions.find(option => option.id === event.target.value) });
    }

    const handleEmpHolidayDetails = () => {
        const employeeDetail = periodData.holidaysData.filter(holiday => holiday.employee === employee)
        setEmployeeDetails({
            employee: employee,
            employeeName: employeeName,
            employeeCondition: employeeCondition,
            periodId: period,
            periodName: periodName,
            employeeDetail: employeeDetail,
            shiftType: shiftType
        });
        setHolidayDetailDialog(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setOpenDialog(true);
    }

    const handleNotAddToSchedule = () => {
        dataToSave(employee, employeeName, employeeCondition, period, staticDateArray, false, setTakenDays, setDisplayedName, setStaticDateArray, setOpenDialog, socket, setOnLoading)
    }

    const handleAddToSchedule = () => {
        if (shiftType === 'rotativeShift') {
            setShiftSubstitute(true);
            setOpenDialog(false);
        } else {
            dataToSave(employee, employeeName, employeeCondition, period, staticDateArray, true, setTakenDays, setDisplayedName, setStaticDateArray, setOpenDialog, socket, setOnLoading)
        }
    }

    const handleAddSubstitute = (event) => {
        if (event.currentTarget.id === 'agreeButton') {
            setIsHolidayShiftSubDialogOpen(true);
        } else {
            dataToSave(employee, employeeName, employeeCondition, period, staticDateArray, true, setTakenDays, setDisplayedName, setStaticDateArray, setOpenDialog, socket, setOnLoading)
        }
        setShiftSubstitute(false);
    }

    const handleSubmitSubstitute = () => {
        setIsHolidayShiftSubDialogOpen(false);
        setOnLoading(true);
        const llamadaData = {
            legajo: substitute,
            startDate: staticDateArray[0].startDate,
            endDate: staticDateArray[0].startDate,
            aditional: 14,
            aditionalInfo: `1 cob turno ${employeeName}`
        }
        const shiftData = {
            holidayEmp: employee,
            legajo: substitute,
            startDate: staticDateArray[0].startDate,
            endDate: staticDateArray[0].endDate,
            aditional: 25,
            aditionalInfo: `Cob turno ${employeeName}`
        }
        axiosPost(`${baseUrl}/schedule/create/aditionals`, llamadaData).then((_response) => {
            axiosPost(`${baseUrl}/schedule/create/aditionals`, shiftData).then((_response) => {
                dataToSave(employee, employeeName, employeeCondition, period, staticDateArray, true, setTakenDays, setDisplayedName, setStaticDateArray, setOpenDialog, socket, setOnLoading, substitute)
            }).catch((_error) => { })
        }).catch((_error) => { })
    }



    return <>
        <div className={classes.alert}>
            <AlertClose
                open={successDelete}
                setOpen={setSuccessDelete}
                title='Vacaciones borradas con exito'
                text={'Ha borrado la fracción con exito'}
                alternativeText={`Por favor continue.`}
            />
        </div>
        <div className={classes.alert}>
            <AlertClose
                open={succesAdd}
                setOpen={setSuccesAdd}
                title='Vacaciones guardadas'
                text={periodName}
                alternativeText={`Agrego ${takenDays} días de vacaciones a ${displayedName}`}
            />
        </div>
        <div className={classes.alert}>
            <Alerts
                title={'¿Desea agregar estos días al Parte Diario?'}
                dialogText={'Si da click en Agregar al Parte Diario, estos días apareceran como adicionales en el Parte Diario.'}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                enableExtraButton={true}
                handleAgree={handleAddToSchedule}
                handleExtraButton={handleNotAddToSchedule}
                agreeButtonText={'Agregar al Parte Diario'}
                extraButtonText={'No agregar al Parte Diario'}
            />
        </div>
        <div className={classes.alert}>
            <Alerts
                title={'¿Desea agregar un reemplazo?'}
                dialogText={'Si da click en Agregar, debera designar un reemplazante.'}
                enableExtraButton={true}
                openDialog={shiftSubstitute}
                setOpenDialog={setShiftSubstitute}
                handleAgree={handleAddSubstitute}
                agreeButtonText={'Agregar reemplazo'}
                extraButtonText={'No agregar y guardar'}
                handleExtraButton={handleAddSubstitute}
            />
        </div>
        <Typography variant="h6" gutterBottom>Selector de Vacaciones</Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
            <div className={classes.employees}>
                <div className={classes.employeeData}>
                    <Box mb={2}>
                        <Select
                            label={"Seleccione un periodo"}
                            required={true}
                            id={'period-for-select'}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={periodOptions}
                            value={period}
                            handleChange={handlePeriodChange}
                        />
                    </Box>
                    <Box mb={2}>
                        <Select
                            label={"Seleccione un empleado"}
                            required={true}
                            id={'period-for-employee'}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={employeeOptions}
                            value={employee}
                            handleChange={handleEmployeeChange}
                        />
                    </Box>
                    <Box mb={2}>
                        <Typography variant="overline" display="block" gutterBottom>Días Restantes: {leftDays}</Typography>
                    </Box>
                    {period === periodOptions[0]?.id && (
                        <Box mb={2}>
                            <Typography variant="button" display="block" gutterBottom color='error'>No se puede modificar este período</Typography>
                        </Box>
                    )}
                    <Box mb={2} >
                        <Button onClick={handleEmpHolidayDetails} color="primary" endIcon={<MoreIcon />} variant="contained" disabled={period === periodOptions[0]?.id}>
                            Ver Mas
                        </Button>
                    </Box>
                </div>
                <div className={classes.nextEmpHoliday}>
                    <Box mb={2} mr={2}>
                        <Typography variant="overline" display="block" >Proximas vacaciones</Typography>
                        <Box ml={2} mb={0}>
                            {nextEmpHoliday.map(nextEmpHoliday => {
                                return <NextEmpHoliday
                                    key={nextEmpHoliday.employee}
                                    employee={nextEmpHoliday}
                                />
                            })}
                        </Box>
                    </Box>
                </div>
                <div className={classes.save}>
                    <Box >
                        <Button onClick={handleSubmit} color="primary" endIcon={<SaveIcon />} variant="contained" disabled={period === periodOptions[0]?.id || user?.userType === 'user'}>
                            Guardar
                        </Button>
                    </Box>
                </div>
            </div>
            <div className={classes.datePicker}>
                {/* Establecer Fechas */}
                <StaticDateRangePicker staticDateArray={staticDateArray} setStaticDateArray={setStaticDateArray} />
            </div>
        </form>
        <HolidayDetails
            holidayData={employeeDetails}
            isDialogOpen={holidayDetailDialog}
            setIsDialogOpen={setHolidayDetailDialog}
            successDelete={successDelete}
            setSuccessDelete={setSuccessDelete}
        />
        <HolidayShiftSub
            isHolidayShiftSubDialogOpen={isHolidayShiftSubDialogOpen}
            setIsHolidayShiftSubDialogOpen={setIsHolidayShiftSubDialogOpen}
            substitutes={employeeOptions}
            substitute={substitute}
            setSubstitute={setSubstitute}
            setOnLoading={setOnLoading}
            staticDateArray={staticDateArray}
            handleSubmitSubstitute={handleSubmitSubstitute}
        />
        <Backdrop open={onLoading} />
    </>
}
