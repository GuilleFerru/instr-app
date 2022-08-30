import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

export const AutoComplete = (props) => {

    const { label, options, value, setValue, autoCompleteId, placeholder, width, error } = props;

    return (
        <Autocomplete
            value={value}
            onChange={(_e, newValue) => {
                if (typeof newValue === 'string') {
                    setValue(newValue ? newValue.name : '');
                } else if (newValue && newValue.inputValue) {
                    setValue(newValue.inputValue.toUpperCase());
                } else {
                    setValue(newValue ? newValue.name : '');
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        name: `Agregar "${params.inputValue}"`,
                    });
                }
                return filtered;
            }}

            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id={autoCompleteId}
            options={options}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            renderOption={(option) => option.name}
            style={{ width: width }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label={label} variant="outlined" margin="dense" placeholder={placeholder} error={error}  />
            )}
        />
    );
}

