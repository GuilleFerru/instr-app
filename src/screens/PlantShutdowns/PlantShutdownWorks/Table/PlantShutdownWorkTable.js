import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable'
import { plantShutdownWorkTableStyle } from './PlantShutdownWorkTableStyle';
import { UpdateShutdowWorksForm } from '../Forms/UpdateShutdowWorksForm';
import { defaultPlantShutdownWorksTable, plantShutDownWorksInitialRowData } from '../../../../Services/defaultTables';

const useStyles = makeStyles((theme) => plantShutdownWorkTableStyle(theme));

export const PlantShutdownWorkTable = props => {

    const classes = useStyles();
    const history = useHistory();
    const { socket } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [nickname, setNickname] = useState('');
    const [dataColumns, setDataColumns] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dayWorksColumns, setDayWorksColumns] = useState([]);
    //const { getNewDataBulkEdit } = muiTableCommonActions();

    useEffect(() => {
        new Promise(resolve => {
            setData(props.data.plantShutdowns ? props.data.plantShutdowns : []);
            setDataColumns(props.data.columns ? props.data.columns : [defaultPlantShutdownWorksTable]);
            setNickname(props.nickname ? props.nickname : '');
            setDayWorksColumns(props.data.dayWorksColumns ? props.data.dayWorksColumns : []);
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

    // const bulkUpdate = (changes, resolve) => {
    //     const copyData = [...data];
    //     const dataUpdate = getNewDataBulkEdit(changes, copyData);
    //     setData(dataUpdate);
    //     socket ? socket.emit('', dataUpdate) : history.push('/error');
    //     resolve();
    // }

    const deleteRow = (selectedRow, resolve) => {
        socket ? socket.emit('delete_plant_shutdown_work', selectedRow) : history.push('/error');
        resolve();
    }

    const [highlightSelectedRow, setHighlightSelectedRow] = useState(false);

    const detailPanel = {
        tooltip: 'Ver avance de tarea',
        render: rowData => {
            setHighlightSelectedRow(rowData.rowData.id);
            return (
                <div className={classes.detailPanel}>
                    <div className={classes.detailPanelTable}>
                        <MuiTable
                            data={rowData.rowData.dailyWorks}
                            dataColumns={dayWorksColumns}
                            enablePaging={true}
                            pageSize={5}
                            pageSizeOptions={[5, 10, 15]}
                            disableBreadcrumbs={true}
                            disableExportMenu={true}
                            disableToolbar={true}
                            headerStyleBackgroundColor={'#3cc954'}
                        />
                    </div>
                </div>
            )
        }
    }

    return <div className={classes.table}>
        <ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                setData={setData}
                title={nickname}
                dataColumns={dataColumns}
                initialRowData={plantShutDownWorksInitialRowData(props.timeSchedule)}
                disableColumnButton={false}
                enableUpdateShutdownWorkButton={true}
                disableInitialFormData={false}
                disableAddButton={props.plantShutdownState}
                disableDeleteButton={false}
                disableDefaultSearch={false}
                rowAdd={rowAdd}
                deleteRow={deleteRow}
                enablePaging={true}
                pageSize={10}
                pdfTitle={`${nickname} - Avance al ${new Date().toLocaleDateString()}`}
                setIsDialogOpen={setIsDialogOpen}
                setRowData={setRowData}
                enableDetailPanel={true}
                disableCheckButton={true}
                detailPanel={detailPanel}
                setRowColor={true}
                rowIdHighlight={highlightSelectedRow}
            />
            <UpdateShutdowWorksForm tableData={props.data} rowData={rowData} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </ThemeProvider>
    </div>

}