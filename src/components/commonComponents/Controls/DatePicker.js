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

export default function DatePicker(props) {

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
                    disableToolbar
                    variant='inline'
                    inputVariant="standard"
                    autoOk            
                    label={label}
                    format="dd/MM/yyyy"
                    name={name}
                    value={value}
                    onChange={date => onChange(convertToDefEventPara(name, date))}
                />
            </MuiPickersUtilsProvider>

        </ThemeProvider>
    )
}
