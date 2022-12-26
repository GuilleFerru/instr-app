import React from "react"
import { makeStyles, FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    textField: {
        //marginRight: theme.spacing(2),
        minWidth: (props) => props.minWidth
    },
    input: {
        marginRight: theme.spacing(2),
        width: '500px'
    },
}))

export const Select = (props) => {

    const classes = useStyles(props);
    const { id, disabled, label, options, variant, name, margin, setValue, value = '', autoWidth, helperText, error = false } = props;

    const handleSelect = (event) => {
        setValue(event.target.value);
    };

    return <FormControl className={classes.textField} disabled={disabled} variant={variant} margin={margin} error={error}>
        <InputLabel id={id}>{label}</InputLabel>
        <MuiSelect
            id={id}
            label={label}
            name={name}
            value={value}
            onChange={handleSelect}
            autoWidth={autoWidth}
        >
            {
                options && options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                ))
            }
        </MuiSelect>
        <FormHelperText>{helperText}</FormHelperText>
        {/* {error && <FormHelperText>{error}</FormHelperText>} */}
    </FormControl>


}
