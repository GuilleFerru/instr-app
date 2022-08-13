
export const fractionDetailStyle = theme => {
    return ({
        list: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        listItem: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            width: '100%',
        },
        listItemText: {
            flexGrow: 1,
            flexBasis: '100%',
        }
    })
}