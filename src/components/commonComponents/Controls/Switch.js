import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Switch as MuiSwitch } from '@material-ui/core/';


export const Switch = (props) => {

    const { label,  name, value, onChange, disabled, id } = props;
    return <FormControlLabel
        control={
            <MuiSwitch id={id} checked={value} onChange={onChange} name={name} disabled={disabled} label={label}  />
        }
        label={label}
    />

}