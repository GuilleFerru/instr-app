// import React from 'react'
// import TextField from "@material-ui/core/TextField";
// import { MuiPickersUtilsProvider, StaticDateRangePicker as MuiStaticDateRangePicker  } from "@material-ui/pickers"
// import { DateRangeDelimiter, DateRange } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
// import esLocale from "date-fns/locale/es"
// import { createTheme } from "@material-ui/core";
// import { ThemeProvider } from "@material-ui/styles";

// const defaultMaterialTheme = createTheme({
//     palette: {
//         primary: {
//             main: '#069999'
//         },
//     },
// });

// export default function StaticDateRangePicker(props) {

//     const { name, label, value, onChange } = props

//     //const [value, setValue] = React.useState < DateRange < Date >> ([null, null]);

//     const convertToDefEventPara = (name, value) => ({
//         target: {
//             name, value
//         }
//     })

//     return (
//         <ThemeProvider theme={defaultMaterialTheme}>
//             <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} >
//                 <MuiStaticDateRangePicker
//                     displayStaticWrapperAs="desktop"
//                     value={value}
//                     onChange={date => onChange(convertToDefEventPara(name, date))}
//                     //onChange={(newValue) => setValue(newValue)}
//                     renderInput={(startProps, endProps) => (
//                         <React.Fragment>
//                             <TextField {...startProps} />
//                             {/* <DateRangeDelimiter> to </DateRangeDelimiter> */}
//                             <TextField {...endProps} />
//                         </React.Fragment>
//                     )}
//                 />
//             </MuiPickersUtilsProvider>
//         </ThemeProvider>
//     )
// }








