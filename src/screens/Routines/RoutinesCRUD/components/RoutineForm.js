import React from 'react';
import { CssBaseline, Container, Button, Dialog } from '@material-ui/core';
import Alert from '../../../../components/Alerts/Alert.js';
import { MyDialog, MyDialogActions } from '../../../../components/commonComponents/Dialog/MyDialog';
import { Select } from '../../../../components/commonComponents/Controls/Select';
import { Title } from '../../../../components/commonComponents/Title';
import { Input } from '../../../../components/commonComponents/Controls/Input';
import DatePicker from '../../../../components/commonComponents/Controls/DatePicker';
import { AutoComplete } from './AutoComplete';
import { AutoCompleteCheckBox } from './AutoCompleteCheckBox'


const activeOptions = [
    { id: true, name: 'Activo' },
    { id: false, name: 'Inactivo' },
]


export const RoutineForm = ({ data, buttonName }) => {


    return <>
        <Dialog open={data.alert.collapse}>
            <div className={data.classes.alert}>
                <Alert
                    severity={data.alert.severity}
                    title={data.alert.title}
                    message={data.alert.message}
                    messageAction={data.alert.messageAction}
                    collapse={data.alert.collapse}
                />
            </div>
        </Dialog>
        <MyDialog
            title={<Title value={data.title} variant="button" titleClassName={data.titleColor} gutterBottom={true} />}
            isOpen={data.isDialogOpen}
            fullWidth={true}
            maxWidth={'sm'}
        >

            <Container component="main" maxWidth="lg" className={data.classes.root}>
                <CssBaseline />

                <div className={data.classes.paper}>
                    <form className={data.classes.form} noValidate autoComplete="off"  >
                        <AutoComplete
                            label={"Nombre de la rutina"}
                            name="nickname"
                            autoCompleteId="autocomplete-nickname"
                            value={data.nickname}
                            setValue={data.setNickname}
                            options={data.nicknames}
                            placeholder="Ingrese o seleccione un nombre para la rutina"
                            width="97.5%"
                            error={data.nicknameError}
                            disabled={data.complete}
                        />
                        <Select
                            id={'plant'}
                            label={"Planta"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={data.plants}
                            value={data.plant}
                            setValue={data.setPlant}
                            error={data.plantError}
                        />
                        <Select
                            id={'attelier'}
                            label={"Attelier"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={data.attelieres}
                            value={data.attelier}
                            setValue={data.setAttelier}
                            className={data.classes.textField}
                            error={data.attelierError}
                        />
                        <Input
                            variant={"outlined"}
                            margin={"dense"}
                            required={true}
                            id={"tag"}
                            label={"Tag"}
                            name={"tag"}
                            type={"input"}
                            value={data.tag}
                            onChange={data.handleTagInput}
                            error={data.tagError}
                        />
                        <Input
                            variant={"outlined"}
                            margin={"dense"}
                            required={true}
                            placeholder={"Rutina (frecuencia) según RG-44-XXX"}
                            id={"description"}
                            label={"Descripción"}
                            name={"description"}
                            type={"input"}
                            value={data.description}
                            onChange={data.handleDescriptionInput}
                        />
                        <Select
                            id={'timeSchedule'}
                            label={"Horario de ejecución"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={data.timeSchedules}
                            value={data.timeSchedule}
                            setValue={data.setTimeSchedule}
                        />

                        <Select
                            id={'manteinance'}
                            label={"Tipo de mantenimiento"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={data.manteinances}
                            value={data.manteinance}
                            setValue={data.setManteinance}
                            disabled={true}
                        />
                        <Select
                            id={'action'}
                            label={"Acción"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={data.actions}
                            value={data.action}
                            setValue={data.setAction}
                            disabled={true}
                        />
                        {data.showActive ? (
                            <Select
                                id={'active'}
                                label={"Activo"}
                                required={true}
                                autoWidth={true}
                                margin={"dense"}
                                variant={'outlined'}
                                options={activeOptions}
                                value={data.active}
                                setValue={data.setActive}
                            />
                        ) : null}
                        <Select
                            id={'frequency'}
                            label={"Frecuencia de ejecución"}
                            required={true}
                            autoWidth={true}
                            margin={"dense"}
                            variant={'outlined'}
                            options={data.frequencies}
                            value={data.frequency}
                            setValue={data.setFrequency}
                            error={data.frequencyError}
                            disabled={data.complete}
                        />
                        {data.showCheckDay ? (
                            <AutoCompleteCheckBox
                                value={data && data.checkDays}
                                setValue={data.setCheckDays}
                                label={"Días de ejecución"}
                                placeholder="Seleccione los días de ejecución"
                                width="97.5%"
                                error={data.checkDaysError}
                                autocompleteId="autocomplete-checkDays"
                                disabled={data.complete}
                            />
                        ) : null}
                        {data.showOtherCheckDay ? (
                            <DatePicker
                                name='date'
                                label="Fecha de chequeo"
                                value={data.otherCheckDay}
                                onChange={data.handleOtherCheckDay}
                                inputVariant="outlined"
                                margin={"dense"}
                                error={data.otherCheckDayError}
                                disabled={data.complete}
                            />
                        ) : null}
                        <MyDialogActions>
                            <Button color="primary" onClick={data.handleSubmit} >
                                {buttonName}
                            </Button>
                            <Button onClick={data.handleDialogClose} color="primary">
                                Cerrar
                            </Button>
                        </MyDialogActions>
                    </form>
                </div>
            </Container>
        </MyDialog >
    </>
}