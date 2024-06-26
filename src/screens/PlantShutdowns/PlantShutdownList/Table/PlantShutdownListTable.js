import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { AuthContext } from '../../../../context/AuthContext';
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { defaultPlantShutdownsTable, plantShutDownsInitialRowData } from '../../../../Services/defaultTables.js';
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { yearPicker } from '../../../../Services/DatePickers';
import { plantShutdownsListTableStyle } from './PlantShutdownsListTableStyle'
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';

const useStyles = makeStyles((theme) => plantShutdownsListTableStyle(theme));

export const PlantShutdownListTable = ({ allData, setDate, date }) => {

    const classes = useStyles();
    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    const { handleDatePicker } = muiTableCommonActions(setDate);

    useEffect(() => {
        new Promise(resolve => {
            setData(allData.plantShutdowns ? allData.plantShutdowns : []);
            setDataColumns(allData.columns ? allData.columns : [defaultPlantShutdownsTable]);
            resolve();
        });
    }, [allData]);


    const rowAdd = (newRow, resolve) => {
        const newPlantShutdown = newRow;
        socket ? socket.emit('create_plant_shutdown', newPlantShutdown) : history.push('/error');
        resolve();
    }

    const updateRow = (newData, oldData, resolve) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = newData;
        socket ? socket.emit('update_plant_shutdown', date, newData) : history.push('/error');
        resolve();
        return dataUpdate;
    }

    const deleteRow = (selectedRow, resolve) => {
        socket ? socket.emit('delete_plant_shutdown', selectedRow) : history.push('/error');
        resolve();
    }


    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                setData={setData}
                title={'PAROS DE PLANTA'}
                datepicker={yearPicker(date, handleDatePicker)}
                disableAddButton={false}
                disableDeleteButton={false}
                disableOnRowUpdate={false}
                dataColumns={dataColumns}
                rowAdd={rowAdd}
                updateRow={updateRow}
                deleteRow={deleteRow}
                enablePaging={true}
                pageSize={20}
                pageSizeOptions={[20, 40, 60]}
                date={date}
                disableDatePicker={false}
                disableDefaultSearch={false}
                disableInitialFormData={false}
                initialRowData={{ ...plantShutDownsInitialRowData }}
                enableGoToPlantShutdown={true}
                enableGoToPlantShutdownWorksToDoButton={true}
            />
        </ThemeProvider>
    </div>

}