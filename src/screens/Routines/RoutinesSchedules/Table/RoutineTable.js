import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { axiosPut } from '../../../../Services/Axios.js';
import { otherRoutinesDefault, otherRoutinesInitialRowData } from '../../../../Services/defaultTables.js';
import { monthPicker } from '../../../../Services/DatePickers'
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { RoutineCrudContainer } from '../../RoutinesCRUD/RoutineCrudContainer';


const baseUrl = process.env.REACT_APP_API_URL;


export const RoutineTable = ({ allData, setDate, date }) => {

    const { socket } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    const [monthAndYear, setMonthAndYear] = useState('');
    const [isRoutineCreateDialogOpen, setIsRoutineCreateDialogOpen] = useState(false);
    const [isRoutineEditDialogOpen, setIsRoutineEditDialogOpen] = useState(false);
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

    return <ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                setData={setData}
                title={`RUTINAS ${monthAndYear.toUpperCase()}`}
                datepicker={monthPicker(date, handleDatePicker)}
                disableOnRowUpdate={false}
                dataColumns={dataColumns}
                updateRow={updateRow}
                enablePaging={true}
                pageSize={20}
                pageSizeOptions={[20, 40, 60]}
                routineDate={date}
                handleRoutineSchedule={handleRoutineSchedule}
                enableRoutinesDetails={true}
                enableCompleteTaskButton={true}
                disableDatePicker={false}
                disableDefaultSearch={false}
                disableInitialFormData={false}
                initialRowData={{ otherRoutinesInitialRowData }}
                monthAndYear={monthAndYear}
                enableCreateNewRoutineButton={true}
                setIsDialogOpen={setIsRoutineCreateDialogOpen}
                setRoutineEditDialogOpen={setIsRoutineEditDialogOpen}
                enableEditRoutineButton={true}
            />
            <RoutineCrudContainer
                isCreateDialogOpen={isRoutineCreateDialogOpen}
                setIsCreateDialogOpen={setIsRoutineCreateDialogOpen}
                isEditDialogOpen={isRoutineEditDialogOpen}
                setIsEditDialogOpen={setIsRoutineEditDialogOpen}
            />
        </ThemeProvider>
}