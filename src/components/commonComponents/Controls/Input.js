import React from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    textField: {
        marginRight: theme.spacing(2),
        width: props => props.width
    }
}))

export const Input = (props) => {

    const { name, label, value, onChange, autoFocus, error = false, fullWidth, required, variant, placeholder, margin, id, autoComplete, type, inputRef, multiline, disabled = false } = props
    const classes = useStyles(props);
    return <TextField className={classes.textField}
        multiline={multiline}
        rows={multiline ? 3 : 1}
        autoFocus={autoFocus || false}
        fullWidth={fullWidth || false}
        required={required || false}
        label={label}
        value={value}
        name={name}
        onChange={onChange}
        variant={variant}
        placeholder={placeholder}
        margin={margin}
        id={id}
        autoComplete={autoComplete}
        type={type}
        inputRef={inputRef}
        error={error}
        disabled={disabled}

    //{...(error && { error: true, helperText: error })}
    >
    </TextField>

}

