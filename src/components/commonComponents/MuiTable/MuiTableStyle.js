export const muiTableStyle = theme => {
    return ({
        toolbar: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
            height: '48px',
            [theme.breakpoints.down('xs')]: {
                height: '40px',
            },
        },
        datepicker: {
            margin: '0 8px 5px 24px'
        },


    })
}