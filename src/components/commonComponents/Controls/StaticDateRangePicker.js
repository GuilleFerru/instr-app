import React from 'react';
import { DateRangePicker, defaultInputRanges, defaultStaticRanges } from 'react-date-range';
import esLocale from "date-fns/locale/es"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function StaticDateRangePicker(props) {

    const { staticDateArray, setStaticDateArray } = props

    const spanishStaticRanges = (defaultStaticRanges) => {
        const spanishStaticData = ['Hoy', 'Ayer', 'Esta semana', 'Semana pasada', 'Este mes', 'Mes pasado']
        for (let i = 0; i < defaultStaticRanges.length; i++) {
            defaultStaticRanges[i].label = spanishStaticData[i]
        }
        return defaultStaticRanges
    }

    const spanishStaticInputRanges = (defaultInputRanges) => {
        const spanishInputData = ['Días hasta hoy', 'Días desde hoy'];
        for (let i = 0; i < defaultInputRanges.length; i++) {
            defaultInputRanges[i].label = spanishInputData[i]
        }
        return defaultInputRanges
    }

    return (
        <DateRangePicker
            //onChange={date => onChange(convertToDefEventPara(name, date.selection))}
            onChange={item => setStaticDateArray([item.selection])}
            //weekStartsOn={1}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={staticDateArray}
            direction="horizontal"
            locale={esLocale}
            staticRanges={spanishStaticRanges(defaultStaticRanges)}
            inputRanges={spanishStaticInputRanges(defaultInputRanges)}
        />
    )



}







