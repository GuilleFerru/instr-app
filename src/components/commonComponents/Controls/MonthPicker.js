import React from 'react'
import { MuiPickersUtilsProvider, DatePicker as MuiDatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es"
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#008000'
        },
    },
});

export default function MonthPicker(props) {

    const { name, label, value, onChange } = props

 
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <ThemeProvider theme={defaultMaterialTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} >
                <MuiDatePicker
                    autoOk
                    variant='inline'
                    openTo="month"
                    views={["year", "month"]}
                    label={label}
                    helperText="Seleccionar mes"
                    minDate={new Date("2022-01-02")}
                    maxDate={new Date("2032-01-02")}
                    name={name}
                    value={value}
                    onChange={date => onChange(convertToDefEventPara(name, date))}
                />
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    )
}
