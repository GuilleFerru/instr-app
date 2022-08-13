import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Button } from '@material-ui/core';
//import { addDays } from 'date-fns';
import { holidaySelectorStyle } from './HolidaySelectorStyle';
import { Select } from '../components/Select';
import StaticDateRangePicker from '../../../../components/commonComponents/Controls/StaticDateRangePicker';
import MoreIcon from '@material-ui/icons/More';
import SaveIcon from '@material-ui/icons/Save';
import { AlertClose } from '../components/AlertClose';
import { Alerts } from '../components/Alerts';
import { HolidayDetails } from './List/HolidayDetails';



//const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => holidaySelectorStyle(theme));

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

const dataToSave = (employee, employeeName, period, staticDateArray, createSchedule, setTakenDays, setDisplayedName, setStaticDateArray, setOpenDialog, socket) => {

    const empNewDataHoliday = {
        employee: employee,
        employeeName: employeeName,
        periodId: period,
        startDate: staticDateArray[0].startDate,
        endDate: staticDateArray[0].endDate,
        createSchedule: createSchedule
    }
    setTakenDays(calculateTakenDays(staticDateArray));
    setDisplayedName(employeeName)
    setStaticDateArray(staticDateArrayDefault);
    setOpenDialog(false);
    socket.emit('create_employee_holiday', empNewDataHoliday);

}


export const HolidaySelector = ({ periodOptions, periodData, employeeOptions }) => {

    const isMounted = useRef(false);
    const classes = useStyles();
    const { socket } = useContext(AuthContext);
    //const history = useHistory();

    const [employee, setEmployee] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [period, setPeriod] = useState('');
    const [periodName, setPeriodName] = useState('');
    const [leftDays, setLeftDays] = useState('1');
    const [succesAdd, setSuccesAdd] = useState(false);
    const [displayedName, setDisplayedName] = useState('');
    const [takenDays, setTakenDays] = useState('0')
    const [staticDateArray, setStaticDateArray] = useState(staticDateArrayDefault);
    const [openDialog, setOpenDialog] = useState(false);
    const [employeeDetails, setEmployeeDetails] = useState([{}]);
    const [holidayDetailDialog, setHolidayDetailDialog] = useState(false);



    useEffect(() => {
        if (isMounted.current) {
            const currentPeriod = periodOptions.find(option => option.name === periodData.periodName);
            setPeriod(currentPeriod.id);
            setPeriodName(currentPeriod.name);
            setEmployee(employeeOptions[0].id);
            setEmployeeName(employeeOptions[0].name);
            setLeftDays(employeeOptions[0].holidayDays);
        } else {
            isMounted.current = true;
        }
    }, [employeeOptions, periodData, periodOptions]);

    useEffect(() => {
        if (isMounted.current) {
            socket.on('create_employee_holiday', () => {
                setSuccesAdd(true);
            });
        } else {
            isMounted.current = true;
        }
    }, [socket]);


    const handlePeriodChange = (event) => {
        socket.emit('get_holiday_data', undefined, event.target.value);
    }

    const handleEmployeeChange = event => {
        setEmployee(event.target.value)
        setEmployeeName(employeeOptions.find(option => option.id === event.target.value).name)
        setLeftDays(employeeOptions.find(option => option.id === event.target.value).holidayDays)
    }

    const handleEmpHolidayDetails = () => {
        const employeeDetail = periodData.holidaysData.filter(holiday => holiday.employee === employee)
        setEmployeeDetails({
            employee: employee,
            employeeName: employeeName,
            periodName: periodName,
            employeeDetail: employeeDetail
        });
        setHolidayDetailDialog(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setOpenDialog(true);
    }

    const handleNotAddToSchedule = () => {
        dataToSave(employee, employeeName, period, staticDateArray, false, setTakenDays, setDisplayedName, setStaticDateArray, setOpenDialog, socket)
    }

    const handleAddToSchedule = () => {
        dataToSave(employee, employeeName, period, staticDateArray, true, setTakenDays, setDisplayedName, setStaticDateArray, setOpenDialog, socket)
    }

    return <>
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
                    <Box mb={2} >
                        <Button onClick={handleEmpHolidayDetails} color="primary" endIcon={<MoreIcon />} variant="contained">
                            Ver Mas
                        </Button>
                    </Box>
                </div>
                <div className={classes.save}>
                    <Box >
                        <Button onClick={handleSubmit} color="primary" endIcon={<SaveIcon />} variant="contained">
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
        <HolidayDetails holidayData={employeeDetails} isDialogOpen={holidayDetailDialog} setIsDialogOpen={setHolidayDetailDialog} />
    </>
}
