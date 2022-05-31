import React, { useState, useEffect, useContext } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { AuthContext } from '../../../../context/AuthContext';
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { defaultPlantShutdownWorksTable, plantShutDownWorksInitialRowData } from '../../../../Services/defaultTables';
import { makeStyles } from "@material-ui/core/styles";
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { plantShutdownWorkTableStyle } from './PlantShutdownWorkTableStyle';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => plantShutdownWorkTableStyle(theme));

export const PlantShutdownWorkTable = props => {

    const classes = useStyles();
    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [nickname, setNickname] = useState('');
    const [dataColumns, setDataColumns] = useState([]);
    const { getNewDataBulkEdit } = muiTableCommonActions();


    useEffect(() => {
        new Promise(resolve => {
            setData(props.data.plantShutdowns ? props.data.plantShutdowns : []);
            setDataColumns(props.data.columns ? props.data.columns : [defaultPlantShutdownWorksTable]);
            setNickname(props.nickname ? props.nickname : '');
            resolve();
        });
    }, [props]);

    const rowAdd = (newRow, resolve) => {
        const newPlantShutdownWork = newRow;
        const data = {
            ...newPlantShutdownWork,
            plantShutdownId: props.plantShutdownId
        }
        socket ? socket.emit('create_plant_shutdown_work', data) : history.push('/error');
        resolve();
    }

    const updateRow = (newData, oldData, resolve) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = newData;
        socket ? socket.emit('update_plant_shutdown_work', { newData, oldData }) : history.push('/error');
        resolve();
        return dataUpdate;
    }


    const bulkUpdate = (changes, resolve) => {
        const copyData = [...data];
        const dataUpdate = getNewDataBulkEdit(changes, copyData);
        setData(dataUpdate);
        socket ? socket.emit('', dataUpdate) : history.push('/error');
        resolve();
    }

    const deleteRow = (selectedRow, resolve) => {
        socket ? socket.emit('delete_plant_shutdown_work', selectedRow) : history.push('/error');
        resolve();
    }



    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                setData={setData}
                title={nickname}
                dataColumns={dataColumns}
                initialRowData={plantShutDownWorksInitialRowData}
                disableInitialFormData={false}
                disableAddButton={false}
                disableOnRowUpdate={false}
                disableOnBulkUpdate={false}
                disableDeleteButton={false}
                rowAdd={rowAdd}
                updateRow={updateRow}
                bulkUpdate={bulkUpdate}
                deleteRow={deleteRow}
                pageSize={15}
                pdfTitle={`${nickname} - Avance al ${new Date().toLocaleDateString()}`}
            />
        </ThemeProvider>
    </div>

}