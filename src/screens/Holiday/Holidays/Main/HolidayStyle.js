export const holidayStyle = theme => {
    return ({
        breadcrumb: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
            margin: '0',
            padding: '0',
            borderRadius: '5px 5px 0 0',
            height: '48px',
            [theme.breakpoints.down('xs')]: {
                height: '40px',
            },
        },

    })
}