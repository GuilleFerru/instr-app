import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { axiosPut } from '../../../../Services/Axios.js';
import { otherRoutinesDefault, otherRoutinesInitialRowData } from '../../../../Services/defaultTables.js';
import { monthPicker } from '../../../../Services/DatePickers'
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { routineTableStyle } from './RoutineTableStyle'
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { RoutineCreateContainer } from '../../RoutinesCreate/RoutineCreateContainer';


const baseUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => routineTableStyle(theme));

export const RoutineTable = ({ allData, setDate, date }) => {

    const classes = useStyles();
    const { socket } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    const [monthAndYear, setMonthAndYear] = useState('');
    const [isRoutineCreateDialogOpen, setIsRoutineCreateDialogOpen] = useState(false)
    const { handleDatePicker } = muiTableCommonActions(setDate);

    useEffect(() => {
        new Promise(resolve => {
            setData(allData.otherRoutines ? allData.otherRoutines : []);
            setDataColumns(allData.columns ? allData.columns : [otherRoutinesDefault]);
            setMonthAndYear(allData.date ? allData.date : '');
            resolve();
        });
    }, [allData]);


    const updateRow = (newData, oldData, resolve) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = newData;
        axiosPut(`${baseUrl}/routine/updateOt`, { data: newData })
        resolve();
        return dataUpdate;
    }

    const handleRoutineSchedule = (selectedRows,) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === selectedRows.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = { ...selectedRows, complete: 'C', checkDay: new Date() };
        setData(dataUpdate);
        axiosPut(`${baseUrl}/routine/update`, { data: dataUpdate[index] }).then(res => {
            res.status === 200 && socket.emit('get_qtyOverDueRoutines');
        });
    }

    const handleNewRoutine = () => {
        setIsRoutineCreateDialogOpen(true)
    }


    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                setData={setData}
                title={'RUTINAS'}
                datepicker={monthPicker(date, handleDatePicker)}
                disableOnRowUpdate={false}
                dataColumns={dataColumns}
                updateRow={updateRow}
                enablePaging={true}
                pageSize={10}
                pageSizeOptions={[10, 20, 30]}
                date={date}
                handleRoutineSchedule={handleRoutineSchedule}
                enableRoutinesDetails={true}
                enableCompleteTaskButton={true}
                disableDatePicker={false}
                disableDefaultSearch={false}
                disableInitialFormData={false}
                initialRowData={{ otherRoutinesInitialRowData }}
                monthAndYear={monthAndYear}
                enableCreateNewRoutineButton={true}
                createNewRoutine={handleNewRoutine}
                setIsDialogOpen={setIsRoutineCreateDialogOpen}
            />
            <RoutineCreateContainer isDialogOpen={isRoutineCreateDialogOpen} setIsDialogOpen={setIsRoutineCreateDialogOpen} />
        </ThemeProvider>
    </div>

}