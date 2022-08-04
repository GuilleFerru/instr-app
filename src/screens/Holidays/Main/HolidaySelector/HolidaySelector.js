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

//const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => holidaySelectorStyle(theme));

export const HolidaySelector = ({ periodOptions, periodData, employeeOptions }) => {

    const isMounted = useRef(false);
    const classes = useStyles();
    const { socket } = useContext(AuthContext);
    //const history = useHistory();

    const [employee, setEmployee] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [period, setPeriod] = useState('');
    //const [periodData, setPeriodData] = useState([]);

    const [staticDateArray, setStaticDateArray] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
            color: '#069999',
        }
    ]);


    useEffect(() => {
        if (isMounted.current) {
            const currentPeriod = periodOptions.find(option => option.name === periodData.periodName).id;
            setPeriod(currentPeriod);
            setEmployee(employeeOptions[0].id);
            setEmployeeName(employeeOptions[0].name);
        } else {
            isMounted.current = true;
        }
    }, [employeeOptions, periodData, periodOptions]);


    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
        //socket.emit('get_holiday_period', event.target.value);
    }

    const handleEmployeeChange = event => {
        setEmployee(event.target.value)
        setEmployeeName(employeeOptions.find(option => option.id === event.target.value).name)
    }

    const handleEmpHolidayDetails = () => {
        console.log('id');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const empNewDataHoliday = {
            employee: employee,
            employeeName: employeeName,
            periodId: period,
            startDate: staticDateArray[0].startDate,
            endDate: staticDateArray[0].endDate
        }
        socket.emit('create_employee_holiday', empNewDataHoliday)
    }

    return <>
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
                        <Typography variant="overline" display="block" gutterBottom>Días Restantes: 21</Typography>
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
    </>
}
