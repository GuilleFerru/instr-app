export const employeeContainerStyle = theme => {
    return ({
        loading: {
            position: 'absolute',
            top: '50%',
            left: '50%',
        },
        section: {
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-around',
            '&>div': {
                marginTop: '1rem'
            }
        },
    })
}