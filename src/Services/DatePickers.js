import DatePicker from '../components/commonComponents/Controls/DatePicker';
import MonthPicker from '../components/commonComponents/Controls/MonthPicker';

export const datePicker = (date, handleDatePicker) => {
    return (
        <DatePicker
            name='date'
            label="Fecha"
            value={date}
            onChange={handleDatePicker}
        />
    )
}

export const monthPicker = (date, handleDatePicker) => {
    return (
        <MonthPicker
            name='date'
            label="Mes - Año"
            value={date}
            onChange={handleDatePicker}
        />
    )
}