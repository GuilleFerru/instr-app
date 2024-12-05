
export const employeetStyle = (theme, employee) => {
    return ({
        root: {
            maxWidth: 345,
            width: '50%',
            backgroundColor: employee.status ? 'white' : '#f5f5f5'
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: employee.status ? '#069999' : 'gray',
        },
    })
}
