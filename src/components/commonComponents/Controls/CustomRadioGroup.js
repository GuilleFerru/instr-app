import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export const CustomRadioGroup = ({ label, name, value, options, onChange }) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup aria-label={name} name={name} value={value} onChange={onChange}>
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

