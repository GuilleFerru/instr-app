import {useState} from 'react';

export const UseDailyWorkersForm = (initialFValues) => {

    const [values, setValues] = useState(initialFValues);
    // const [errors, setErrors] = useState({});

    // const handleCountry = e => {
    //     const { name, value } = e.target;
    //     if (value !== 'AR') {
    //         setValues({
    //             ...values,
    //             [name]:value,
    //             'province': 'other Country'
    //         })
    //     } else {
    //         setValues({
    //             ...values,
    //             [name]:value,
    //         })
    //     }
    // }

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
        // if (validateOnChange) {
        //     validate({ [name]: value })
        // }
    }

    return {
        values,
        setValues,
        // errors,
        // setErrors,
        handleChange,
    }
}