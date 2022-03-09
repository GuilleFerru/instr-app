import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosPut } from '../../../Services/Axios.js';
import { otherRoutinesDefault } from '../../../Services/defaultTables.js';
import { monthPicker } from '../../../Services/DatePickers'
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../components/commonComponents/MuiTable/MuiTable'
import { routineTableStyle } from './RoutineTableStyle'
import { muiTableCommonActions } from '../../../components/commonComponents/MuiTable/MuiTableCommonActions';



const useStyles = makeStyles((theme) => routineTableStyle(theme));

export const RoutineTable = props => {

    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    const { handleDatePicker } = muiTableCommonActions(data, setData, setDate);


    useEffect(() => {
        let cancel = false;
        axios.get(`/routine/get/${date}`).then(res => {
            const { otherRoutines, columns } = res.data;
            console.log(otherRoutines)
            if (!cancel) {
                otherRoutines === undefined || otherRoutines.length === 0 ? setData([]) : setData(otherRoutines);
                columns === undefined ? setDataColumns([otherRoutinesDefault]) : setDataColumns(columns);
            } else {
                return;
            }
        });
        return () => {
            cancel = true;
        }
    }, [date]);

    const bulkUpdate = (selectedRows, resolve) => {
        const rows = Object.values(selectedRows);
        const updatedRows = [...data];
        rows.map(emp => {
            const index = emp.oldData.tableData.id;
            updatedRows[index] = emp.newData;
            setData(updatedRows);
            resolve();
            return ''
        })

        
        
        
    }



    const updateRow = (updatedRow, oldRow) => {
        const index = oldRow.tableData.id;
        const updatedRows = [...data];
        updatedRows[index] = updatedRow;
        return updatedRows;
    }

    // const handleSelection = (selectedRows) => new Promise((resolve, _) => {
    //     handleSelectionResolve(selectedRows, resolve);
    // })

    const handleSelection = (selectedRows, ) => {
        const rows = Object.values(selectedRows);
        const updatedRows = [...data];
        const dataToAxiosPut = [];
        rows.map(routine => {
            const index = routine.tableData.id;
            updatedRows[index] = { ...routine, complete: 'C' };
            dataToAxiosPut.push({...routine, complete: 'C'});
            setData(updatedRows);
            return ''
        })
        axiosPut(`/routine/update`, { data: dataToAxiosPut});
    }





    return <div className={classes.table}>
        <MuiTable
            title={'RUTINAS'}
            datepicker={monthPicker(date, handleDatePicker)}
            date={date}
            data={data}
            setData={setData}
            dataColumns={dataColumns}
            pageSize={15}
            updateRow={updateRow}
            handleAditional={false}
            bulkUpdate={bulkUpdate}
            handleSelection={handleSelection}
            handleDatePicker={false}
            deleteRow={false}
            disableGroupingOption={false}
            disableCheckButton={true}
            disableAddButton={true}
            disableDeleteButton={false}
            disableOnRowUpdate={true}
            disableOnBulkUpdate={true}
            disableAditionalButton={true}

        />
    </div>

}