import React from "react"
import { makeStyles, FormControl, InputLabel, Select as MuiSelect, MenuItem } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    textField: {
        marginRight: theme.spacing(2),
        minWidth: (props) => props.minWidth
    }
}))

export const Select = (props) => {
    const { name, label, value, onChange, options, disabled, variant  } = props;
    
    const classes = useStyles(props);

    return <FormControl className={classes.textField} disabled={disabled} variant={variant}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            >
            {
                options.map((option) => (
                    <MenuItem key={option.legajo} value={option.legajo}>
                        {option.fullName}
                    </MenuItem>
                ))
            }
        </MuiSelect>
        {/* {error && <FormHelperText>{error}</FormHelperText>} */}
    </FormControl>

}
