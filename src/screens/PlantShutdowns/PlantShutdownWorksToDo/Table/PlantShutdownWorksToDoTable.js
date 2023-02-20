import React, { useState, useEffect, useContext } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../../../components/commonComponents/MuiTable/theme';
import { defaultPlantShutdownWorksToDoTable } from '../../../../Services/defaultTables';
import { MuiTable } from '../../../../components/commonComponents/MuiTable/MuiTable';
import { AuthContext } from '../../../../context/AuthContext';
import { muiTableCommonActions } from '../../../../components/commonComponents/MuiTable/MuiTableCommonActions';
import { useHistory } from 'react-router-dom';


export const PlantShutdownWorksToDoTable = props => {
    const { socket } = useContext(AuthContext);
    const history = useHistory();
    const [data, setData] = useState([]);
    const [nickname, setNickname] = useState('');
    const [dataColumns, setDataColumns] = useState([]);
    const { getNewDataBulkEdit } = muiTableCommonActions();

    useEffect(() => {
        new Promise(resolve => {
            setData(props.data.dayWorks ? props.data.dayWorks : []);
            setDataColumns(props.data.columns ? props.data.columns : [defaultPlantShutdownWorksToDoTable]);
            setNickname(props.nickname ? props.nickname : '');
            resolve();
        });

    }, [props]);

    // no funciona.. ver otro día con ganas.. 25/5/2022
    const bulkUpdate = (changes, resolve) => {
        const copyData = [...data];
        const dataUpdate = getNewDataBulkEdit(changes, copyData);
        socket ? socket.emit('bulk_create_plant_shutdown_work_from_work_to_do', dataUpdate) : history.push('/error');
        resolve();

    }

    const updateRow = (newData, oldData, resolve) => {
        const dataUpdate = [...data];
        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
        const index = dataUpdate.indexOf(target);
        dataUpdate[index] = newData;
        const modifiedRow = {
            action: newData.action,
            attelier: newData.attelier,
            beginDate: newData.beginDate,
            complete: newData.complete,
            workToDo: newData.description,
            description: '',
            endDate: newData.endDate,
            id: newData.id,
            manteinance: newData.manteinance,
            ot: newData.ot,
            plant: newData.plant,
            plantShutdownId: newData.plantShutdownId,
            routineScheduleId: newData.routineScheduleId,
            sector: newData.sector,
            tag: newData.tag,
            timeSchedule: newData.timeSchedule,
        }
        socket ? socket.emit('create_plant_shutdown_work_from_work_to_do', modifiedRow) : history.push('/error');
        resolve();
        return dataUpdate;
    }

    return <ThemeProvider theme={theme}>
            <MuiTable
                data={data}
                setData={setData}
                dataColumns={dataColumns}
                title={'TAREAS DE PARO DE PLANTA SIN ASIGNAR'}
                disableOnRowUpdate={false}
                updateRow={updateRow}
                disableOnBulkUpdate={true}
                bulkUpdate={bulkUpdate}
                enablePaging={true}
                pageSize={15}
                pdfTitle={`${nickname}`}
            />
        </ThemeProvider>
}