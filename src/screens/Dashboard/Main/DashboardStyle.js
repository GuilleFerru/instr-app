export const dashboardStyle = theme => {
    return ({
        root: {
            display: 'flex',
        },
        rootContainer: {
            flex: 6,
        },
        widgets: {
            display: 'flex',
            padding: '20px',
            gap: '20px',
        },
        charts: {
            padding: '5px 20px'
        }
    })
}