import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export const TableCustomComponents = () => {

    const createOptions = (options) => {
        return Object.keys(options).map((key) => {
            return {
                id: key,
                title: options[key]
            }
        })
    }

    const createAutocomplete = (props, options, classes, field, focus) => {
        const defaultValue = options?.find((option) => Number(option?.id) === Number(props.rowData[field])) || null;

        return (
            <Autocomplete
                ListboxProps={{
                    style: {
                        fontSize: '13px',
                        width: '300px'
                    },
                }}
                className={classes.customAutoComplete}
                noOptionsText={'Sin opciones'}
                autoSelect={true}
                id={field}
                options={options}
                getOptionLabel={(option) => option?.title || ''}
                defaultValue={defaultValue}
                onChange={(_event, value) => props.onChange(value?.id || null)}
                value={defaultValue || null}

                renderInput={(params) => <TextField
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    {...params} variant="outlined" className={classes.autoCompleteInput}/>}
            />
        )
    }

    const createTextField = (props, classes, field, label) => {
        return (
            <TextField
                InputProps={{
                    classes: {
                        input: classes.resize,
                    },
                }}
                InputLabelProps={{
                    classes: {
                        root: classes.label,
                        shrink: classes.shrink,
                    },
                }}
                className={classes.description}
                id={field}
                label={label}
                multiline
                onChange={e =>
                    props.onRowDataChange({
                        ...props.rowData,
                        description: e.target.value,
                    })
                }
                value={props.value}
            />
        )
    }





    return {
        createOptions,
        createAutocomplete,
        createTextField
    }


}
