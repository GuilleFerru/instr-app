import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Button } from '@material-ui/core';
import { addDays } from 'date-fns';
import { holidaySelectorStyle } from './HolidaySelectorStyle';
import { Select } from '../../../../components/commonComponents/Controls/Select';
import StaticDateRangePicker from '../../../../components/commonComponents/Controls/StaticDateRangePicker';
//import { useHistory } from 'react-router-dom';
import MoreIcon from '@material-ui/icons/More';
import SaveIcon from '@material-ui/icons/Save';



//const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => holidaySelectorStyle(theme));

export const HolidaySelector = ({ periodOptions, employeeOptions }) => {

    const classes = useStyles();
    //const history = useHistory();

    const [employees, setEmployees] = useState('');
    const [periodSelectData, setPeriodSelectData] = useState('');
    //const [periodData, setPeriodData] = useState([]);

    const [staticDateArray, setStaticDateArray] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection',
            color: '#069999',
        }
    ]);


    const handlePeriodSelect = event => {
        setPeriodSelectData(event.target.value)
    }

    const handleEmployeeSelect = event => {
        setEmployees(event.target.value)
    }

    const handleEmpHolidayDetails = () => {
        console.log('id');
    }

    const handleSaveEmpHoliday = () => {
        console.log('periodSelector');
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return <>
        <Typography variant="h6" gutterBottom>Selector de Vacaciones</Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
            <div className={classes.employees}>
                <div className={classes.employeeData}>
                    <Box mb={2}>
                        <Select
                            label={""}
                            required={true}
                            id={'period-for-selector'}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={periodOptions}
                            value={periodSelectData}
                            setValue={setPeriodSelectData}
                            handleSelect={handlePeriodSelect}
                        />
                    </Box>
                    <Box mb={2}>
                        <Select
                            label={""}
                            required={true}
                            id={'employee'}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={employeeOptions}
                            value={employees}
                            setValue={setEmployees}
                            handleSelect={handleEmployeeSelect}
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
                        <Button onClick={handleSaveEmpHoliday} color="primary" endIcon={<SaveIcon />} variant="contained">
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
