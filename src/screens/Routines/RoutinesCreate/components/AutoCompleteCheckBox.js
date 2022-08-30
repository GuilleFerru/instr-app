
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const AutoCompleteCheckBox = (props) => {

    const { label, value, setValue, autoCompleteId, placeholder, width, error } = props;
    return (
        <Autocomplete
            multiple
            value={value}
            onChange={(_e, newValue) => {
                setValue(newValue ? newValue : []);
            }}
            id={autoCompleteId}
            options={days}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </React.Fragment>
            )}
            selectOnFocus
            style={{ width: width }}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder} variant="outlined" margin="dense" error={error}  />
            )}
        />
    );
}
const days = [
    { id: 1, name: 'Lunes' },
    { id: 2, name: 'Martes' },
    { id: 3, name: 'Miercoles' },
    { id: 4, name: 'Jueves' },
    { id: 5, name: 'Viernes' },
    { id: 6, name: 'Sabado' },
    { id: 7, name: 'Domingo' },
];
