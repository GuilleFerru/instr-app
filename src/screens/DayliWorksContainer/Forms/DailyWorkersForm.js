import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { UseDailyWorkersForm } from './UseDailyWorkersForm';
import { Form } from '../../../components/commonComponents/Form/Form';
import { Select } from '../../../components/commonComponents/Form/Controls/Select';
import { Input } from '../../../components/commonComponents/Form/Controls/Input';
import { workers } from '../../../Services/Workers';
import { dailyWorkersFormStyle } from './DailyWorkersFormStyle';


const dataLabel = {
    labelHour : 'Total Hs'
}

const initialFValues = {
    workerFullNameShiftOne: '',
    workedHoursShiftOne: '',
    workerFullNameShiftTwo: '',
    workedHoursShiftTwo: '',
    workerFullNameShiftThree: '',
    workedHoursShiftThree: '',

}

const useStyles = makeStyles((theme) => dailyWorkersFormStyle(theme));

export const DailyWorkersForm = () => {
    const { values, handleChange } = UseDailyWorkersForm(initialFValues);
    const classes = useStyles();

    console.log(values)

    return <Form>
        <div className={classes.shiftWorkersContainer}>
            <div>
                <Select
                    minWidth={'50%'}
                    variant={"filled"}
                    label="05 a 13hs"
                    required={true}
                    value={values.workerFullNameShiftOne}
                    name="workerFullNameShiftOne"
                    onChange={handleChange}
                    options={workers}
                />
                <Input
                    variant={"outlined"}
                    autoFocus={false}
                    required={true}
                    label={dataLabel.labelHour}
                    value={values.workedHoursShiftOne}
                    name="workedHoursShiftOne"
                    onChange={handleChange}
                    width={'25ch'}
                />
            </div>
            <div>
                <Select
                    minWidth={'50%'}
                    variant={"filled"}
                    label="13 a 21hs"
                    required={true}
                    value={values.workerFullNameShiftTwo}
                    name="workerFullNameShiftTwo"
                    onChange={handleChange}
                    options={workers}
                />
                <Input
                    variant={"outlined"}
                    autoFocus={false}
                    required={true}
                    label={dataLabel.labelHour}
                    value={values.workedHoursShiftTwo}
                    name="workedHoursShiftTwo"
                    onChange={handleChange}
                    width={'50%'}
                />
            </div>
            <div>
                <Select
                    minWidth={'50%'}
                    variant={"filled"}
                    label="21 a 05hs"
                    required={true}
                    value={values.workerFullNameShiftThree}
                    name="workerFullNameShiftThree"
                    onChange={handleChange}
                    options={workers}
                />
                <Input
                    variant={"outlined"}
                    autoFocus={false}
                    required={true}
                    label={dataLabel.labelHour}
                    value={values.workedHoursShiftThree}
                    name="workedHoursShiftThree"
                    onChange={handleChange}
                    width={'50%'}
                />
            </div>
        </div>
    </Form>
}