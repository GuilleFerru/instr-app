const shadowEffect = {
    webkitBoxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
    boxShadow: ' 2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
    borderRadius: '10px',
}


export const holidaySelectorStyle = theme => {
    return ({
        form: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            //gap: '300px',
            //alignItems: 'flex-start',
            margin: '0 0 50px 0',
            width: '100%',
        },
        employees: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            margin: '0 0 0 10px',
        },
        datePicker: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 'auto',
            ...shadowEffect,
        },
        alert: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 'auto',
            position: 'float',
        },
    })
}