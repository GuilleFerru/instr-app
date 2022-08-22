
export const scoreSystemStyle = theme => {
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
            flexWrap: 'nowrap',
            //alignItems: 'stretch',
            width: '100%',
        },

        listItemColumn: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            width: '100%',
            padding: '1px',
            margin: '0px',
        },
        listItemText: {
            flexGrow: 1,
            flexBasis: '100%',
            padding: '0px',
            margin: '0px',
        }
    })
}