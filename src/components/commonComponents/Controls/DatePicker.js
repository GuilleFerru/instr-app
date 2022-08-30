import React from 'react'
import { MuiPickersUtilsProvider, DatePicker as MuiDatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es"
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#069999'
        },
    },
});


export default function DatePicker(props) {

    const {
        name,
        label,
        value,
        onChange,
        variant = 'inline',
        inputVariant = "standard",
        margin = 'normal',
        minDate,
        maxDate = new Date('2100-01-01'),
        maxDateMessage = 'Fecha incorrecta',
        disabled = false,
        error = false
    } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <ThemeProvider theme={defaultMaterialTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} >
                <MuiDatePicker
                    disableToolbar
                    disabled={disabled}
                    variant={variant}
                    inputVariant={inputVariant}
                    margin={margin}
                    minDate={minDate}
                    maxDate={maxDate}
                    maxDateMessage={maxDateMessage}
                    autoOk
                    label={label}
                    format="dd/MM/yyyy"
                    name={name}
                    value={value}
                    onChange={date => onChange(convertToDefEventPara(name, date))}
                    error={error}
                />
            </MuiPickersUtilsProvider>

        </ThemeProvider>
    )
}
